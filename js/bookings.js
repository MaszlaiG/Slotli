function showBookingsSyncError(msg) {
  const el = document.getElementById('bookings-sync-error');
  if (!el) return;
  if (msg) {
    el.textContent = msg;
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}
let _bkUnsub = null;
function initInboxSync() {
  if (!currentUid) return;
  showBookingsSyncError(null);
  let fs;
  try {
    fs = firebase.firestore();
  } catch (e) {
    return;
  }
  if (_bkUnsub) {
    try {
      _bkUnsub();
    } catch (e) {}
    _bkUnsub = null;
  }
  _bkUnsub = fs
    .collection('inbox')
    .doc(currentUid)
    .collection('items')
    .onSnapshot(
      (snap) => {
        let changed = false;
        snap.forEach((docSnap) => {
          const e = docSnap.data() || {};
          const key = e.id || docSnap.id;
          if (!state.importedBookingIds[key]) {
            state.bookings[key] = {
              ...e,
              id: key,
              status: e.status || 'uj',
              price: Number(e.price) || 0,
              cells: Array.isArray(e.cells) ? e.cells : []
            };
            if (typeof nextBookingNum === 'function' && !state.bookings[key].num) {
              state.bookings[key].num = nextBookingNum(state.bookings[key].date);
            }
            state.importedBookingIds[key] = true;
            changed = true;
          }
          docSnap.ref.delete().catch(() => {});
        });
        if (changed) {
          save();
          renderBookingsTable();
          updateBookingsBadge();
          if (typeof renderClients === 'function') renderClients();
          if (typeof renderDash === 'function') renderDash();
        }
      },
      (err) => {
        console.warn('[Slotli] inbox listener:', err);
        showBookingsSyncError('A beérkező foglalások szinkronizálása most szünetel.');
      }
    );
}
function refreshInbox() {
  showBookingsSyncError(null);
  initInboxSync();
}
function _busyCol() {
  try {
    return firebase.firestore().collection('busy').doc(currentUid).collection('slots');
  } catch (e) {
    return null;
  }
}
function freeBusyCells(cells) {
  if (!Array.isArray(cells) || !currentUid) return;
  const col = _busyCol();
  if (!col) return;
  const batch = firebase.firestore().batch();
  cells.forEach((c) => batch.delete(col.doc(c)));
  batch.commit().catch(() => {});
}
function claimBusyCells(cells, date) {
  if (!Array.isArray(cells) || !currentUid) return;
  const col = _busyCol();
  if (!col) return;
  const batch = firebase.firestore().batch();
  cells.forEach((c) =>
    batch.set(col.doc(c), {
      date: date,
      createdAt: Date.now()
    })
  );
  batch.commit().catch(() => {});
}
function updateBookingsBadge() {
  const btn = document.querySelector('#main-nav button[data-tab="bookings"]');
  if (btn) {
    const old = btn.querySelector('.lead-badge');
    if (old) old.remove();
  }
  const cEl = document.getElementById('bookings-new-count');
  if (cEl) cEl.style.display = 'none';
}
const BOOKING_STATUS_MAP = {
  uj: {
    label: 'Új foglalás',
    cls: 's-green',
    badge: 'badge-green'
  },
  lemondva: {
    label: 'Lemondva',
    cls: 's-gray',
    badge: 'badge-gray'
  }
};
function bookingStatusBadge(status) {
  const s = BOOKING_STATUS_MAP[status] || BOOKING_STATUS_MAP.uj;
  return '<span class="badge ' + s.badge + '" style="font-size:10px">' + s.label + '</span>';
}
function setBookingStatus(id, status) {
  const b = state.bookings[id];
  if (!b) return;
  b.status = status;
  if (status === 'lemondva') freeBusyCells(b.cells);
  else claimBusyCells(b.cells, b.date);
  save();
  renderBookingsTable();
  updateBookingsBadge();
  if (typeof renderClients === 'function') renderClients();
  if (typeof renderDash === 'function') renderDash();
}
async function deleteBooking(id) {
  const b = state.bookings[id];
  if (!b) return;
  if (
    !(await uiConfirm('Biztosan törlöd ezt a foglalást? A hozzá tartozó idősáv felszabadul.', {
      title: 'Megerősítés'
    }))
  )
    return;
  freeBusyCells(b.cells);
  delete state.bookings[id];
  save();
  renderBookingsTable();
  updateBookingsBadge();
  if (typeof renderClients === 'function') renderClients();
  if (typeof renderDash === 'function') renderDash();
}
function openBookingModal() {
  const d = document.getElementById('bm-date');
  if (d && !d.value) d.value = now();
  const dl = document.getElementById('bm-service-list');
  if (dl)
    dl.innerHTML = (state.bookingConfig.services || [])
      .filter((s) => s.name)
      .map((s) => '<option value="' + escHtml(s.name) + '">')
      .join('');
  openModal('booking-modal');
}
function addBooking() {
  const name = (document.getElementById('bm-name').value || '').trim();
  const email = (document.getElementById('bm-email').value || '').trim();
  const phone = (document.getElementById('bm-phone').value || '').trim();
  const service = (document.getElementById('bm-service').value || '').trim();
  const date = document.getElementById('bm-date').value || now();
  const time = document.getElementById('bm-time').value || '';
  const message = (document.getElementById('bm-message').value || '').trim();
  if (!name) {
    uiAlert('Add meg az ügyfél nevét!');
    return;
  }
  if (!time) {
    uiAlert('Add meg az időpontot!');
    return;
  }
  const svc = (state.bookingConfig.services || []).find((s) => s.name === service);
  const durationMin = svc ? svc.durationMin : 30;
  const sm = state.bookingConfig.slotMinutes || 30;
  const cells = cellsForBooking(date, time, durationMin, sm);
  const id = 'bk_' + Date.now().toString(36);
  state.bookings[id] = {
    id,
    num: typeof nextBookingNum === 'function' ? nextBookingNum(date) : '',
    name,
    email,
    phone,
    service,
    serviceLoc: service,
    price: svc ? svc.price || 0 : 0,
    currency: 'HUF',
    slotKey: cells[0],
    date,
    time,
    durationMin,
    cells,
    message,
    status: 'uj',
    source: 'manual',
    createdAt: Date.now()
  };
  state.importedBookingIds[id] = true;
  claimBusyCells(cells, date);
  save();
  ['bm-name', 'bm-email', 'bm-phone', 'bm-service', 'bm-time', 'bm-message'].forEach((fid) => {
    const el = document.getElementById(fid);
    if (el) el.value = '';
  });
  closeModal('booking-modal');
  renderBookingsTable();
  updateBookingsBadge();
  if (typeof renderClients === 'function') renderClients();
  if (typeof renderDash === 'function') renderDash();
}
function renderBookingsTable() {
  const tbody = document.getElementById('bookings-tbody');
  if (!tbody) return;
  const filter = (document.getElementById('bookings-filter') || {}).value || 'upcoming';
  const todayS = now();
  let list = Object.values(state.bookings || {});
  if (filter === 'upcoming')
    list = list.filter((b) => (b.date || '') >= todayS && b.status !== 'lemondva');
  else if (filter === 'past')
    list = list.filter((b) => (b.date || '') < todayS || b.status === 'lemondva');
  list.sort((a, b) => {
    const av = (a.date || '') + (a.time || ''),
      bv = (b.date || '') + (b.time || '');
    return filter === 'past' ? bv.localeCompare(av) : av.localeCompare(bv);
  });
  if (!list.length) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="color:var(--muted);text-align:center;padding:24px">Nincs megjeleníthető foglalás. Új felvétele a „+ Foglalás" gombbal, vagy érkezik a beágyazott foglalóból.</td></tr>';
    return;
  }
  tbody.innerHTML = list
    .map((b) => {
      const s = BOOKING_STATUS_MAP[b.status] || BOOKING_STATUS_MAP.uj;
      const isNew = b.status === 'uj';
      const statusSelect = `
      <select class="status-select ${s.cls}" onchange="setBookingStatus('${b.id}', this.value);this.className='status-select '+((BOOKING_STATUS_MAP[this.value]||{}).cls||'s-gray')">
        ${Object.entries(BOOKING_STATUS_MAP)
          .map(
            ([k, v]) =>
              `<option value="${k}"${k === b.status ? ' selected' : ''}>${v.label}</option>`
          )
          .join('')}
      </select>`;
      const delBtn = `<button title="Törlés" onclick="deleteBooking('${b.id}')" style="margin-left:6px;border:none;background:transparent;color:var(--muted);cursor:pointer;font-size:14px;line-height:1;padding:2px 4px;border-radius:5px" onmouseover="this.style.color='var(--red)';this.style.background='var(--surface2)'" onmouseout="this.style.color='var(--muted)';this.style.background='transparent'">✕</button>`;
      return `<tr style="${isNew ? 'background:rgba(210,59,59,0.035)' : ''}">
      <td style="white-space:nowrap">
        <strong style="font-variant-numeric:tabular-nums">${escHtml(b.time || '—')}</strong>
        <div style="font-size:11px;color:var(--muted)">${escHtml(fmtDateHu(b.date))}${b.durationMin ? ' · ' + b.durationMin + ' ' + L('p', 'min') : ''}</div>
      </td>
      <td>
        <strong>${escHtml(b.name || '—')}</strong>
        <div style="font-size:10.5px;color:var(--muted)">${escHtml(b.email || '')}${b.phone ? ' · 📞 ' + escHtml(b.phone) : ''}</div>
      </td>
      <td>
        <span class="badge badge-cyan" style="font-size:10px">${escHtml(b.serviceLoc || b.service || '—')}</span>
        ${b.price ? `<div style="font-size:10.5px;color:var(--muted);margin-top:3px">${escHtml(fmtCur(b.price, b.currency))}</div>` : ''}
      </td>
      <td style="max-width:200px">
        <div style="font-size:11.5px;color:var(--muted);line-height:1.4;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical">${escHtml(b.message || '')}</div>
      </td>
      <td style="white-space:nowrap">${statusSelect}${delBtn}</td>
    </tr>`;
    })
    .join('');
}
function renderClients() {
  const wrap = document.getElementById('clients-wrap');
  if (!wrap) return;
  const map = {};
  Object.values(state.bookings || {}).forEach((b) => {
    const kkey = (b.email || b.name || '').toLowerCase().trim() || '_' + b.id;
    if (!map[kkey])
      map[kkey] = {
        name: b.name || '—',
        email: b.email || '',
        phone: b.phone || '',
        count: 0,
        last: '',
        next: ''
      };
    const c = map[kkey];
    c.count++;
    if (b.name && !c.name) c.name = b.name;
    if (b.phone && !c.phone) c.phone = b.phone;
    const dt = (b.date || '') + ' ' + (b.time || '');
    const todayS = now();
    if (b.status !== 'lemondva') {
      if ((b.date || '') >= todayS) {
        if (!c.next || dt < c.next) c.next = dt;
      }
      if (!c.last || dt > c.last) c.last = dt;
    }
  });
  const clients = Object.values(map).sort(
    (a, b) => (b.next || '').localeCompare(a.next || '') || b.count - a.count
  );
  if (!clients.length) {
    wrap.innerHTML =
      '<div class="card"><div class="sl-empty">Még nincs ügyfél — az első foglalással jelenik meg.</div></div>';
    return;
  }
  wrap.innerHTML =
    '<div class="card" style="padding:0;overflow:hidden"><div style="overflow-x:auto"><table class="data-table"><thead><tr>' +
    '<th>Ügyfél</th><th>Elérhetőség</th><th style="text-align:right">Foglalás</th><th>Következő</th></tr></thead><tbody>' +
    clients
      .map(
        (c) => `<tr>
      <td><strong>${escHtml(c.name)}</strong></td>
      <td style="font-size:12px;color:var(--muted)">${escHtml(c.email)}${c.phone ? ' · 📞 ' + escHtml(c.phone) : ''}</td>
      <td style="text-align:right;font-variant-numeric:tabular-nums">${c.count}</td>
      <td style="font-size:12px">${c.next ? escHtml(fmtDateHu(c.next.slice(0, 10)) + ' ' + c.next.slice(11)) : '<span style="color:var(--muted)">—</span>'}</td>
    </tr>`
      )
      .join('') +
    '</tbody></table></div></div>';
}
document.addEventListener('swm:ready', () => {
  const d = document.getElementById('bm-date');
  if (d && !d.value) d.value = now();
  renderBookingsTable();
  updateBookingsBadge();
  if (typeof renderClients === 'function') renderClients();
  initInboxSync();
});
