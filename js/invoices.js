function invUid() {
  return Math.random().toString(36).slice(2, 9);
}
function fmtHuf(n) {
  if (n === undefined || n === null || isNaN(n)) n = 0;
  return Math.round(n).toLocaleString('hu-HU') + ' Ft';
}
function pad4(n) {
  return String(n).padStart(4, '0');
}
function nextBookingNum(dateStr) {
  const year = (dateStr || now()).slice(0, 4);
  if (!state.bookingNumByYear) state.bookingNumByYear = {};
  const seq = (state.bookingNumByYear[year] || 0) + 1;
  state.bookingNumByYear[year] = seq;
  return 'slotli/' + year + '/' + pad4(seq);
}
function migrateBookingNumbers() {
  const bookings = Object.values(state.bookings || {});
  if (!state.bookingNumByYear || typeof state.bookingNumByYear !== 'object')
    state.bookingNumByYear = {};
  bookings.forEach((b) => {
    const m = b && b.num && /^slotli\/(\d{4})\/(\d+)$/.exec(b.num);
    if (m) {
      const y = m[1],
        n = parseInt(m[2], 10);
      b.num = 'slotli/' + y + '/' + pad4(n);
      if (n > (state.bookingNumByYear[y] || 0)) state.bookingNumByYear[y] = n;
    }
  });
  bookings
    .filter((b) => b && !b.num)
    .sort(
      (a, b) =>
        (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')) ||
        (a.id || '').localeCompare(b.id || '')
    )
    .forEach((b) => {
      b.num = nextBookingNum(b.date);
    });
}
function nextInvoiceNumForBooking(booking) {
  if (booking && !booking.num) booking.num = nextBookingNum(booking.date);
  const base = booking && booking.num ? booking.num : 'slotli/' + now().slice(0, 4) + '/0000';
  const seq =
    (state.invoices || []).filter((iv) => booking && iv.bookingId === booking.id).length + 1;
  return 'sz_' + base + '_' + pad4(seq);
}
function applyUiLang() {
  const lang = state && state.uiLang === 'en' ? 'en' : 'hu';
  try {
    document.documentElement.setAttribute('lang', lang);
  } catch (e) {}
  document.querySelectorAll('#acct-lang-seg [data-lang-pref]').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-lang-pref') === lang);
  });
  const note = document.getElementById('acct-lang-note');
  if (note)
    note.textContent = lang === 'en' ? 'Interface language: English' : 'Felület nyelve: Magyar';
  if (lang === 'en' && typeof translateToEn === 'function') {
    translateToEn(document.body);
    startI18nObserver();
  }
}
function setUiLang(lang) {
  lang = lang === 'en' ? 'en' : 'hu';
  state.uiLang = lang;
  if (lang === 'hu' && typeof restoreHu === 'function') restoreHu(document.body);
  if (typeof save === 'function') save();
  if (typeof renderAll === 'function') renderAll();
  if (typeof renderBooker === 'function') {
    try {
      renderBooker();
    } catch (e) {}
  }
  applyUiLang();
}
const TAX_FORMS = {
  kata: 'KATA – Kisadózó vállalkozók tételes adója',
  atalany: 'Átalányadózás',
  vszja: 'Vállalkozói SZJA (tételes költségelszámolás)',
  tao: 'Társasági adó (TAO)',
  kiva: 'KIVA – Kisvállalati adó'
};
const BIZ_TAX_OPTIONS = {
  ev: ['kata', 'atalany', 'vszja'],
  ec: ['atalany', 'vszja', 'tao', 'kiva'],
  bt: ['tao', 'kiva'],
  kkt: ['tao', 'kiva'],
  kft: ['tao', 'kiva'],
  zrt: ['tao', 'kiva'],
  nyrt: ['tao', 'kiva'],
  szov: ['tao', 'kiva'],
  '': ['kata', 'atalany', 'vszja', 'tao', 'kiva']
};
const TAX_NOTES = {
  kata: 'KATA: csak főállású egyéni vállalkozó, aki kizárólag magánszemélyeknek számláz. Havi tétel 50 000 Ft, éves bevételi plafon 18 M Ft.',
  atalany:
    'Átalányadózás: vélelmezett költséghányad alapján; a legtöbb egyéni vállalkozó számára egyszerű, kiszámítható.',
  vszja:
    'Vállalkozói SZJA: tételes költségelszámolás — a ténylegesen igazolt költségeket vonhatod le.',
  tao: 'Társasági adó: 9% társasági adó a nyereségre; társaságok általános adózási módja.',
  kiva: 'KIVA: kisvállalati adó — a bér- és osztalékalapú társaságoknak lehet kedvező.'
};
function onBizFormChange() {
  const bizSel = document.getElementById('acct-bizform');
  const taxSel = document.getElementById('acct-taxform');
  if (!bizSel || !taxSel) return;
  const allowed = BIZ_TAX_OPTIONS[bizSel.value] || BIZ_TAX_OPTIONS[''];
  const prev = taxSel.value;
  let html = '<option value="">Nincs megadva</option>';
  allowed.forEach((k) => {
    html += '<option value="' + k + '">' + TAX_FORMS[k] + '</option>';
  });
  taxSel.innerHTML = html;
  taxSel.value = allowed.indexOf(prev) !== -1 ? prev : '';
  updateTaxNote();
}
function updateTaxNote() {
  const taxSel = document.getElementById('acct-taxform');
  const note = document.getElementById('acct-tax-note');
  if (!note) return;
  const k = taxSel ? taxSel.value : '';
  note.textContent =
    TAX_NOTES[k] ||
    'Válaszd ki a vállalkozási formát, majd a hozzá tartozó adózási módot — ezt a számlázásnál használjuk.';
}
function setAcctNote(id, text, isErr) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text || '';
  el.style.color = isErr ? 'var(--red)' : 'var(--muted)';
}
function populateAccountForms() {
  const p = (state && state.profile) || {
    name: '',
    businessForm: '',
    taxForm: ''
  };
  const nameEl = document.getElementById('acct-name');
  if (nameEl) nameEl.value = p.name || '';
  const emailEl = document.getElementById('acct-email-input');
  let email = '';
  try {
    if (LocalStore.currentUser) email = LocalStore.currentUser.email || '';
  } catch (e) {}
  if (emailEl) emailEl.value = email;
  const emailTxt = document.getElementById('acct-email');
  if (emailTxt) emailTxt.textContent = email || '—';
  const bizSel = document.getElementById('acct-bizform');
  if (bizSel) bizSel.value = p.businessForm || '';
  onBizFormChange();
  const taxSel = document.getElementById('acct-taxform');
  if (taxSel) {
    taxSel.value = p.taxForm || '';
    taxSel.onchange = updateTaxNote;
  }
  updateTaxNote();
  const si = (state && state.sellerInfo) || {};
  const setv = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.value = v || '';
  };
  setv('seller-name', si.name);
  setv('seller-tax', si.tax);
  setv('seller-address', si.address);
  setv('seller-reg', si.reg);
  setv('seller-bank', si.bank);
  setv('seller-email', si.email);
  setv('seller-phone', si.phone);
  const vatSel = document.getElementById('seller-vat');
  if (vatSel) vatSel.value = si.vatRegistered ? 'afas' : 'alanyi';
  const vatRate = document.getElementById('seller-vatrate');
  if (vatRate) vatRate.value = si.vatRate == null ? 27 : si.vatRate;
  onVatStatusChange();
  ['acct-pw0', 'acct-pw1', 'acct-pw2'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  setAcctNote('acct-pw-note', '');
  setAcctNote('acct-profile-note', '');
  setAcctNote('acct-biz-note', '');
  setAcctNote('acct-seller-note', '');
  applyUiLang();
  if (typeof refreshSidebarAccount === 'function') refreshSidebarAccount();
}
async function saveAccountProfile() {
  const nameEl = document.getElementById('acct-name');
  const emailEl = document.getElementById('acct-email-input');
  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';
  if (!state.profile)
    state.profile = {
      name: '',
      businessForm: '',
      taxForm: ''
    };
  state.profile.name = name;
  try {
    await LocalStore.updateProfileName(name);
    if (email && LocalStore.currentUser && email !== LocalStore.currentUser.email) {
      await LocalStore.updateEmail(email);
      currentUid = LocalStore.uid();
    }
  } catch (err) {
    setAcctNote('acct-profile-note', hibaSzoveg(err), true);
    return;
  }
  save();
  if (typeof refreshSidebarAccount === 'function') refreshSidebarAccount();
  const emailTxt = document.getElementById('acct-email');
  if (emailTxt && LocalStore.currentUser)
    emailTxt.textContent = LocalStore.currentUser.email || '—';
  setAcctNote('acct-profile-note', 'Profil mentve ✓');
  setTimeout(() => setAcctNote('acct-profile-note', ''), 2500);
}
function saveBusinessProfile() {
  const bizSel = document.getElementById('acct-bizform');
  const taxSel = document.getElementById('acct-taxform');
  if (!state.profile)
    state.profile = {
      name: '',
      businessForm: '',
      taxForm: ''
    };
  state.profile.businessForm = bizSel ? bizSel.value : '';
  state.profile.taxForm = taxSel ? taxSel.value : '';
  save();
  setAcctNote('acct-biz-note', 'Mentve ✓');
  setTimeout(() => setAcctNote('acct-biz-note', ''), 2500);
}
async function changeAccountPassword() {
  const p0 = document.getElementById('acct-pw0');
  const p1 = document.getElementById('acct-pw1');
  const p2 = document.getElementById('acct-pw2');
  const v0 = p0 ? p0.value : '';
  const v1 = p1 ? p1.value : '';
  const v2 = p2 ? p2.value : '';
  if (!v0) {
    setAcctNote('acct-pw-note', 'Add meg a jelenlegi jelszavad.', true);
    return;
  }
  if (v1.length < 6) {
    setAcctNote('acct-pw-note', 'A jelszó legalább 6 karakter legyen.', true);
    return;
  }
  if (v1 !== v2) {
    setAcctNote('acct-pw-note', 'A két jelszó nem egyezik.', true);
    return;
  }
  if (!LocalStore.currentUser) {
    setAcctNote('acct-pw-note', 'Nincs bejelentkezett fiók.', true);
    return;
  }
  try {
    await LocalStore.reauth(v0);
    await LocalStore.updatePassword(v1);
    if (p0) p0.value = '';
    if (p1) p1.value = '';
    if (p2) p2.value = '';
    setAcctNote('acct-pw-note', 'Jelszó módosítva ✓');
  } catch (err) {
    setAcctNote('acct-pw-note', hibaSzoveg(err), true);
  }
}
function sendAccountPasswordReset() {
  var u = LocalStore.currentUser;
  if (!u || !u.email) {
    setAcctNote('acct-pw-note', 'Nincs bejelentkezett fiók.', true);
    return;
  }
  LocalStore.resetPassword(u.email)
    .then(function () {
      setAcctNote('acct-pw-note', 'Elküldtük a jelszó-visszaállító linket az e-mail címedre.');
    })
    .catch(function (err) {
      setAcctNote('acct-pw-note', hibaSzoveg(err), true);
    });
}
function saveSellerInfo() {
  const gv = (id) => ((document.getElementById(id) || {}).value || '').trim();
  state.sellerInfo = {
    name: gv('seller-name'),
    address: gv('seller-address'),
    tax: gv('seller-tax'),
    reg: gv('seller-reg'),
    bank: gv('seller-bank'),
    email: gv('seller-email'),
    phone: gv('seller-phone'),
    vatRegistered: gv('seller-vat') === 'afas',
    vatRate: parseFloat((document.getElementById('seller-vatrate') || {}).value) || 0 || 27
  };
  save();
  setAcctNote('acct-seller-note', 'Cégadatok mentve ✓');
  setTimeout(() => setAcctNote('acct-seller-note', ''), 2500);
}
function onVatStatusChange() {
  const sel = document.getElementById('seller-vat');
  const wrap = document.getElementById('seller-vatrate-wrap');
  if (wrap) wrap.style.display = sel && sel.value === 'afas' ? '' : 'none';
}
function openDataModal() {
  if (typeof openModal === 'function') openModal('data-modal');
}
function invTotal(inv) {
  return (inv.items || []).reduce((s, it) => s + (it.qty || 1) * (it.unitPrice || 0), 0);
}
function invTotalHuf(inv) {
  const net = invTotal(inv);
  const rate = typeof eurHufRate === 'function' ? eurHufRate() : 400;
  return inv && inv.currency === 'EUR' ? Math.round(net * (Number(inv.fxRate) || rate)) : net;
}
function invNextNum() {
  const y = new Date().getFullYear();
  const nums = (state.invoices || [])
    .map((i) => i.invoiceNum || '')
    .filter((n) => n.startsWith(y + '-'))
    .map((n) => parseInt(n.slice(5)) || 0);
  const next = nums.length ? Math.max.apply(null, nums) + 1 : 1;
  return y + '-' + String(next).padStart(3, '0');
}
function billableBookings() {
  const all = state.invoices || [];
  const todayS = now();
  return Object.values(state.bookings || {})
    .filter(
      (b) =>
        b.status !== 'lemondva' &&
        (b.date || '') <= todayS &&
        !all.some((i) => i.bookingId === b.id)
    )
    .sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));
}
function invOpen(bookingId) {
  const b = (state.bookings || {})[bookingId];
  if (!b) return;
  const sv = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val == null ? '' : val;
  };
  sv('inv-booking-id', bookingId);
  sv('inv-num', nextInvoiceNumForBooking(b));
  sv('inv-issue-date', now());
  const due = new Date();
  due.setDate(due.getDate() + 8);
  sv('inv-due-date', due.toISOString().slice(0, 10));
  sv('inv-buyer-name', b.name || '');
  sv('inv-buyer-address', '');
  sv('inv-buyer-tax', '');
  const svcName = b.serviceLoc || b.service || 'Szolgáltatás';
  const when = b.date ? ' — ' + b.date + (b.time ? ' ' + b.time : '') : '';
  sv('inv-item-desc', svcName + when);
  sv('inv-item-qty', '1');
  sv('inv-item-unit', 'alkalom');
  sv('inv-item-price', b.price || 0);
  const si = state.sellerInfo || {};
  sv('inv-seller-name', si.name || '');
  sv('inv-seller-address', si.address || '');
  sv('inv-seller-tax', si.tax || '');
  sv('inv-note', '');
  invUpdatePreview();
  openModal('invoice-modal');
}
function invUpdatePreview() {
  const qty = parseFloat((document.getElementById('inv-item-qty') || {}).value) || 0;
  const price =
    parseFloat(
      ((document.getElementById('inv-item-price') || {}).value || '').replace(/\s/g, '')
    ) || 0;
  const el = document.getElementById('inv-preview-total');
  if (el)
    el.textContent =
      qty && price ? 'Végösszeg: ' + Math.round(qty * price).toLocaleString('hu-HU') + ' Ft' : '';
}
function invSave() {
  const gv = (id) => ((document.getElementById(id) || {}).value || '').trim();
  const bookingId = gv('inv-booking-id');
  const invoiceNum = gv('inv-num');
  const issueDate = gv('inv-issue-date');
  const dueDate = gv('inv-due-date');
  const sellerName = gv('inv-seller-name');
  const sellerAddr = gv('inv-seller-address');
  const sellerTax = gv('inv-seller-tax');
  const buyerName = gv('inv-buyer-name');
  const buyerAddr = gv('inv-buyer-address');
  const buyerTax = gv('inv-buyer-tax');
  const itemDesc = gv('inv-item-desc');
  const itemUnit = gv('inv-item-unit') || 'alkalom';
  const itemQty = parseFloat((document.getElementById('inv-item-qty') || {}).value) || 1;
  const itemPrice =
    parseFloat(
      ((document.getElementById('inv-item-price') || {}).value || '').replace(/\s/g, '')
    ) || 0;
  const note = gv('inv-note');
  if (!invoiceNum) {
    uiAlert('Add meg a számlaszámot!');
    return;
  }
  if (!issueDate) {
    uiAlert('Add meg a kiállítás dátumát!');
    return;
  }
  if (!sellerName) {
    uiAlert('Add meg a kiállító nevét!');
    return;
  }
  if (!buyerName) {
    uiAlert('Add meg a vevő nevét!');
    return;
  }
  const prevSeller = state.sellerInfo || {};
  state.sellerInfo = {
    name: sellerName,
    address: sellerAddr,
    tax: sellerTax,
    reg: prevSeller.reg || '',
    bank: prevSeller.bank || '',
    email: prevSeller.email || '',
    phone: prevSeller.phone || '',
    vatRegistered: !!prevSeller.vatRegistered,
    vatRate: prevSeller.vatRate == null ? 27 : prevSeller.vatRate
  };
  const booking = (state.bookings || {})[bookingId];
  const invCurrency = booking && booking.currency === 'EUR' ? 'EUR' : 'HUF';
  const rate = typeof eurHufRate === 'function' ? eurHufRate() : 400;
  const invFxRate = invCurrency === 'EUR' ? Number(booking && booking.fxRate) || rate : 0;
  const inv = {
    id: invUid(),
    bookingId,
    invoiceNum,
    issueDate,
    dueDate,
    sellerName,
    sellerAddress: sellerAddr,
    sellerTax,
    sellerReg: state.sellerInfo.reg,
    sellerBank: state.sellerInfo.bank,
    sellerEmail: state.sellerInfo.email,
    sellerPhone: state.sellerInfo.phone,
    buyerName,
    buyerAddress: buyerAddr,
    buyerTax,
    items: [
      {
        desc: itemDesc,
        qty: itemQty,
        unit: itemUnit,
        unitPrice: itemPrice
      }
    ],
    currency: invCurrency,
    fxRate: invFxRate,
    vatRegistered: state.sellerInfo.vatRegistered,
    vatRate: state.sellerInfo.vatRate,
    note,
    paid: false,
    paidDate: ''
  };
  if (!state.invoices) state.invoices = [];
  state.invoices.push(inv);
  save();
  closeModal('invoice-modal');
  renderInvoices();
}
function invMarkPaid(id) {
  const inv = (state.invoices || []).find((x) => x.id === id);
  if (!inv || inv.paid) return;
  inv.paid = true;
  inv.paidDate = now();
  if (!state.bizIncome) state.bizIncome = [];
  state.bizIncome.push({
    id: invUid(),
    invoiceId: inv.id,
    bookingId: inv.bookingId || '',
    date: inv.paidDate,
    source: inv.buyerName,
    cat: 'Szolgáltatás',
    amount: invTotalHuf(inv),
    taxPct: state.bizTaxRate || 0,
    note: inv.invoiceNum
  });
  save();
  renderInvoices();
}
async function invDelete(id) {
  if (
    !(await uiConfirm('Biztosan törlöd ezt a számlát?', {
      title: 'Megerősítés'
    }))
  )
    return;
  state.invoices = (state.invoices || []).filter((x) => x.id !== id);
  save();
  renderInvoices();
}
function reconcileInvoiceIncomes() {
  if (!state.invoices || !state.bizIncome) return;
  state.invoices
    .filter((inv) => inv.paid)
    .forEach((inv) => {
      const exists = state.bizIncome.some((r) => r.invoiceId === inv.id);
      if (!exists) {
        state.bizIncome.push({
          id: invUid(),
          invoiceId: inv.id,
          bookingId: inv.bookingId || '',
          date: inv.paidDate || now(),
          source: inv.buyerName,
          cat: 'Szolgáltatás',
          amount: invTotalHuf(inv),
          taxPct: state.bizTaxRate || 0,
          note: inv.invoiceNum
        });
      }
    });
  state.bizIncome = state.bizIncome.filter(
    (r) => !r.invoiceId || state.invoices.some((inv) => inv.id === r.invoiceId)
  );
}
function renderInvoices() {
  if (!state.invoices) state.invoices = [];
  const allInv = state.invoices;
  const paidInv = allInv.filter((i) => i.paid);
  const unpaidInv = allInv.filter((i) => !i.paid && (!i.dueDate || i.dueDate >= now()));
  const overdueInv = allInv.filter((i) => !i.paid && i.dueDate && i.dueDate < now());
  const sumOf = (arr) => arr.reduce((s, i) => s + invTotal(i), 0);
  const se = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.textContent = v;
  };
  se('inv-total-count', allInv.length + ' db');
  se('inv-total-sum', fmtHuf(sumOf(allInv)));
  se('inv-paid-count', paidInv.length + ' db');
  se('inv-paid-sum', fmtHuf(sumOf(paidInv)));
  se('inv-unpaid-count', unpaidInv.length + ' db');
  se(
    'inv-unpaid-sum',
    fmtHuf(sumOf(unpaidInv)) +
      ' ' +
      (typeof L === 'function' ? L('kintlévőség', 'outstanding') : 'kintlévőség')
  );
  se('inv-overdue-count', overdueInv.length + ' db');
  se('inv-overdue-sum', fmtHuf(sumOf(overdueInv)));
  const panel = document.getElementById('inv-bookings-list');
  if (panel) {
    const bills = billableBookings();
    if (!bills.length) {
      panel.innerHTML =
        '<div style="color:var(--muted);font-size:12.5px">Nincs számlázható foglalás. Az aznapi vagy már elmúlt, nem lemondott foglalások számlázhatók.</div>';
    } else {
      panel.innerHTML = bills
        .map((b) => {
          return `<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--surface3)">
          <div style="flex:1;min-width:0">
            <div style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escHtml(b.name || '—')}</div>
            <div style="font-size:11px;color:var(--muted)">${escHtml(b.serviceLoc || b.service || '')} · ${escHtml(fmtDateHu(b.date))} ${escHtml(b.time || '')}${b.price ? ' · ' + escHtml(fmtCur(b.price, b.currency)) : ''}</div>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="invOpen('${b.id}')">+ Számla</button>
        </div>`;
        })
        .join('');
    }
  }
  const unpaidTbody = document.getElementById('invoices-unpaid-tbody');
  const paidTbody = document.getElementById('invoices-paid-tbody');
  if (!unpaidTbody || !paidTbody) return;
  const sorted = allInv
    .slice()
    .sort((a, b) => (b.issueDate || '').localeCompare(a.issueDate || ''));
  const renderRow = (inv) => {
    const booking = (state.bookings || {})[inv.bookingId];
    const total = invTotal(inv);
    const overdue = !inv.paid && inv.dueDate && inv.dueDate < now();
    const statusBadge = inv.paid
      ? `<span class="badge badge-green">Fizetve</span><div style="font-size:10px;color:var(--muted)">${inv.paidDate}</div>`
      : overdue
        ? `<span class="badge badge-red">Lejárt</span><div style="font-size:10px;color:var(--muted)">hat: ${inv.dueDate}</div>`
        : `<span class="badge badge-yellow">Függőben</span><div style="font-size:10px;color:var(--muted)">hat: ${inv.dueDate || '—'}</div>`;
    const bookingLabel = booking ? booking.serviceLoc || booking.service || '—' : '—';
    return `<tr>
      <td style="font-family:var(--mono);font-size:12px;font-weight:600">${escHtml(inv.invoiceNum)}</td>
      <td>${inv.issueDate || '—'}</td>
      <td style="font-weight:600">${escHtml(inv.buyerName)}</td>
      <td style="color:var(--muted);font-size:11.5px">${escHtml(bookingLabel)}</td>
      <td style="font-weight:700">${fmtHuf(total)}</td>
      <td>${statusBadge}</td>
      <td>
        <div class="row-actions">
          <button class="btn btn-secondary btn-sm" onclick="invDownloadPDF('${inv.id}')">📄 PDF</button>
          ${!inv.paid ? `<button class="btn btn-sm" style="background:var(--accent);border-color:var(--accent);color:#fff" onclick="invMarkPaid('${inv.id}')">✓ Fizetve</button>` : `<button class="btn btn-secondary btn-sm" onclick="invDelete('${inv.id}')">Törlés</button>`}
        </div>
      </td>
    </tr>`;
  };
  const unpaid = sorted.filter((i) => !i.paid);
  const paid = sorted.filter((i) => i.paid);
  unpaidTbody.innerHTML = unpaid.length
    ? unpaid.map(renderRow).join('')
    : '<tr><td colspan="7" style="color:var(--muted);text-align:center;padding:24px">Nincs függőben lévő számla.</td></tr>';
  paidTbody.innerHTML = paid.length
    ? paid.map(renderRow).join('')
    : '<tr><td colspan="7" style="color:var(--muted);text-align:center;padding:24px">Még nincs kifizetett számla.</td></tr>';
}
function invDownloadPDF(id) {
  const inv = (state.invoices || []).find((x) => x.id === id);
  if (!inv) return;
  const rate = typeof eurHufRate === 'function' ? eurHufRate() : 400;
  const net = invTotal(inv);
  const vatReg = !!inv.vatRegistered;
  const vatRate = Number(inv.vatRate) || 27;
  const vat = vatReg ? Math.round((net * vatRate) / 100) : 0;
  const gross = net + vat;
  const cur = inv.currency === 'EUR' ? 'EUR' : 'HUF';
  const fx = Number(inv.fxRate) || rate;
  const fmtM = (n) =>
    cur === 'EUR'
      ? '€' + Math.round(n).toLocaleString('hu-HU')
      : Math.round(n).toLocaleString('hu-HU') + ' Ft';
  const esc = (s) =>
    String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  const itemRows = (inv.items || [])
    .map(
      (it) => `
    <tr>
      <td>${esc(it.desc)}</td>
      <td style="text-align:center">${it.qty} ${esc(it.unit)}</td>
      <td style="text-align:right">${fmtM(it.unitPrice)}</td>
      <td style="text-align:right;font-weight:600">${fmtM(it.qty * it.unitPrice)}</td>
    </tr>`
    )
    .join('');
  const eurNote =
    cur === 'EUR'
      ? `<div class="aam" style="font-style:normal;color:#33544d">Átváltás tájékoztató jelleggel — 1 € = ${Math.round(fx).toLocaleString('hu-HU')} Ft · Fizetendő HUF-ban: <strong>${Math.round(gross * fx).toLocaleString('hu-HU')} Ft</strong></div>`
      : '';
  const totalsHtml =
    (vatReg
      ? `<div class="trow"><span>Nettó összesen</span><span>${fmtM(net)}</span></div>
       <div class="trow sep"><span>ÁFA (${vatRate}%)</span><span>${fmtM(vat)}</span></div>
       <div class="tfinal"><span class="lbl">Fizetendő (bruttó)</span><span class="amt">${fmtM(gross)}</span></div>`
      : `<div class="tfinal"><span class="lbl">Fizetendő</span><span class="amt">${fmtM(net)}</span></div>
       <div class="aam">Alanyi adómentes (AAM) — a számla áfát nem tartalmaz.</div>`) + eurNote;
  const html = `<!DOCTYPE html>
<html lang="hu"><head><meta charset="UTF-8"><title>Számla ${esc(inv.invoiceNum)}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito:wght@600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',-apple-system,'Segoe UI',sans-serif;font-size:13px;color:#0f1e26;background:#e4f3ef;padding:48px 40px}
  .sheet{max-width:820px;margin:0 auto;background:#ffffff;border:1px solid #cbe5df;border-radius:20px;padding:44px 46px}
  .top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:38px}
  .brand{display:flex;align-items:center;gap:11px}
  .brand .tile{width:34px;height:34px;flex:0 0 34px}
  .logo{font-family:'Nunito',sans-serif;font-size:23px;font-weight:800;color:#0f1e26}.logo span{color:#0b7f8f}
  .inv-meta{text-align:right}
  .inv-meta h1{font-family:'Nunito',sans-serif;font-size:33px;font-weight:800;letter-spacing:-0.3px;color:#0f1e26}
  .inv-meta .num{font-size:12.5px;color:#5a7382;font-weight:600;margin-top:2px;letter-spacing:.3px}
  .parties{display:grid;grid-template-columns:1fr 1fr;gap:34px;margin-bottom:30px}
  .party{border-top:2px solid #0e9aac;padding-top:12px}
  .plabel{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:1.4px;color:#5a7382;margin-bottom:8px}
  .pname{font-size:15px;font-weight:700;margin-bottom:3px}
  .pinfo{font-size:12px;color:#5a7382;line-height:1.65}
  .dates{display:flex;gap:32px;flex-wrap:wrap;padding:14px 0;border-top:1px solid #cbe5df;border-bottom:1px solid #cbe5df;margin-bottom:26px}
  .dlabel{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#5a7382;margin-bottom:3px}
  .dval{font-size:13.5px;font-weight:700}
  table{width:100%;border-collapse:collapse;margin-bottom:6px}
  thead th{border-bottom:2px solid #0f1e26;padding:9px 10px;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#5a7382;text-align:left}
  tbody td{padding:12px 10px;border-bottom:1px solid #e0edf2;font-size:13px}
  .totals{display:flex;justify-content:flex-end;margin-top:24px}
  .totals .box{min-width:320px}
  .trow{display:flex;justify-content:space-between;padding:7px 2px;font-size:13px;color:#33544d}
  .trow.sep{border-top:1px solid #cbe5df}
  .tfinal{display:flex;justify-content:space-between;align-items:center;margin-top:10px;background:#0e9aac;color:#fff;padding:15px 20px;border-radius:14px}
  .tfinal .lbl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;opacity:.94}
  .tfinal .amt{font-family:'Nunito',sans-serif;font-size:27px;font-weight:800;letter-spacing:-0.3px}
  .aam{margin-top:10px;text-align:right;font-size:11.5px;color:#5a7382;font-style:italic}
  .pay{text-align:right;margin-top:16px;font-size:12px;color:#33544d}
  .note{border-left:3px solid #0e9aac;background:#e9f2f6;border-radius:0 12px 12px 0;padding:11px 15px;font-size:12px;color:#0b5560;margin-top:22px}
  .footer{border-top:1px solid #cbe5df;margin-top:30px;padding-top:14px;font-size:11px;color:#5a7382;text-align:center}
  .print-btn{margin-top:16px;background:#0e9aac;color:#fff;border:none;border-radius:999px;padding:11px 26px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif}
  @media print{.print-btn{display:none}body{background:#fff;padding:0}.sheet{border:none;border-radius:0;padding:22px 24px;max-width:none}}
</style></head><body>
<div class="sheet">
  <div class="top">
    <div class="brand">
      <svg class="tile" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0e9aac"/><stop offset="1" stop-color="#0b7f8f"/></linearGradient></defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#bg)"/>
        <rect x="14" y="14" width="36" height="36" rx="7" fill="#ffffff"/>
        <rect x="14" y="14" width="36" height="10" rx="5" fill="#0b7f8f"/>
        <rect x="21" y="30" width="8" height="8" rx="2" fill="#12aec4"/>
        <rect x="35" y="30" width="8" height="8" rx="2" fill="#bfe8e2"/>
      </svg>
      <div class="logo">Slot<span>li</span></div>
    </div>
    <div class="inv-meta"><h1>Számla</h1><div class="num">${esc(inv.invoiceNum)}</div></div>
  </div>
  <div class="parties">
    <div class="party"><div class="plabel">Kiállító (Eladó)</div><div class="pname">${esc(inv.sellerName)}</div>
      <div class="pinfo">${inv.sellerAddress ? esc(inv.sellerAddress) : ''}${inv.sellerTax ? '<br>Adószám: ' + esc(inv.sellerTax) : ''}${inv.sellerReg ? '<br>Cégjegyzék-/nyilv. szám: ' + esc(inv.sellerReg) : ''}${inv.sellerEmail ? '<br>' + esc(inv.sellerEmail) : ''}${inv.sellerPhone ? '<br>' + esc(inv.sellerPhone) : ''}</div></div>
    <div class="party"><div class="plabel">Vevő</div><div class="pname">${esc(inv.buyerName)}</div>
      <div class="pinfo">${inv.buyerAddress ? esc(inv.buyerAddress) : ''}${inv.buyerTax ? '<br>Adószám: ' + esc(inv.buyerTax) : ''}</div></div>
  </div>
  <div class="dates">
    <div><div class="dlabel">Kiállítás dátuma</div><div class="dval">${inv.issueDate || '—'}</div></div>
    <div><div class="dlabel">Teljesítés dátuma</div><div class="dval">${inv.issueDate || '—'}</div></div>
    <div><div class="dlabel">Fizetési határidő</div><div class="dval">${inv.dueDate || '—'}</div></div>
    <div><div class="dlabel">Fizetési mód</div><div class="dval">Átutalás</div></div>
  </div>
  <table>
    <thead><tr><th style="width:50%">Megnevezés</th><th style="text-align:center">Mennyiség</th><th style="text-align:right">${vatReg ? 'Nettó egységár' : 'Egységár'}</th><th style="text-align:right">${vatReg ? 'Nettó összeg' : 'Összeg'}</th></tr></thead>
    <tbody>${itemRows}</tbody>
  </table>
  <div class="totals"><div class="box">${totalsHtml}</div></div>
  ${inv.sellerBank ? `<div class="pay">Fizetés átutalással · Bankszámlaszám: <strong style="color:#0f1e26">${esc(inv.sellerBank)}</strong></div>` : ''}
  ${inv.note ? `<div class="note">📝 ${esc(inv.note)}</div>` : ''}
  <div class="footer">${esc(inv.invoiceNum)} · Kiállítva: ${inv.issueDate || '—'} · Slotli<br>
  <button class="print-btn" onclick="window.print()">Nyomtatás / Mentés PDF-ként</button></div>
</div>
</body></html>`;
  const win = window.open('', '_blank', 'width=900,height=1160');
  if (!win) {
    uiAlert('A böngésző blokkolta a felugró ablakot. Engedélyezd az oldal számára.');
    return;
  }
  win.document.write(html);
  win.document.close();
}
