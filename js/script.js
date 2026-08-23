const SLOTLI_APP_ID = 'slotli';
const FX_FALLBACK_EUR_HUF = 400;
let currentUid = null;
function initStore() {
  LocalStore.init(SLOTLI_APP_ID);
}
const I18N_HU_EN = {
  Áttekintés: 'Overview',
  Foglalások: 'Bookings',
  Ügyfelek: 'Clients',
  Számlák: 'Invoices',
  Foglaló: 'Booker',
  'Foglaló / weboldal': 'Booker / website',
  Fiók: 'Account',
  'Fiók, vállalkozás és megjelenés': 'Account, business & appearance',
  'Betöltés…': 'Loading…',
  'Helyi tárolás': 'Local storage',
  Mentve: 'Saved',
  'Mentési hiba': 'Save error',
  'Betöltési hiba': 'Loading error',
  Mentés: 'Save',
  Törlés: 'Delete',
  Mégse: 'Cancel',
  Bezárás: 'Close',
  Rögzítés: 'Record',
  Megnyitás: 'Open',
  Belépés: 'Sign in',
  Kijelentkezés: 'Sign out',
  'Fiók létrehozása': 'Create account',
  Regisztrálj: 'Register',
  'Elfelejtett jelszó?': 'Forgot password?',
  '+ Foglalás': '+ Booking',
  '↻ Frissítés': '↻ Refresh',
  Frissítés: 'Refresh',
  '+ Szolgáltatás': '+ Service',
  '+ idősáv': '+ time slot',
  'Beállítások mentése': 'Save settings',
  'Kód másolása': 'Copy code',
  'Profil mentése': 'Save profile',
  'Vállalkozási adatok mentése': 'Save business details',
  'Cégadatok mentése': 'Save company details',
  'Jelszó módosítása': 'Change password',
  'Visszaállító e-mail küldése': 'Send reset email',
  '+ Számla': '+ Invoice',
  '💾 Mentés': '💾 Save',
  '⬇ Mentés fájlba (JSON)': '⬇ Export to file (JSON)',
  '⬆ Visszatöltés fájlból': '⬆ Import from file',
  '🗑 Adatok nullázása': '🗑 Reset data',
  'Mentés fájlba': 'Export to file',
  'Visszatöltés fájlból': 'Import from file',
  'Minden adat törlése': 'Delete all data',
  'Nyomtatás / Mentés PDF-ként': 'Print / Save as PDF',
  'Van már fiókod? Lépj be': 'Already have an account? Sign in',
  'Nincs még fiókod? Regisztrálj': 'No account yet? Register',
  'Jelentkezz be az időpontfoglalásaid kezeléséhez.': 'Sign in to manage your appointments.',
  'E-mail': 'Email',
  Jelszó: 'Password',
  'Jelszó újra': 'Repeat password',
  'Mai nap': 'Today',
  'Közelgő foglalások': 'Upcoming bookings',
  'Mai foglalás': "Today's bookings",
  Közelgő: 'Upcoming',
  'Visszaigazolásra vár': 'Awaiting confirmation',
  'Összes (aktív)': 'Total (active)',
  'Ma nincs foglalás.': 'No bookings today.',
  'Nincs közelgő foglalás.': 'No upcoming bookings.',
  'Idei bevétel': 'Revenue this year',
  'Bevétel — utolsó 12 hónap': 'Revenue — last 12 months',
  'Utolsó 12 hónap:': 'Last 12 months:',
  'Nincs még bevétel. A kifizetett számlák jelennek meg itt.':
    'No revenue yet. Paid invoices appear here.',
  'Közelgő + mai': 'Upcoming + today',
  Összes: 'All',
  Korábbi: 'Past',
  Időpont: 'Time',
  Ügyfél: 'Client',
  Szolgáltatás: 'Service',
  Üzenet: 'Message',
  Státusz: 'Status',
  'Nincs megjeleníthető foglalás. Új felvétele a „+ Foglalás" gombbal, vagy érkezik a beágyazott foglalóból.':
    'No bookings to show. Add one with the “+ Booking” button, or they arrive from the embedded booker.',
  'Új foglalás': 'New booking',
  Visszaigazolva: 'Confirmed',
  Teljesült: 'Completed',
  Lemondva: 'Cancelled',
  'Foglalás rögzítése': 'Record booking',
  'Név *': 'Name *',
  'Dátum *': 'Date *',
  'Időpont *': 'Time *',
  Név: 'Name',
  Telefon: 'Phone',
  'Biztosan törlöd ezt a foglalást? A hozzá tartozó idősáv felszabadul.':
    'Are you sure you want to delete this booking? Its time slot will be freed.',
  'Az ügyfelek automatikusan a beérkező foglalásokból állnak össze (e-mail alapján). Itt látod, ki hányszor foglalt, és mikor jön legközelebb.':
    'Clients are built automatically from incoming bookings (by email). See who booked how many times and when they come next.',
  Elérhetőség: 'Contact',
  Foglalás: 'Bookings',
  Következő: 'Next',
  'Még nincs ügyfél — az első foglalással jelenik meg.':
    'No clients yet — they appear with the first booking.',
  'Állítsd be a foglaló-felületed: szolgáltatások időtartammal és árral, nyitvatartás, sávhossz. Alul a beállításaid alapján frissül a beillesztendő kód — másold a weboldaladra. A látogató csak a':
    'Set up your booking page: services with duration and price, opening hours, slot length. The embed code below updates from your settings — copy it to your website. Visitors can only pick from',
  szabad: 'free',
  'idősávokból választhat, és a foglalás azonnal lefoglalja a sávot.':
    'time slots, and the booking reserves the slot immediately.',
  'Szolgáltatások (időtartam + ár)': 'Services (duration + price)',
  Nyitvatartás: 'Opening hours',
  Idősávok: 'Time slots',
  'Sávhossz (perc)': 'Slot length (min)',
  'Foglalható előre (nap)': 'Bookable ahead (days)',
  'Legkorábbi foglalás (óra múlva)': 'Earliest booking (hours from now)',
  '15 perc': '15 min',
  '20 perc': '20 min',
  '30 perc': '30 min',
  '60 perc': '60 min',
  'Megjelenő mezők': 'Visible fields',
  'Árak megjelenítése a szolgáltatásoknál': 'Show prices on services',
  'Telefon mező': 'Phone field',
  'Üzenet mező': 'Message field',
  'E-mail értesítők': 'Email notifications',
  'Élő előnézet': 'Live preview',
  'Beillesztendő kód (HTML + JavaScript) — elég egyszer':
    'Embed code (HTML + JavaScript) — paste once',
  'Fiókazonosító (a kódban: OWNER_UID)': 'Account ID (OWNER_UID in the code)',
  'Add meg a magyar és (ha szeretnéd) az angol nevet, az':
    'Provide the Hungarian and (optionally) the English name, the',
  'időtartamot percben': 'duration in minutes',
  ', és az árat Ft-ban / €-ban. Az időtartam határozza meg, hány idősávot foglal egy szolgáltatás.':
    ', and the price in HUF / EUR. The duration determines how many slots a service takes.',
  'Naponta megadhatod a nyitvatartást. Zárt napon vedd ki a pipát. A widget ezen belül, a sávhossz szerint kínálja fel az időpontokat.':
    'Set opening hours per day. Uncheck closed days. The widget offers times within these hours, by slot length.',
  'Automatikus: minden foglalásnál a rendszer e-mailt küld — neked egy értesítőt (a regisztrációs e-mail címedre), az ügyfélnek egy visszaigazolást az időpontról. Nincs vele teendőd.':
    'Automatic: for every booking the system sends emails — a notification to you (to your registration email) and a confirmation of the time to the client. Nothing to do.',
  'Így fog kinézni a foglaló (a te weboldalad stílusát veszi majd fel). Kipróbálható, de innen nem küld.':
    'This is how the booker will look (it takes on your website’s style). You can try it, but it does not send from here.',
  'Ezt a kódot': 'This code',
  'elég egyetlen egyszer': 'just once is enough',
  'beilleszteni a weboldaladba. Ha itt módosítasz és mentesz, a foglaló magától frissül — nem kell újramásolni. A beérkező foglalás a „Foglalások" fülön jelenik meg. Bármilyen oldalon működik (sima HTML, WordPress „Egyéni HTML" blokk, stb.).':
    'to paste into your website. If you change something here and save, the booker updates automatically — no need to re-copy. Incoming bookings appear on the “Bookings” tab. Works on any page (plain HTML, WordPress “Custom HTML” block, etc.).',
  zárva: 'closed',
  '✓ Mentve és közzétéve': '✓ Saved and published',
  '✓ Vágólapra másolva': '✓ Copied to clipboard',
  'Válassz szolgáltatást és napot az elérhető időpontokhoz.':
    'Choose a service and a day to see available times.',
  'Válassz szolgáltatást…': 'Choose a service…',
  'Válassz napot.': 'Choose a day.',
  'Válassz napot': 'Choose a day',
  'Ezen a napon zárva — nincs szabad időpont.': 'Closed on this day — no free slots.',
  'Válassz időpontot:': 'Choose a time:',
  'Ezen a napon nincs szabad időpont.': 'No free slots on this day.',
  'E-mail *': 'Email *',
  'Időpont foglalása': 'Book appointment',
  'Ez csak előnézet — a valódi foglaló a weboldaladon rögzíti a foglalást.':
    'This is only a preview — the real booker on your site records the booking.',
  'Válassz szolgáltatást!': 'Choose a service!',
  'Válassz napot!': 'Choose a day!',
  'Válassz időpontot!': 'Choose a time!',
  Hétfő: 'Monday',
  Kedd: 'Tuesday',
  Szerda: 'Wednesday',
  Csütörtök: 'Thursday',
  Péntek: 'Friday',
  Szombat: 'Saturday',
  Vasárnap: 'Sunday',
  Profil: 'Profile',
  'Vállalkozás / neved': 'Business / your name',
  'E-mail cím': 'Email address',
  'A bejelentkezéshez tartozik — módosítható.': 'Tied to your login — editable.',
  'Jelenlegi jelszó': 'Current password',
  'Új jelszó': 'New password',
  'Új jelszó megerősítése': 'Confirm new password',
  'Vállalkozási forma és adózás': 'Business form & taxation',
  'Vállalkozási forma': 'Business form',
  'Adózási mód': 'Taxation type',
  'Nincs megadva': 'Not specified',
  'Egyéni vállalkozó': 'Sole proprietor',
  'Egyéni cég (EC)': 'Sole company (EC)',
  'Betéti társaság (Bt.)': 'Limited partnership (Bt.)',
  'Közkereseti társaság (Kkt.)': 'General partnership (Kkt.)',
  'Korlátolt felelősségű társaság (Kft.)': 'Limited liability company (Kft.)',
  'Zártkörű részvénytársaság (Zrt.)': 'Private company (Zrt.)',
  'Nyilvános részvénytársaság (Nyrt.)': 'Public company (Nyrt.)',
  Szövetkezet: 'Cooperative',
  'KATA – Kisadózó vállalkozók tételes adója': 'KATA – Itemized tax for small taxpayers',
  Átalányadózás: 'Flat-rate taxation',
  'Vállalkozói SZJA (tételes költségelszámolás)': 'Entrepreneurial PIT (itemized costs)',
  'Társasági adó (TAO)': 'Corporate tax (TAO)',
  'KIVA – Kisvállalati adó': 'KIVA – Small business tax',
  'Válaszd ki a vállalkozási formát, majd a hozzá tartozó adózási módot — ezt a számlázásnál használjuk.':
    'Choose your business form, then the matching taxation type — we use this for invoicing.',
  'KATA: csak főállású egyéni vállalkozó, aki kizárólag magánszemélyeknek számláz. Havi tétel 50 000 Ft, éves bevételi plafon 18 M Ft.':
    'KATA: full-time sole proprietors invoicing individuals only. Monthly HUF 50,000, annual revenue cap HUF 18M.',
  'Átalányadózás: vélelmezett költséghányad alapján; a legtöbb egyéni vállalkozó számára egyszerű, kiszámítható.':
    'Flat-rate taxation: based on a presumed cost ratio; simple and predictable for most sole proprietors.',
  'Vállalkozói SZJA: tételes költségelszámolás — a ténylegesen igazolt költségeket vonhatod le.':
    'Entrepreneurial PIT: itemized cost accounting — you can deduct actually documented costs.',
  'Társasági adó: 9% társasági adó a nyereségre; társaságok általános adózási módja.':
    'Corporate tax: 9% on profit; the general taxation method for companies.',
  'KIVA: kisvállalati adó — a bér- és osztalékalapú társaságoknak lehet kedvező.':
    'KIVA: small business tax — can be favorable for wage- and dividend-based companies.',
  'Cég adatai (számlázás)': 'Company details (invoicing)',
  'Ezek automatikusan bekerülnek minden új számla „Kiállító" mezőibe — nem kell újra beírni.':
    'These are automatically added to the “Issuer” fields of every new invoice — no need to re-enter.',
  'Cég / név': 'Company / name',
  Adószám: 'VAT number',
  'Cím (székhely)': 'Address (registered office)',
  'Cégjegyzék- / nyilvántartási szám': 'Company reg. number',
  Bankszámlaszám: 'Bank account number',
  'E-mail (számlához)': 'Email (for invoicing)',
  'ÁFA-státusz': 'VAT status',
  'Alanyi adómentes (nem ÁFA-körös)': 'VAT-exempt (not VAT-registered)',
  'ÁFA-körös (ÁFA-t számláz)': 'VAT-registered (charges VAT)',
  'ÁFA-kulcs (%)': 'VAT rate (%)',
  'Ez határozza meg, hogyan jelenik meg az ÁFA a számlán: alanyi adómentesnél „AAM" (áfa nélkül), ÁFA-körösnél nettó + ÁFA + bruttó bontásban. A megadott árakat nettóként kezeli.':
    'This determines how VAT appears on the invoice: for VAT-exempt “AAM” (no VAT), for VAT-registered a net + VAT + gross breakdown. Prices entered are treated as net.',
  'Nyelv / Language': 'Language',
  Magyar: 'Magyar',
  Megjelenés: 'Appearance',
  'Válaszd ki, mikor legyen világos vagy sötét a felület.':
    'Choose when the interface is light or dark.',
  Automatikus: 'Auto',
  Világos: 'Light',
  Sötét: 'Dark',
  'Felület nyelve: Magyar': 'Interface language: Magyar',
  'Interface language: English': 'Interface language: English',
  'Automatikus: 19:00 és 06:00 között sötét, egyébként világos. Most sötét változat aktív.':
    'Auto: dark between 19:00 and 06:00, light otherwise. Dark variant active now.',
  'Automatikus: 19:00 és 06:00 között sötét, egyébként világos. Most világos változat aktív.':
    'Auto: dark between 19:00 and 06:00, light otherwise. Light variant active now.',
  'Mindig sötét változat, a napszaktól függetlenül.': 'Always dark, regardless of time of day.',
  'Mindig világos változat, a napszaktól függetlenül.': 'Always light, regardless of time of day.',
  'Bejelentkezett fiók': 'Signed-in account',
  'Adatok mentése / visszatöltése': 'Save / restore data',
  'Biztonsági mentés JSON-fájlba': 'Backup to a JSON file',
  'Profil mentve ✓': 'Profile saved ✓',
  'Mentve ✓': 'Saved ✓',
  'Jelszó módosítva ✓': 'Password changed ✓',
  'Cégadatok mentve ✓': 'Company details saved ✓',
  'Nincs bejelentkezett fiók.': 'No signed-in account.',
  'A két jelszó nem egyezik.': 'The two passwords do not match.',
  'A jelszó legalább 6 karakter legyen.': 'The password must be at least 6 characters.',
  'A módosítás nem sikerült.': 'The change failed.',
  'Helyi tárolás módban nincs e-mailes visszaállítás — a jelszót itt fent közvetlenül módosíthatod.':
    'In local storage mode there is no email reset — you can change the password directly above.',
  'Összes számla': 'All invoices',
  Kifizetett: 'Paid',
  Függőben: 'Pending',
  Lejárt: 'Overdue',
  'Függőben lévő számlák': 'Pending invoices',
  'Számlázható foglalások': 'Billable bookings',
  'Kattints a „+ Számla" gombra a kiállításhoz': 'Click the “+ Invoice” button to issue one',
  'Nincs függőben lévő számla.': 'No pending invoices.',
  'Még nincs kifizetett számla.': 'No paid invoices yet.',
  'Nincs számlázható foglalás. Az aznapi vagy már elmúlt, nem lemondott foglalások számlázhatók.':
    'No billable bookings. Today’s or past, non-cancelled bookings can be invoiced.',
  Számlaszám: 'Invoice no.',
  Kiállítva: 'Issued',
  Vevő: 'Buyer',
  Összeg: 'Amount',
  Állapot: 'Status',
  'Számla kiállítása': 'Create invoice',
  'Kiállítás dátuma': 'Issue date',
  'Fizetési határidő': 'Payment due',
  'Kiállító (Eladó)': 'Issuer (Seller)',
  'Név / Cégnév': 'Name / company',
  'Adószám (nem kötelező)': 'VAT number (optional)',
  Cím: 'Address',
  Tétel: 'Item',
  Megnevezés: 'Description',
  Mennyiség: 'Quantity',
  Egység: 'Unit',
  'Egységár (Ft)': 'Unit price (HUF)',
  'Megjegyzés (nem kötelező)': 'Note (optional)',
  Fizetve: 'Paid',
  Végösszeg: 'Total',
  'Adatok mentése és visszatöltése': 'Save and restore data',
  'A visszatöltés a jelenlegi adatokat felülírja. A nullázás minden adatot véglegesen töröl ezen az eszközön.':
    'Importing overwrites the current data. Resetting permanently deletes all data on this device.',
  'Visszatöltve.': 'Restored.',
  'Hibás mentésfájl.': 'Invalid backup file.',
  'A mentés nem sikerült.': 'Export failed.',
  'Biztosan törölsz MINDEN adatot ebből a fiókból? Ez nem visszavonható.':
    'Are you sure you want to delete ALL data from this account? This cannot be undone.',
  perc: 'min',
  'Időtartam (perc)': 'Duration (min)',
  'Szolgáltatás neve': 'Service name',
  'Service name (English)': 'Service name (English)',
  'pl. Kovács Fodrászat': 'e.g. Smith Hair Studio',
  'Menü ki- / összecsukása': 'Expand / collapse menu',
  'Idősáv törlése': 'Delete time slot',
  'Bejelentkezve mint:': 'Signed in as:',
  új: 'new',
  Lap: 'Page',
  'Szerkesztőségi, szeriffes, keret nélkül.': 'Editorial, serif, no borders.',
  '✓ Kiválasztva': '✓ Selected'
};
function _i18nWalk(root, fn) {
  if (!root) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentNode;
      if (!p) return NodeFilter.FILTER_REJECT;
      const tag = p.nodeName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA')
        return NodeFilter.FILTER_REJECT;
      return n.nodeValue && n.nodeValue.trim()
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    }
  });
  let n;
  while ((n = w.nextNode())) fn(n);
}
const _i18nText = new WeakMap();
const _i18nAttr = new WeakMap();
function translateToEn(root) {
  root = root || document.body;
  if (root.nodeType === 1 || root.nodeType === 9) {
    _i18nWalk(root, (n) => {
      const raw = n.nodeValue,
        key = raw.trim();
      if (I18N_HU_EN[key]) {
        if (!_i18nText.has(n)) _i18nText.set(n, raw);
        n.nodeValue = raw.replace(key, I18N_HU_EN[key]);
      }
    });
    const els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title]') : [];
    els.forEach((el) => {
      ['placeholder', 'title'].forEach((a) => {
        const v = el.getAttribute(a);
        if (!v) return;
        const key = v.trim();
        if (!I18N_HU_EN[key]) return;
        let store = _i18nAttr.get(el) || {};
        if (store[a] === undefined) {
          store[a] = v;
          _i18nAttr.set(el, store);
        }
        el.setAttribute(a, I18N_HU_EN[key]);
      });
    });
  } else if (root.nodeType === 3) {
    const key = (root.nodeValue || '').trim();
    if (I18N_HU_EN[key]) {
      if (!_i18nText.has(root)) _i18nText.set(root, root.nodeValue);
      root.nodeValue = root.nodeValue.replace(key, I18N_HU_EN[key]);
    }
  }
}
function restoreHu(root) {
  root = root || document.body;
  _i18nWalk(root, (n) => {
    if (_i18nText.has(n)) {
      n.nodeValue = _i18nText.get(n);
      _i18nText.delete(n);
    }
  });
  root.querySelectorAll('[placeholder],[title]').forEach((el) => {
    const store = _i18nAttr.get(el);
    if (!store) return;
    ['placeholder', 'title'].forEach((a) => {
      if (store[a] !== undefined) el.setAttribute(a, store[a]);
    });
    _i18nAttr.delete(el);
  });
}
let _i18nObserver = null;
function startI18nObserver() {
  if (_i18nObserver || typeof MutationObserver === 'undefined') return;
  _i18nObserver = new MutationObserver((muts) => {
    if (!state || state.uiLang !== 'en') return;
    for (const m of muts) {
      m.addedNodes.forEach((n) => {
        if (n.nodeType === 1 || n.nodeType === 3) translateToEn(n);
      });
      if (m.type === 'attributes' && m.target && m.target.nodeType === 1) {
        const el = m.target,
          a = m.attributeName;
        if (a === 'placeholder' || a === 'title') {
          const v = el.getAttribute(a),
            key = (v || '').trim();
          if (I18N_HU_EN[key]) el.setAttribute(a, I18N_HU_EN[key]);
        }
      }
    }
  });
  _i18nObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['placeholder', 'title']
  });
}
function isEn() {
  return !!(state && state.uiLang === 'en');
}
function L(hu, en) {
  return isEn() ? en : hu;
}
function locDate(d, opts) {
  try {
    return d.toLocaleDateString(isEn() ? 'en-GB' : 'hu-HU', opts);
  } catch (e) {
    return '';
  }
}
function showAuthGate(show) {
  const gate = document.getElementById('auth-gate');
  const root = document.getElementById('app-root');
  if (gate) gate.style.display = show ? 'flex' : 'none';
  if (root) root.style.display = show ? 'none' : '';
}
function hibaSzoveg(err) {
  var c = (err && err.code) || '';
  switch (c) {
    case 'auth/invalid-email':
      return 'Érvénytelen e-mail cím.';
    case 'auth/user-not-found':
      return 'Nincs fiók ezzel az e-mail címmel — regisztrálj.';
    case 'auth/wrong-password':
      return 'Hibás jelszó ehhez az e-mail címhez.';
    case 'auth/invalid-credential':
      return 'Hibás e-mail cím vagy jelszó.';
    case 'auth/email-already-in-use':
      return 'Ezzel az e-mail címmel már van fiók — lépj be inkább.';
    case 'auth/weak-password':
      return 'Túl gyenge jelszó (min. 6 karakter).';
    case 'auth/too-many-requests':
      return 'Túl sok próbálkozás — próbáld később.';
    case 'auth/requires-recent-login':
      return 'A módosításhoz jelentkezz ki, majd be újra, és próbáld rögtön.';
    default:
      return 'Hiba történt: ' + ((err && err.message) || c || 'ismeretlen');
  }
}
async function authLogin() {
  const email = (document.getElementById('auth-email').value || '').trim();
  const pass = document.getElementById('auth-password').value || '';
  const errEl = document.getElementById('auth-error');
  const btn = document.getElementById('auth-login-btn');
  if (errEl) errEl.style.display = 'none';
  if (!email || !pass) {
    authErr('Add meg az e-mail címet és a jelszót!');
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Belépés…';
  try {
    await LocalStore.login(email, pass);
  } catch (err) {
    authErr(hibaSzoveg(err));
  }
  btn.disabled = false;
  btn.textContent = 'Belépés';
}
function authLogout() {
  LocalStore.logout();
}
async function authRegister() {
  const email = (document.getElementById('auth-email').value || '').trim();
  const pass = document.getElementById('auth-password').value || '';
  const pass2 = (document.getElementById('auth-password2') || {}).value || '';
  const btn = document.getElementById('auth-login-btn');
  if (!email || !pass) {
    authErr('Add meg az e-mail címet és a jelszót!');
    return;
  }
  if (pass !== pass2) {
    authErr('A két jelszó nem egyezik.');
    return;
  }
  if (pass.length < 6) {
    authErr('A jelszó legalább 6 karakter legyen.');
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Fiók létrehozása…';
  try {
    await LocalStore.register(email, pass);
  } catch (err) {
    authErr(hibaSzoveg(err));
  }
  btn.disabled = false;
  setAuthMode(_authMode);
}
function authResetPassword() {
  const email = (document.getElementById('auth-email').value || '').trim();
  const infoEl = document.getElementById('auth-info');
  if (!email) {
    authErr('Add meg az e-mail címed a jelszó visszaállításához.');
    return;
  }
  LocalStore.resetPassword(email)
    .then(() => {
      if (infoEl) {
        infoEl.textContent = 'Elküldtük a jelszó-visszaállító linket az e-mail címedre.';
        infoEl.style.display = 'block';
      }
    })
    .catch((err) => authErr(hibaSzoveg(err)));
}
function authErr(msg) {
  const errEl = document.getElementById('auth-error');
  if (errEl) {
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }
}
let _authMode = 'login';
function setAuthMode(mode) {
  _authMode = mode === 'register' ? 'register' : 'login';
  const btn = document.getElementById('auth-login-btn');
  const pass = document.getElementById('auth-password');
  const sub = document.getElementById('auth-subtitle');
  const toggle = document.getElementById('auth-toggle');
  const confirmWrap = document.getElementById('auth-confirm-wrap');
  const errEl = document.getElementById('auth-error');
  const infoEl = document.getElementById('auth-info');
  if (errEl) errEl.style.display = 'none';
  if (infoEl) infoEl.style.display = 'none';
  if (_authMode === 'register') {
    if (btn) {
      btn.textContent = 'Fiók létrehozása';
      btn.setAttribute('onclick', 'authRegister()');
    }
    if (pass) pass.setAttribute('autocomplete', 'new-password');
    if (sub) sub.textContent = 'Hozz létre egy fiókot a foglalásaid kezeléséhez.';
    if (toggle) toggle.textContent = 'Van már fiókod? Lépj be';
    if (confirmWrap) confirmWrap.style.display = '';
  } else {
    if (btn) {
      btn.textContent = 'Belépés';
      btn.setAttribute('onclick', 'authLogin()');
    }
    if (pass) pass.setAttribute('autocomplete', 'current-password');
    if (sub) sub.textContent = 'Jelentkezz be az időpontfoglalásaid kezeléséhez.';
    if (toggle) toggle.textContent = 'Nincs még fiókod? Regisztrálj';
    if (confirmWrap) confirmWrap.style.display = 'none';
  }
}
const WEEKDAYS = [
  {
    id: 'mon',
    label: 'Hétfő'
  },
  {
    id: 'tue',
    label: 'Kedd'
  },
  {
    id: 'wed',
    label: 'Szerda'
  },
  {
    id: 'thu',
    label: 'Csütörtök'
  },
  {
    id: 'fri',
    label: 'Péntek'
  },
  {
    id: 'sat',
    label: 'Szombat'
  },
  {
    id: 'sun',
    label: 'Vasárnap'
  }
];
function defaultHours() {
  const h = {};
  WEEKDAYS.forEach((d) => {
    const weekend = d.id === 'sat' || d.id === 'sun';
    h[d.id] = {
      open: !weekend,
      windows: [
        {
          start: '09:00',
          end: '17:00'
        }
      ]
    };
  });
  return h;
}
function isHHMM(s) {
  return /^\d{2}:\d{2}$/.test(s);
}
function defaultState() {
  return {
    bookings: {},
    importedBookingIds: {},
    inboxKey: '',
    profile: {
      name: '',
      businessForm: '',
      taxForm: ''
    },
    sellerInfo: {
      name: '',
      address: '',
      tax: '',
      reg: '',
      bank: '',
      email: '',
      phone: '',
      vatRegistered: false,
      vatRate: 27
    },
    invoices: [],
    bizIncome: [],
    bizTaxRate: 15,
    bookingNumByYear: {},
    uiLang: 'hu',
    fxEurHuf: 0,
    bookingConfig: {
      services: [
        {
          name: 'Konzultáció',
          nameEn: 'Consultation',
          cat: '',
          catEn: '',
          note: '',
          noteEn: '',
          price: 0,
          priceEur: 0,
          priceMode: 'exact',
          durationMin: 30
        },
        {
          name: 'Teljes kezelés',
          nameEn: 'Full session',
          cat: '',
          catEn: '',
          note: '',
          noteEn: '',
          price: 0,
          priceEur: 0,
          priceMode: 'exact',
          durationMin: 60
        }
      ],
      hours: defaultHours(),
      slotMinutes: 30,
      horizonDays: 21,
      minNoticeHours: 2,
      showPrices: true,
      fields: {
        phone: true,
        message: true
      },
      formLang: 'both',
      eurHuf: 0
    }
  };
}
let state = defaultState();
let _stateLoaded = false;
function normalizeState() {
  if (!state || typeof state !== 'object') state = defaultState();
  if (!state.bookings || typeof state.bookings !== 'object') state.bookings = {};
  Object.values(state.bookings).forEach((b) => {
    if (b && (b.status === 'megerosit' || b.status === 'teljesult')) b.status = 'uj';
    if (b && b.status !== 'uj' && b.status !== 'lemondva') b.status = 'uj';
  });
  if (!state.importedBookingIds || typeof state.importedBookingIds !== 'object')
    state.importedBookingIds = {};
  if (!state.profile || typeof state.profile !== 'object')
    state.profile = {
      name: '',
      businessForm: '',
      taxForm: ''
    };
  if (state.profile.businessForm == null) state.profile.businessForm = '';
  if (state.profile.taxForm == null) state.profile.taxForm = '';
  if (typeof state.inboxKey !== 'string') state.inboxKey = '';
  if (!state.sellerInfo || typeof state.sellerInfo !== 'object')
    state.sellerInfo = {
      name: '',
      address: '',
      tax: '',
      reg: '',
      bank: '',
      email: '',
      phone: '',
      vatRegistered: false,
      vatRate: 27
    };
  ['name', 'address', 'tax', 'reg', 'bank', 'email', 'phone'].forEach((k) => {
    if (state.sellerInfo[k] == null) state.sellerInfo[k] = '';
  });
  if (typeof state.sellerInfo.vatRegistered !== 'boolean') state.sellerInfo.vatRegistered = false;
  if (state.sellerInfo.vatRate == null) state.sellerInfo.vatRate = 27;
  if (!Array.isArray(state.invoices)) state.invoices = [];
  if (!Array.isArray(state.bizIncome)) state.bizIncome = [];
  if (state.bizTaxRate == null) state.bizTaxRate = 15;
  if (!state.bookingNumByYear || typeof state.bookingNumByYear !== 'object')
    state.bookingNumByYear = {};
  if (state.uiLang !== 'en') state.uiLang = 'hu';
  if (typeof migrateBookingNumbers === 'function') migrateBookingNumbers();
  reconcileInvoiceIncomes();
  normalizeBookingConfig();
}
function normalizeBookingConfig() {
  if (!state.bookingConfig || typeof state.bookingConfig !== 'object')
    state.bookingConfig = defaultState().bookingConfig;
  const c = state.bookingConfig;
  if (!Array.isArray(c.services)) c.services = [];
  c.services = c.services.map((s) => ({
    name: (s && s.name) || '',
    nameEn: (s && s.nameEn) || '',
    cat: (s && s.cat) || '',
    catEn: (s && s.catEn) || '',
    note: (s && s.note) || '',
    noteEn: (s && s.noteEn) || '',
    price: Number(s && s.price) || 0,
    priceEur: Number(s && s.priceEur) || 0,
    priceMode: ['exact', 'from', 'free'].indexOf(s && s.priceMode) >= 0 ? s.priceMode : 'exact',
    durationMin: Math.max(5, Number(s && s.durationMin) || 30)
  }));
  if (!c.hours || typeof c.hours !== 'object') c.hours = defaultHours();
  WEEKDAYS.forEach((d) => {
    const h = c.hours[d.id] || {};
    let wins = Array.isArray(h.windows) ? h.windows : null;
    if (!wins && (h.start || h.end))
      wins = [
        {
          start: h.start,
          end: h.end
        }
      ];
    if (!wins || !wins.length)
      wins = [
        {
          start: '09:00',
          end: '17:00'
        }
      ];
    wins = wins
      .map((w) => ({
        start: isHHMM(w && w.start) ? w.start : '09:00',
        end: isHHMM(w && w.end) ? w.end : '17:00'
      }))
      .filter((w) => minsOf(w.end) > minsOf(w.start));
    if (!wins.length)
      wins = [
        {
          start: '09:00',
          end: '17:00'
        }
      ];
    c.hours[d.id] = {
      open: typeof h.open === 'boolean' ? h.open : d.id !== 'sat' && d.id !== 'sun',
      windows: wins
    };
  });
  c.slotMinutes = [15, 20, 30, 60].indexOf(Number(c.slotMinutes)) >= 0 ? Number(c.slotMinutes) : 30;
  c.horizonDays = Math.min(120, Math.max(1, Number(c.horizonDays) || 21));
  c.minNoticeHours = Math.min(168, Math.max(0, Number(c.minNoticeHours) || 0));
  if (typeof c.showPrices !== 'boolean') c.showPrices = true;
  if (!c.fields || typeof c.fields !== 'object') c.fields = {};
  ['phone', 'message'].forEach((k) => {
    if (typeof c.fields[k] !== 'boolean') c.fields[k] = true;
  });
  c.formLang = 'both';
}
function save() {
  if (!_stateLoaded) return;
  if (!currentUid) return;
  try {
    LocalStore.saveVault(state);
    flashSaved();
  } catch (e) {
    console.error('[Slotli] mentési hiba:', e);
    setSaveStatus('Mentési hiba', 'sync-warn');
  }
}
function setSaveStatus(text, cls) {
  const el = document.getElementById('sync-status');
  if (!el) return;
  el.textContent = text;
  el.className = 'sync-pill' + (cls ? ' ' + cls : '');
}
let _savedTimer = null;
function flashSaved() {
  setSaveStatus('Mentve', 'sync-ok');
  if (_savedTimer) clearTimeout(_savedTimer);
  _savedTimer = setTimeout(() => setSaveStatus('Felhő', ''), 1400);
}
function load() {
  return new Promise((resolve) => {
    if (!currentUid) {
      _stateLoaded = false;
      normalizeState();
      resolve(false);
      return;
    }
    const finish = (persist) => {
      _stateLoaded = true;
      normalizeState();
      ensureInboxKey();
      if (persist) {
        try {
          LocalStore.saveVault(state);
        } catch (e) {}
      }
      publishBookingConfig();
      fetchEurHuf();
      resolve(true);
    };
    LocalStore.loadVault()
      .then((d) => {
        state = d && typeof d === 'object' ? d : defaultState();
        finish(false);
      })
      .catch(() => {
        state = defaultState();
        finish(false);
      });
  });
}
function showLoadError(err) {
  const app = document.getElementById('app-root');
  const gate = document.getElementById('auth-gate');
  if (app) app.style.display = 'none';
  if (gate) gate.style.display = 'none';
  let box = document.getElementById('load-error-gate');
  if (!box) {
    box = document.createElement('div');
    box.id = 'load-error-gate';
    box.style.cssText =
      'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;background:var(--bg,#111);color:var(--text,#eee);font-family:inherit';
    box.innerHTML =
      '<div style="max-width:440px;text-align:center;background:var(--surface2,#1b1b1b);border:1px solid var(--border,#333);border-radius:14px;padding:28px 24px">' +
      '<div style="font-size:34px;margin-bottom:12px">\u26A0\uFE0F</div>' +
      '<h2 style="margin:0 0 8px;font-size:18px">Nem sikerült betölteni az adatokat</h2>' +
      '<p style="margin:0 0 18px;font-size:13px;color:var(--muted,#999);line-height:1.5">A felhőből most nem tudtuk beolvasni a fiókod adatait. A meglévő adataid biztonságban vannak — a mentés le van tiltva, amíg a betöltés nem sikerül.</p>' +
      '<button type="button" onclick="location.reload()" style="cursor:pointer;border:none;border-radius:8px;padding:11px 20px;font-size:14px;font-weight:600;background:var(--primary,#2f63e6);color:#fff">Újratöltés</button>' +
      '<div class="le-code" style="margin-top:14px;font-size:11px;color:var(--muted,#777);word-break:break-word"></div>' +
      '</div>';
    document.body.appendChild(box);
  }
  box.style.display = 'flex';
  const codeEl = box.querySelector('.le-code');
  if (codeEl) codeEl.textContent = err ? err.code || err.message || '' : '';
}
function generateInboxKey() {
  const bytes = new Uint8Array(18);
  (window.crypto || crypto).getRandomValues(bytes);
  return (
    'sk_' +
    Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  );
}
function ensureInboxKey() {
  if (state.inboxKey) return;
  state.inboxKey = generateInboxKey();
  try {
    LocalStore.saveVault(state);
  } catch (e) {
    console.warn('[Slotli] kulcs mentése:', e);
  }
}
function eurHufRate() {
  return state.fxEurHuf && state.fxEurHuf > 0 ? state.fxEurHuf : FX_FALLBACK_EUR_HUF;
}
function fetchEurHuf() {
  try {
    fetch('https://api.frankfurter.app/latest?from=EUR&to=HUF')
      .then((r) => r.json())
      .then((d) => {
        const rate = d && d.rates && d.rates.HUF;
        if (rate && rate > 0) {
          state.fxEurHuf = rate;
          if (state.bookingConfig) state.bookingConfig.eurHuf = rate;
          publishBookingConfig();
        }
      })
      .catch(() => {});
  } catch (e) {}
}
function publishBookingConfig() {
  if (!currentUid) return;
  const c = state.bookingConfig || {};
  const pub = {
    services: (c.services || []).filter((s) => s.name),
    hours: c.hours || defaultHours(),
    slotMinutes: c.slotMinutes || 30,
    horizonDays: c.horizonDays || 21,
    minNoticeHours: c.minNoticeHours || 0,
    showPrices: !!c.showPrices,
    fields: c.fields || {
      phone: true,
      message: true
    },
    formLang: 'both',
    eurHuf: eurHufRate(),
    notify: {
      ownerEmail: registeredEmail(),
      bizName: String(
        (state.profile && state.profile.name) || (state.sellerInfo && state.sellerInfo.name) || ''
      )
    },
    updatedAt: Date.now()
  };
  try {
    LocalStore.kvSet('config_' + currentUid, pub);
  } catch (e) {
    console.warn('[Slotli] config közzététel hiba:', e);
  }
}
function registeredEmail() {
  try {
    return (LocalStore.currentUser && LocalStore.currentUser.email) || '';
  } catch (e) {
    return '';
  }
}
const now = () => new Date().toISOString().slice(0, 10);
function pad2(n) {
  return String(n).padStart(2, '0');
}
function minsOf(hhmm) {
  const p = String(hhmm || '').split(':');
  return (Number(p[0]) || 0) * 60 + (Number(p[1]) || 0);
}
function hhmmOf(mins) {
  return pad2(Math.floor(mins / 60)) + ':' + pad2(mins % 60);
}
function cellKey(date, mins) {
  return date + '_' + pad2(Math.floor(mins / 60)) + pad2(mins % 60);
}
function cellsForBooking(date, timeHHMM, durationMin, slotMinutes) {
  const start = minsOf(timeHHMM),
    sm = slotMinutes || 30;
  const cells = [];
  for (let m = start; m < start + durationMin; m += sm) cells.push(cellKey(date, m));
  return cells;
}
function fmtDateHu(d) {
  try {
    const dt = new Date(d + 'T00:00:00');
    return locDate(dt, {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });
  } catch (e) {
    return d;
  }
}
function fmtCur(amount, cur) {
  const n = Math.round(Number(amount) || 0);
  return cur === 'EUR' ? '€' + n.toLocaleString('hu-HU') : n.toLocaleString('hu-HU') + ' Ft';
}
function fmtCurShort(amount) {
  const n = Math.round(Number(amount) || 0);
  const kSuffix = isEn() ? 'k' : 'e';
  let body;
  if (n >= 1000000) {
    body =
      (n / 1000000).toLocaleString(isEn() ? 'en-US' : 'hu-HU', {
        maximumFractionDigits: 1
      }) + 'M';
  } else if (n >= 10000) {
    body = Math.round(n / 1000).toLocaleString(isEn() ? 'en-US' : 'hu-HU') + kSuffix;
  } else {
    body = n.toLocaleString(isEn() ? 'en-US' : 'hu-HU');
  }
  return body + ' Ft';
}
function bkCfg() {
  return state.bookingConfig;
}
function renderServiceRows() {
  const wrap = document.getElementById('bk-services');
  if (!wrap) return;
  const svcs = bkCfg().services;
  const opt = (v, cur, label) =>
    `<option value="${v}"${cur === v ? ' selected' : ''}>${label}</option>`;
  wrap.innerHTML = svcs
    .map(
      (s, i) => `
    <div class="sl-srv-item">
      <div class="sl-srv-row">
        <input placeholder="Név (magyar)" value="${escHtml(s.name)}" oninput="setSvc(${i},'name',this.value)">
        <input placeholder="Név (angol, opc.)" value="${escHtml(s.nameEn)}" oninput="setSvc(${i},'nameEn',this.value)">
        <input type="number" min="5" step="5" placeholder="perc" value="${s.durationMin}" oninput="setSvc(${i},'durationMin',this.value)" title="Időtartam (perc)">
        <input type="text" inputmode="numeric" placeholder="Ft" value="${s.price ? Math.round(s.price).toLocaleString('hu-HU') : ''}" oninput="this.value=this.value.replace(/[^0-9 ]/g,'')" onblur="setSvc(${i},'price',parseInt(this.value.replace(/\\D/g,''))||0)" title="Ár (Ft)">
        <input type="text" inputmode="numeric" placeholder="€" value="${s.priceEur ? Math.round(s.priceEur).toLocaleString('hu-HU') : ''}" oninput="this.value=this.value.replace(/[^0-9 ]/g,'')" onblur="setSvc(${i},'priceEur',parseInt(this.value.replace(/\\D/g,''))||0)" title="Ár (€, opcionális)">
        <button class="sl-row-x" title="Törlés" onclick="removeSvc(${i})">×</button>
      </div>
      <div class="sl-srv-row2">
        <select onchange="setSvc(${i},'priceMode',this.value)" title="Ár megjelenítése az árlistán">
          ${opt('exact', s.priceMode || 'exact', 'Pontos ár')}
          ${opt('from', s.priceMode || 'exact', '„…-tól” ár')}
          ${opt('free', s.priceMode || 'exact', 'Ingyenes')}
        </select>
      </div>
    </div>`
    )
    .join('');
}
function setSvc(i, field, val) {
  const s = bkCfg().services[i];
  if (!s) return;
  if (field === 'durationMin') s.durationMin = Math.max(5, parseInt(val) || 30);
  else if (field === 'price' || field === 'priceEur') s[field] = parseInt(val) || 0;
  else s[field] = val;
  updateBookerOutputs();
}
function addService() {
  bkCfg().services.push({
    name: '',
    nameEn: '',
    cat: '',
    catEn: '',
    note: '',
    noteEn: '',
    price: 0,
    priceEur: 0,
    priceMode: 'exact',
    durationMin: 30
  });
  renderServiceRows();
  updateBookerOutputs();
}
function removeSvc(i) {
  bkCfg().services.splice(i, 1);
  renderServiceRows();
  updateBookerOutputs();
}
function renderHoursRows() {
  const wrap = document.getElementById('bk-hours');
  if (!wrap) return;
  const hours = bkCfg().hours;
  wrap.innerHTML = WEEKDAYS.map((d) => {
    const h = hours[d.id];
    const dis = h.open ? '' : 'disabled';
    const windows = (h.windows || [])
      .map(
        (w, wi) => `
      <div class="sl-hwin">
        <input type="time" value="${w.start}" ${dis} onchange="setWindow('${d.id}',${wi},'start',this.value)">
        <span class="sl-hdash">–</span>
        <input type="time" value="${w.end}" ${dis} onchange="setWindow('${d.id}',${wi},'end',this.value)">
        ${h.open && h.windows.length > 1 ? `<button class="sl-row-x" title="Idősáv törlése" onclick="removeWindow('${d.id}',${wi})">×</button>` : '<span style="width:26px"></span>'}
      </div>`
      )
      .join('');
    return `<div class="sl-hours-day">
      <label class="sl-hday-head">
        <input type="checkbox" ${h.open ? 'checked' : ''} onchange="setDayOpen('${d.id}',this.checked)">
        <span>${d.label}</span>
        ${h.open ? '' : '<span class="sl-hclosed">zárva</span>'}
      </label>
      <div class="sl-hwins">
        ${h.open ? windows + `<button class="btn btn-secondary btn-sm sl-addwin" onclick="addWindow('${d.id}')">+ idősáv</button>` : ''}
      </div>
    </div>`;
  }).join('');
}
function setDayOpen(day, open) {
  const h = bkCfg().hours[day];
  if (!h) return;
  h.open = !!open;
  if (h.open && (!h.windows || !h.windows.length))
    h.windows = [
      {
        start: '09:00',
        end: '17:00'
      }
    ];
  renderHoursRows();
  updateBookerOutputs();
}
function setWindow(day, idx, field, val) {
  const h = bkCfg().hours[day];
  if (!h || !h.windows || !h.windows[idx]) return;
  h.windows[idx][field] = val;
  updateBookerOutputs();
}
function addWindow(day) {
  const h = bkCfg().hours[day];
  if (!h) return;
  if (!Array.isArray(h.windows)) h.windows = [];
  const last = h.windows[h.windows.length - 1];
  let start = '14:00',
    end = '18:00';
  if (last) {
    const s = Math.min(23 * 60, minsOf(last.end) + 60);
    start = hhmmOf(s);
    end = hhmmOf(Math.min(24 * 60 - 1, s + 120));
  }
  h.windows.push({
    start,
    end
  });
  renderHoursRows();
  updateBookerOutputs();
}
function removeWindow(day, idx) {
  const h = bkCfg().hours[day];
  if (!h || !h.windows) return;
  h.windows.splice(idx, 1);
  if (!h.windows.length)
    h.windows = [
      {
        start: '09:00',
        end: '17:00'
      }
    ];
  renderHoursRows();
  updateBookerOutputs();
}
function renderBooker() {
  normalizeBookingConfig();
  const c = bkCfg();
  renderServiceRows();
  renderHoursRows();
  const sm = document.getElementById('bk-slotmin');
  if (sm) sm.value = String(c.slotMinutes);
  const hz = document.getElementById('bk-horizon');
  if (hz) hz.value = c.horizonDays;
  const mn = document.getElementById('bk-minnotice');
  if (mn) mn.value = c.minNoticeHours;
  const sp = document.getElementById('bk-showprices');
  if (sp) sp.checked = !!c.showPrices;
  const fp = document.getElementById('bk-field-phone');
  if (fp) fp.checked = !!c.fields.phone;
  const fm = document.getElementById('bk-field-message');
  if (fm) fm.checked = !!c.fields.message;
  const uid = document.getElementById('bk-uid');
  if (uid) uid.value = currentUid || '';
  updateBookerOutputs();
}
function readBookerControls() {
  const c = bkCfg();
  const sm = document.getElementById('bk-slotmin');
  if (sm) c.slotMinutes = Number(sm.value) || 30;
  const hz = document.getElementById('bk-horizon');
  if (hz) c.horizonDays = Math.min(120, Math.max(1, parseInt(hz.value) || 21));
  const mn = document.getElementById('bk-minnotice');
  if (mn) c.minNoticeHours = Math.min(168, Math.max(0, parseInt(mn.value) || 0));
  const sp = document.getElementById('bk-showprices');
  if (sp) c.showPrices = sp.checked;
  const fp = document.getElementById('bk-field-phone');
  if (fp) c.fields.phone = fp.checked;
  const fm = document.getElementById('bk-field-message');
  if (fm) c.fields.message = fm.checked;
}
function updateBookerOutputs() {
  readBookerControls();
  const prev = document.getElementById('bk-preview');
  if (prev) prev.innerHTML = bookerPreviewHtml();
  const snip = document.getElementById('bk-snippet');
  if (snip) snip.value = bookerSnippet();
  const uid = document.getElementById('bk-uid');
  if (uid && !uid.value) uid.value = currentUid || '';
}
function copySnippetFrom(id, msg) {
  const ta = document.getElementById(id);
  if (!ta) return;
  ta.select();
  try {
    document.execCommand('copy');
  } catch (e) {}
  try {
    navigator.clipboard && navigator.clipboard.writeText(ta.value);
  } catch (e) {}
  const note = document.getElementById('bk-save-note');
  if (note) {
    note.textContent = msg || '✓ Vágólapra másolva';
    setTimeout(() => {
      note.textContent = '';
    }, 2000);
  }
}
function saveBookingConfig() {
  readBookerControls();
  normalizeBookingConfig();
  save();
  publishBookingConfig();
  const note = document.getElementById('bk-save-note');
  if (note) {
    note.textContent = '✓ Mentve és közzétéve';
    setTimeout(() => {
      note.textContent = '';
    }, 2200);
  }
  updateBookerOutputs();
}
function copyBookerSnippet() {
  const ta = document.getElementById('bk-snippet');
  if (!ta) return;
  ta.select();
  try {
    document.execCommand('copy');
  } catch (e) {}
  try {
    navigator.clipboard && navigator.clipboard.writeText(ta.value);
  } catch (e) {}
  const note = document.getElementById('bk-save-note');
  if (note) {
    note.textContent = '✓ Vágólapra másolva';
    setTimeout(() => {
      note.textContent = '';
    }, 2000);
  }
}
let _bpSel = {
  svc: null,
  date: '',
  time: ''
};
function bookerPreviewHtml() {
  const c = bkCfg();
  const svcs = (c.services || []).filter((s) => s.name);
  _bpSel = {
    svc: null,
    date: '',
    time: ''
  };
  const hint =
    '<div class="bp-hint">Válassz szolgáltatást és napot az elérhető időpontokhoz.</div>';
  let h = '';
  h += '<input class="fp-inp" placeholder="Név *">';
  h += '<input class="fp-inp" type="email" placeholder="E-mail *">';
  if (c.fields.phone) h += '<input class="fp-inp" placeholder="Telefon">';
  h +=
    '<select class="fp-inp" onchange="bpSetService(this.value)"><option value="">Válassz szolgáltatást…</option>' +
    svcs
      .map((s, i) => {
        const label =
          s.name +
          (c.showPrices && s.price ? ' — ' + fmtCur(s.price, 'HUF') : '') +
          ' · ' +
          s.durationMin +
          ' ' +
          L('perc', 'min');
        return '<option value="' + i + '">' + escHtml(label) + '</option>';
      })
      .join('') +
    '</select>';
  h += '<input class="fp-inp" type="date" min="' + now() + '" onchange="bpSetDate(this.value)">';
  h += '<div id="bp-slots">' + hint + '</div>';
  if (c.fields.message) h += '<textarea class="fp-inp" placeholder="Üzenet"></textarea>';
  h += '<button type="button" class="fp-btn" onclick="bpSubmitNote()">Időpont foglalása</button>';
  h += '<div id="bp-note" class="bp-hint" style="text-align:center;min-height:14px"></div>';
  return h;
}
function _bpDayId(dateStr) {
  const dt = new Date(dateStr + 'T00:00:00');
  if (isNaN(dt)) return 'mon';
  return WEEKDAYS[(dt.getDay() + 6) % 7].id;
}
function bpSetService(val) {
  _bpSel.svc = val === '' ? null : Number(val);
  _bpSel.time = '';
  bpLoadSlots();
}
function bpSetDate(val) {
  _bpSel.date = val || '';
  _bpSel.time = '';
  bpLoadSlots();
}
function bpSelectSlot(t) {
  _bpSel.time = t;
  bpLoadSlots();
}
function bpLoadSlots() {
  const box = document.getElementById('bp-slots');
  if (!box) return;
  const c = bkCfg();
  const hintHtml = (msg) => '<div class="bp-hint">' + msg + '</div>';
  if (_bpSel.svc == null) {
    box.innerHTML = hintHtml('Válassz szolgáltatást…');
    return;
  }
  if (!_bpSel.date) {
    box.innerHTML = hintHtml('Válassz napot.');
    return;
  }
  const svcs = (c.services || []).filter((s) => s && s.name);
  const svc = svcs[_bpSel.svc];
  if (!svc) {
    box.innerHTML = hintHtml('Válassz szolgáltatást…');
    return;
  }
  const hrs = (c.hours || {})[_bpDayId(_bpSel.date)];
  if (!hrs || !hrs.open) {
    box.innerHTML = hintHtml('Ezen a napon zárva — nincs szabad időpont.');
    return;
  }
  const wins = hrs.windows && hrs.windows.length ? hrs.windows : [];
  const sm = Number(c.slotMinutes) || 30,
    dur = Number(svc.durationMin) || 30;
  const notice = (Number(c.minNoticeHours) || 0) * 60;
  const todayS = now();
  let nowM = 0;
  if (_bpSel.date === todayS) {
    const n = new Date();
    nowM = n.getHours() * 60 + n.getMinutes();
  }
  let busy = {};
  try {
    const all = LocalStore.kvGet('busy_' + currentUid, {}) || {};
    for (const k in all) {
      if (all[k] && all[k].date === _bpSel.date) busy[k] = true;
    }
  } catch (e) {}
  let chips = '';
  wins.forEach((w) => {
    const open = minsOf(w.start),
      close = minsOf(w.end);
    for (let m = open; m + dur <= close; m += sm) {
      let free = true;
      for (let k = m; k < m + dur; k += sm) {
        if (busy[cellKey(_bpSel.date, k)]) free = false;
      }
      if (_bpSel.date === todayS && m < nowM + notice) free = false;
      const t = hhmmOf(m);
      chips +=
        '<button type="button" class="sl-slotchip' +
        (_bpSel.time === t ? ' sel' : '') +
        '"' +
        (free ? '' : ' disabled') +
        ' onclick="bpSelectSlot(\'' +
        t +
        '\')">' +
        t +
        '</button>';
    }
  });
  box.innerHTML = chips
    ? '<div class="bp-hint">Válassz időpontot:</div><div class="sl-slotgrid">' + chips + '</div>'
    : hintHtml('Ezen a napon nincs szabad időpont.');
}
function bpSubmitNote() {
  const n = document.getElementById('bp-note');
  if (!n) return;
  let msg;
  if (_bpSel.svc == null) msg = 'Válassz szolgáltatást!';
  else if (!_bpSel.date) msg = 'Válassz napot!';
  else if (!_bpSel.time) msg = 'Válassz időpontot!';
  else msg = 'Ez csak előnézet — a valódi foglaló a weboldaladon rögzíti a foglalást.';
  n.textContent = msg;
  setTimeout(() => {
    if (n) n.textContent = '';
  }, 2800);
}
const EMAILJS_CFG = {
  publicKey: 'eTf1OffvvcrBwZcAm',
  serviceId: 'service_598rmjv',
  templateCustomer: 'template_6tb81uj',
  templateOwner: 'template_net34ym'
};
function bookerSnippet() {
  const uid = currentUid || 'OWNER_UID';
  const key = (state && state.inboxKey) || '';
  const days = JSON.stringify(WEEKDAYS.map((d) => d.id));
  return `<!-- Slotli foglaló-widget (a weboldal nyelvét követi) — elég EGYSZER beilleszteni -->
<!-- A foglalás a Slotli felhő-adatbázisába (Firestore) kerül, és azonnal megjelenik a Slotli-fiókodban. -->
<div id="slotli-mount"></div>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js"><\/script>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js"><\/script>
<script>
(function () {
  var OWNER_UID = "${uid}";
  var KEY = "${key}";
  var FB = { apiKey: "AIzaSyADv3V5fDtNnHOmG4jHjMehO6kHC_JIr7Q", authDomain: "slotli-202608.firebaseapp.com", projectId: "slotli-202608", storageBucket: "slotli-202608.firebasestorage.app", messagingSenderId: "528948546743", appId: "1:528948546743:web:7ab4296ec29ac92648d132" };
  try { if (!firebase.apps.length) firebase.initializeApp(FB); } catch (e) { console.error(e); }
  var fs = firebase.firestore();
  var db = {
    slots: function(){ return fs.collection("busy").doc(OWNER_UID).collection("slots"); },
    busyForDate: function(d){
      return this.slots().where("date","==",d).get()
        .then(function(snap){ var out={}; snap.forEach(function(doc){ out[doc.id]=true; }); return out; })
        .catch(function(){ return {}; });
    },
    reserve: function(cells,date){
      var col=this.slots(), batch=fs.batch();
      cells.forEach(function(c){ batch.set(col.doc(c), { date:date, createdAt:Date.now() }); });
      return batch.commit().then(function(){ return true; }).catch(function(){ return false; });
    },
    addInbox: function(data){
      return fs.collection("inbox").doc(OWNER_UID).collection("items").add(data);
    },
    getConfig: function(){
      return fs.collection("booking_configs").doc(OWNER_UID).get()
        .then(function(d){ return d.exists ? d.data() : {}; })
        .catch(function(){ return {}; });
    }
  };
  var DAYIDS = ${days}; // 0=hétfő ... 6=vasárnap sorrend
  var mount = document.getElementById("slotli-mount");
  var CFG = {}, LANG = "hu", SEL = { svc:null, date:"", time:"" }, BUSY = {};
  var T = {
    hu: { name:"Név", email:"E-mail", phone:"Telefon", message:"Üzenet", choose:"Válassz szolgáltatást…",
          pickdate:"Válassz napot", picktime:"Válassz időpontot", noslot:"Ezen a napon nincs szabad időpont.",
          submit:"Időpont foglalása", thanks:"Köszönjük! A foglalásod rögzítettük:", taken:"Ezt a sávot épp lefoglalták — válassz másikat.",
          err:"Hiba történt a foglaláskor, próbáld újra.", needsvc:"Válassz szolgáltatást!", needslot:"Válassz időpontot!",
          mins:"perc" },
    en: { name:"Name", email:"Email", phone:"Phone", message:"Message", choose:"Choose a service…",
          pickdate:"Pick a day", picktime:"Pick a time", noslot:"No free slots on this day.",
          submit:"Book appointment", thanks:"Thank you! Your booking is confirmed for:", taken:"That slot was just taken — please pick another.",
          err:"Something went wrong, please try again.", needsvc:"Choose a service!", needslot:"Choose a time!",
          mins:"min" }
  };
  var EMAILJS = { publicKey: "${EMAILJS_CFG.publicKey}", serviceId: "${EMAILJS_CFG.serviceId}", templateCustomer: "${EMAILJS_CFG.templateCustomer}", templateOwner: "${EMAILJS_CFG.templateOwner}" };
  var M = {
    hu: { cSub:"Foglalás visszaigazolás — ", cHi:"Köszönjük a foglalásod!", cIn:"Rögzítettük az időpontod. Az összesítés:", cTag:"Foglalás visszaigazolás",
          oSub:"Új foglalás — ", oHi:"Új foglalás érkezett", oIn:"Az alábbi időpontfoglalás futott be a weboldalad foglalóján keresztül:", oTag:"Új foglalás",
          svc:"Szolgáltatás", when:"Időpont", dur:"Időtartam", price:"Ár", nm:"Név", em:"E-mail", ph:"Telefon", msg:"Üzenet", min:"perc" },
    en: { cSub:"Booking confirmation — ", cHi:"Thank you for your booking!", cIn:"Your appointment is booked. Here's the summary:", cTag:"Booking confirmation",
          oSub:"New booking — ", oHi:"New booking received", oIn:"The following appointment came in through your website booker:", oTag:"New booking",
          svc:"Service", when:"Time", dur:"Duration", price:"Price", nm:"Name", em:"Email", ph:"Phone", msg:"Message", min:"min" }
  };
  function emailReady(){ var e=EMAILJS; return !!(e.publicKey&&e.serviceId&&e.templateCustomer&&e.templateOwner)&&[e.publicKey,e.serviceId,e.templateCustomer,e.templateOwner].join("|").indexOf("EMAILJS_")<0; }
  function sendMail(templateId,params){ try{ fetch("https://api.emailjs.com/api/v1.0/email/send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service_id:EMAILJS.serviceId,template_id:templateId,user_id:EMAILJS.publicKey,template_params:params})}).catch(function(){}); }catch(e){} }
  function initialOf(s){ s=(s||"").trim(); return s?s.charAt(0).toUpperCase():"•"; }
  function erow(label,val){ if(val==null||String(val)==="") return ""; return '<tr><td style="padding:10px 0;border-bottom:1px solid #e0efeb;font-size:12px;color:#5c7b75;vertical-align:top;white-space:nowrap">'+esc(label)+'</td><td style="padding:10px 0 10px 18px;border-bottom:1px solid #e0efeb;font-size:14px;color:#10201d;font-weight:600;vertical-align:top;text-align:right">'+esc(val)+'</td></tr>'; }
  function erowMail(label,val){ if(val==null||String(val)==="") return ""; return '<tr><td style="padding:10px 0;border-bottom:1px solid #e0efeb;font-size:12px;color:#5c7b75;vertical-align:top;white-space:nowrap">'+esc(label)+'</td><td style="padding:10px 0 10px 18px;border-bottom:1px solid #e0efeb;font-size:14px;vertical-align:top;text-align:right"><a href="mailto:'+esc(val)+'" style="color:#0c8579;font-weight:700;text-decoration:none">'+esc(val)+'</a></td></tr>'; }
  function erowPhone(label,val){ if(val==null||String(val)==="") return ""; var tel=String(val).replace(/[^\d+]/g,""); return '<tr><td style="padding:10px 0;border-bottom:1px solid #e0efeb;font-size:12px;color:#5c7b75;vertical-align:top;white-space:nowrap">'+esc(label)+'</td><td style="padding:8px 0 8px 18px;border-bottom:1px solid #e0efeb;vertical-align:middle;text-align:right"><a href="tel:'+esc(tel)+'" style="display:inline-block;background:#e6f4f1;color:#0c8579;font-weight:700;font-size:13.5px;padding:7px 14px;border-radius:999px;text-decoration:none;white-space:nowrap">&#128222; '+esc(val)+'</a></td></tr>'; }
  function sendConfirmations(data){
    if(!emailReady()) return;
    var notify=CFG.notify||{}, owner=notify.ownerEmail||"", biz=notify.bizName||"";
    var m=M[LANG]||M.hu;
    var svc=data.serviceLoc||data.service||"", when=fmtWhen(data), priceTxt=data.price?ft(data.price):"";
    var durTxt=data.durationMin?(data.durationMin+" "+m.min):"";
    var rows=erow(m.nm,data.name)+erowMail(m.em,data.email)+erowPhone(m.ph,data.phone)+erow(m.svc,svc)+erow(m.when,when)+erow(m.dur,durTxt)+erow(m.price,priceTxt)+erow(m.msg,data.message);
    if(data.email){
      sendMail(EMAILJS.templateCustomer,{to_email:data.email,to_name:data.name||"",from_name:biz||"Slotli",brand_initial:initialOf(biz||"Slotli"),tagline:m.cTag,reply_to:owner||"",subject:m.cSub+svc,heading:m.cHi,intro:m.cIn,details:rows});
    }
    if(owner){
      sendMail(EMAILJS.templateOwner,{to_email:owner,to_name:biz||"",from_name:"Slotli",brand_initial:"S",tagline:m.oTag,reply_to:data.email||"",subject:m.oSub+svc,heading:m.oHi,intro:m.oIn,details:rows,action_tel:data.phone?String(data.phone).replace(/[^\d+]/g,""):"",action_mail:data.email||""});
    }
  }
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function pad(n){return (n<10?"0":"")+n;}
  function minsOf(t){var p=String(t||"").split(":");return (+p[0]||0)*60+(+p[1]||0);}
  function hhmm(m){return pad(Math.floor(m/60))+":"+pad(m%60);}
  function ckey(d,m){return d+"_"+pad(Math.floor(m/60))+pad(m%60);}
  function ft(n){n=Math.round(+n||0);return LANG==="en"?"€"+n.toLocaleString("hu-HU"):n.toLocaleString("hu-HU")+" Ft";}
  function svcName(s){return (LANG==="en"&&s.nameEn)?s.nameEn:s.name;}
  function svcPrice(s){ if(LANG==="en"){var e=+s.priceEur||0; if(e>0)return e; var r=+CFG.eurHuf||0; return r>0?Math.round((+s.price||0)/r):0;} return +s.price||0; }
  function pageLang(){var l=(document.documentElement.getAttribute("lang")||"").toLowerCase();if(l.indexOf("en")===0)return "en";if(l.indexOf("hu")===0)return "hu";return null;}
  function pickLang(){ if(window.SLOTLI_LANG==="hu"||window.SLOTLI_LANG==="en")return window.SLOTLI_LANG; return pageLang()||"hu"; }
  function dateStr(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
  function dayId(dateS){var dt=new Date(dateS+"T00:00:00");var js=dt.getDay();return DAYIDS[(js+6)%7];} // JS 0=vas → hétfő-alap

  function render(){
    var t=T[LANG], f=CFG.fields||{}, svcs=(CFG.services||[]).filter(function(s){return s&&s.name;});
    var h='<div class="slotli-form">';
    h+='<input id="sl-name" placeholder="'+esc(t.name)+' *">';
    h+='<input id="sl-email" type="email" placeholder="'+esc(t.email)+' *">';
    if(f.phone) h+='<input id="sl-phone" placeholder="'+esc(t.phone)+'">';
    h+='<select id="sl-svc"><option value="">'+esc(t.choose)+'</option>';
    svcs.forEach(function(s,i){
      var pr=svcPrice(s), label=svcName(s)+(CFG.showPrices&&pr?" — "+ft(pr):"")+" · "+s.durationMin+" "+t.mins;
      h+='<option value="'+i+'">'+esc(label)+'</option>';
    });
    h+='</select>';
    h+='<input id="sl-date" type="date">';
    h+='<div id="sl-slots" class="sl-w-slots"><div class="sl-w-hint">'+esc(t.pickdate)+'</div></div>';
    if(f.message) h+='<textarea id="sl-msg" placeholder="'+esc(t.message)+'"></textarea>';
    h+='<input id="sl-hp" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px">';
    h+='<button id="sl-submit" type="button">'+esc(t.submit)+'</button>';
    h+='<div id="sl-note" class="sl-w-note"></div></div>';
    mount.innerHTML=h;
    injectStyle();
    var dEl=document.getElementById("sl-date");
    var today=new Date(); var min=new Date(today.getTime());
    var max=new Date(today.getTime()+(CFG.horizonDays||21)*86400000);
    dEl.min=dateStr(min); dEl.max=dateStr(max);
    document.getElementById("sl-svc").addEventListener("change", function(){ SEL.svc=this.value===""?null:+this.value; SEL.time=""; loadSlots(); });
    dEl.addEventListener("change", function(){ SEL.date=this.value; SEL.time=""; loadSlots(); });
    document.getElementById("sl-submit").addEventListener("click", submit);
  }

  function svcObj(){ var s=(CFG.services||[]).filter(function(x){return x&&x.name;}); return (SEL.svc!=null)?s[SEL.svc]:null; }

  function loadSlots(){
    var box=document.getElementById("sl-slots"), t=T[LANG];
    if(SEL.svc==null){ box.innerHTML='<div class="sl-w-hint">'+esc(t.choose)+'</div>'; return; }
    if(!SEL.date){ box.innerHTML='<div class="sl-w-hint">'+esc(t.pickdate)+'</div>'; return; }
    box.innerHTML='<div class="sl-w-hint">…</div>';
    var d=SEL.date;
    db.busyForDate(d).then(function(busy){ BUSY=busy||{}; if(SEL.date===d) renderSlots(); })
      .catch(function(){ BUSY={}; if(SEL.date===d) renderSlots(); });
  }

  function renderSlots(){
    var box=document.getElementById("sl-slots"), t=T[LANG];
    var svc=svcObj(); if(!svc){ box.innerHTML='<div class="sl-w-hint">'+esc(t.choose)+'</div>'; return; }
    var hrs=(CFG.hours||{})[dayId(SEL.date)];
    if(!hrs||!hrs.open){ box.innerHTML='<div class="sl-w-hint">'+esc(t.noslot)+'</div>'; return; }
    var wins=hrs.windows; if(!wins||!wins.length){ wins=(hrs.start&&hrs.end)?[{start:hrs.start,end:hrs.end}]:[]; } // régi alak is
    var sm=+CFG.slotMinutes||30, dur=+svc.durationMin||30;
    var notice=(+CFG.minNoticeHours||0)*60;
    var nowM=0, todayS=dateStr(new Date());
    if(SEL.date===todayS){ var n=new Date(); nowM=n.getHours()*60+n.getMinutes(); }
    var chips="";
    for(var wI=0; wI<wins.length; wI++){
      var open=minsOf(wins[wI].start), close=minsOf(wins[wI].end);
      for(var m=open; m+dur<=close; m+=sm){
        var free=true;
        for(var k=m;k<m+dur;k+=sm){ if(BUSY[ckey(SEL.date,k)]) free=false; }
        if(SEL.date===todayS && m < nowM+notice) free=false; // előjegyzési ablak
        chips+='<button type="button" class="sl-w-chip'+(SEL.time===hhmm(m)?" sel":"")+'" '+(free?"":"disabled")+' data-t="'+hhmm(m)+'">'+hhmm(m)+'</button>';
      }
    }
    box.innerHTML = chips ? ('<div class="sl-w-hint">'+esc(t.picktime)+'</div><div class="sl-w-grid">'+chips+'</div>') : ('<div class="sl-w-hint">'+esc(t.noslot)+'</div>');
    var btns=box.querySelectorAll(".sl-w-chip");
    for(var i=0;i<btns.length;i++){ btns[i].addEventListener("click", function(){ if(this.disabled)return; SEL.time=this.getAttribute("data-t"); renderSlots(); }); }
  }

  function note(msg,ok){ var n=document.getElementById("sl-note"); if(n){ n.textContent=msg; n.className="sl-w-note"+(ok?" ok":" err"); } }

  function submit(){
    var t=T[LANG], f=CFG.fields||{};
    if(document.getElementById("sl-hp").value) return;
    var svc=svcObj(); if(!svc){ note(t.needsvc); return; }
    if(!SEL.date||!SEL.time){ note(t.needslot); return; }
    var name=(document.getElementById("sl-name").value||"").trim();
    var email=(document.getElementById("sl-email").value||"").trim();
    if(!name||!email){ note(t.name+" / "+t.email+" *"); return; }
    var phone=f.phone?(document.getElementById("sl-phone").value||"").trim():"";
    var msg=f.message?(document.getElementById("sl-msg").value||"").trim():"";
    var sm=+CFG.slotMinutes||30, dur=+svc.durationMin||30, start=minsOf(SEL.time);
    var cells=[]; for(var k=start;k<start+dur;k+=sm) cells.push(ckey(SEL.date,k));
    var btn=document.getElementById("sl-submit"); btn.disabled=true;
    db.reserve(cells, SEL.date).then(function(ok){
      if(!ok){ btn.disabled=false; note(T[LANG].taken); loadSlots(); return; }
      var price=svcPrice(svc), currency=(LANG==="en")?"EUR":"HUF";
      var data={ name:name, email:email, service:svc.name, serviceLoc:svcName(svc),
        price:price, currency:currency, slotKey:ckey(SEL.date,start), date:SEL.date, time:SEL.time,
        durationMin:dur, cells:cells, message:msg, key:KEY, status:"uj", source:"slotli-widget", createdAt:Date.now() };
      if(currency==="EUR") data.fxRate=+CFG.eurHuf||0;
      if(f.phone) data.phone=phone;
      return db.addInbox(data).then(function(){
        try { sendConfirmations(data); } catch(e){}
        mount.querySelector(".slotli-form").innerHTML='<div class="sl-w-done"><div class="sl-w-check">✓</div><div>'+esc(T[LANG].thanks)+'<br><strong>'+esc(fmtWhen(data))+'</strong></div></div>';
      });
    }).catch(function(e){ btn.disabled=false; console.error(e); note(T[LANG].err); });
  }

  function fmtWhen(d){
    try{ var dt=new Date(d.date+"T00:00:00"); var ds=dt.toLocaleDateString(LANG==="en"?"en-GB":"hu-HU",{year:"numeric",month:"long",day:"numeric"}); return ds+" "+d.time; }catch(e){ return d.date+" "+d.time; }
  }

  function injectStyle(){
    if(document.getElementById("slotli-style")) return;
    var s=document.createElement("style"); s.id="slotli-style";
    s.textContent=".slotli-form{display:flex;flex-direction:column;gap:10px;max-width:420px}.slotli-form input,.slotli-form select,.slotli-form textarea{padding:11px 12px;font:inherit;font-size:15px;border:1px solid #ccc;border-radius:8px;width:100%;box-sizing:border-box}.slotli-form textarea{min-height:70px}.sl-w-hint{font-size:13px;opacity:.7;margin:2px 0}.sl-w-grid{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}.sl-w-chip{padding:8px 12px;font:inherit;font-size:14px;border:1px solid #ccc;border-radius:8px;background:#fff;cursor:pointer}.sl-w-chip.sel{background:#2f63e6;color:#fff;border-color:#2f63e6}.sl-w-chip:disabled{opacity:.35;cursor:not-allowed;text-decoration:line-through}.slotli-form>#sl-submit{padding:12px 16px;font:inherit;font-size:15px;font-weight:600;border:0;border-radius:8px;background:#2f63e6;color:#fff;cursor:pointer}.sl-w-note{font-size:13px;min-height:16px}.sl-w-note.err{color:#c0392b}.sl-w-note.ok{color:#1a8a4b}.sl-w-done{display:flex;gap:12px;align-items:center;font-size:15px;padding:8px 0}.sl-w-check{width:34px;height:34px;flex:0 0 34px;border-radius:50%;background:#1a8a4b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:19px}";
    document.head.appendChild(s);
  }

  try{ var mo=new MutationObserver(function(){ var nl=pageLang(); if(nl&&nl!==LANG){LANG=nl;render();} }); mo.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]}); }catch(e){}
  db.getConfig().then(function(cfg){ CFG = cfg || {}; LANG = pickLang(); render(); });
})();
<\/script>`;
}
function priceListSnippet() {
  const uid = currentUid || 'OWNER_UID';
  return `<!-- Slotli árlista — élőben a Slotli beállításaidból. Elég EGYSZER beilleszteni; ha módosítasz és mentesz, magától frissül. -->
<div id="slotli-prices"></div>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js"><\/script>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js"><\/script>
<script>
(function () {
  var OWNER_UID = "${uid}";
  var FB = { apiKey: "AIzaSyADv3V5fDtNnHOmG4jHjMehO6kHC_JIr7Q", authDomain: "slotli-202608.firebaseapp.com", projectId: "slotli-202608", storageBucket: "slotli-202608.firebasestorage.app", messagingSenderId: "528948546743", appId: "1:528948546743:web:7ab4296ec29ac92648d132" };
  try { if (!firebase.apps.length) firebase.initializeApp(FB); } catch (e) { console.error(e); }
  var fs = firebase.firestore();
  var mount = document.getElementById("slotli-prices");
  if (!mount) return;
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function pageLang(){var l=(document.documentElement.getAttribute("lang")||"").toLowerCase();if(l.indexOf("en")===0)return "en";if(l.indexOf("hu")===0)return "hu";return null;}
  function pickLang(){ if(window.SLOTLI_LANG==="hu"||window.SLOTLI_LANG==="en")return window.SLOTLI_LANG; return pageLang()||"hu"; }
  function money(v,EN){ v=Math.round(+v||0); return EN?("\\u20AC"+v.toLocaleString("hu-HU")):(v.toLocaleString("hu-HU")+" Ft"); }
  function priceText(s,EN,rate){
    if(s.priceMode==="free") return EN?"Free":"Ingyenes";
    var v; if(EN){ v=+s.priceEur||0; if(!v&&rate>0) v=Math.round((+s.price||0)/rate); } else { v=+s.price||0; }
    if(!v) return "";
    var m=money(v,EN);
    if(s.priceMode==="from") return EN?("from "+m):(m+"-t\\u00F3l");
    return m;
  }
  function render(cfg, LANG){
    var EN=LANG==="en", rate=+cfg.eurHuf||0;
    var svcs=(cfg.services||[]).filter(function(s){return s&&s.name;});
    function nm(s){return EN&&s.nameEn?s.nameEn:s.name;}
    function nt(s){return EN&&s.noteEn?s.noteEn:(s.note||"");}
    function ct(s){return EN&&s.catEn?s.catEn:(s.cat||"");}
    var order=[], map={};
    svcs.forEach(function(s){ var c=ct(s)||""; if(!(c in map)){ map[c]=[]; order.push(c); } map[c].push(s); });
    var h="";
    order.forEach(function(c){
      h+='<div class="slp-cat">';
      if(c) h+='<div class="slp-cat-title">'+esc(c)+'</div>';
      map[c].forEach(function(s){
        var p=priceText(s,EN,rate);
        h+='<div class="slp-row"><span class="slp-name">'+esc(nm(s))+(nt(s)?' <small>'+esc(nt(s))+'</small>':'')+'</span><span class="slp-dots"></span><span class="slp-amt">'+esc(p)+'</span></div>';
      });
      h+='</div>';
    });
    mount.innerHTML='<div class="slotli-prices">'+(h||'')+'</div>';
    injectStyle();
  }
  function injectStyle(){
    if(document.getElementById("slotli-prices-style")) return;
    var s=document.createElement("style"); s.id="slotli-prices-style";
    s.textContent=".slotli-prices{max-width:640px}.slp-cat{margin-bottom:22px}.slp-cat-title{font-size:12.5px;text-transform:uppercase;letter-spacing:.08em;font-weight:700;opacity:.6;margin:0 0 10px}.slp-row{display:flex;align-items:baseline;gap:10px;padding:7px 0}.slp-name{font-weight:600}.slp-name small{display:block;font-weight:400;font-size:.82em;opacity:.6;margin-top:2px}.slp-dots{flex:1;border-bottom:1px dotted currentColor;opacity:.28;transform:translateY(-3px)}.slp-amt{font-weight:700;white-space:nowrap}";
    document.head.appendChild(s);
  }
  var LAST={};
  function load(){ fs.collection("booking_configs").doc(OWNER_UID).get().then(function(d){ LAST=d.exists?d.data():{}; render(LAST, pickLang()); }).catch(function(){ mount.innerHTML=""; }); }
  try{ var mo=new MutationObserver(function(){ render(LAST, pickLang()); }); mo.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]}); }catch(e){}
  load();
})();
<\/script>`;
}
function hoursSnippet() {
  const uid = currentUid || 'OWNER_UID';
  return `<!-- Slotli nyitvatartás — élőben a Slotli beállításaidból. Elég EGYSZER beilleszteni; ha módosítasz és mentesz, magától frissül. -->
<div id="slotli-hours"></div>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js"><\/script>
<script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js"><\/script>
<script>
(function () {
  var OWNER_UID = "${uid}";
  var FB = { apiKey: "AIzaSyADv3V5fDtNnHOmG4jHjMehO6kHC_JIr7Q", authDomain: "slotli-202608.firebaseapp.com", projectId: "slotli-202608", storageBucket: "slotli-202608.firebasestorage.app", messagingSenderId: "528948546743", appId: "1:528948546743:web:7ab4296ec29ac92648d132" };
  try { if (!firebase.apps.length) firebase.initializeApp(FB); } catch (e) { console.error(e); }
  var fs = firebase.firestore();
  var mount = document.getElementById("slotli-hours");
  if (!mount) return;
  var DAYS=["mon","tue","wed","thu","fri","sat","sun"];
  var LABEL={ hu:{mon:"H\\u00E9tf\\u0151",tue:"Kedd",wed:"Szerda",thu:"Cs\\u00FCt\\u00F6rt\\u00F6k",fri:"P\\u00E9ntek",sat:"Szombat",sun:"Vas\\u00E1rnap",closed:"Z\\u00E1rva",open:"Nyitva",now:"Z\\u00E1rva"},
             en:{mon:"Monday",tue:"Tuesday",wed:"Wednesday",thu:"Thursday",fri:"Friday",sat:"Saturday",sun:"Sunday",closed:"Closed",open:"Open"} };
  function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  function pageLang(){var l=(document.documentElement.getAttribute("lang")||"").toLowerCase();if(l.indexOf("en")===0)return "en";if(l.indexOf("hu")===0)return "hu";return null;}
  function pickLang(){ if(window.SLOTLI_LANG==="hu"||window.SLOTLI_LANG==="en")return window.SLOTLI_LANG; return pageLang()||"hu"; }
  function minsOf(t){var p=String(t||"").split(":");return (+p[0]||0)*60+(+p[1]||0);}
  function fmtWin(w){ return (w.start||"")+" \\u2013 "+(w.end||""); }
  function todayId(){ var js=new Date().getDay(); return DAYS[(js+6)%7]; }
  function isOpenNow(hours){
    var h=hours[todayId()]; if(!h||!h.open||!h.windows) return false;
    var n=new Date(), nm=n.getHours()*60+n.getMinutes();
    for(var i=0;i<h.windows.length;i++){ if(nm>=minsOf(h.windows[i].start)&&nm<minsOf(h.windows[i].end)) return true; }
    return false;
  }
  function render(cfg, LANG){
    var L=LABEL[LANG]||LABEL.hu, hours=cfg.hours||{}, today=todayId();
    var openNow=isOpenNow(hours);
    var h='<div class="slh-head"><b>'+(LANG==="en"?"Opening hours":"Nyitvatart\\u00E1s")+'</b><span class="slh-pill '+(openNow?"is-open":"is-closed")+'">'+esc(openNow?L.open:L.closed)+'</span></div>';
    DAYS.forEach(function(id){
      var d=hours[id], txt;
      if(d&&d.open&&d.windows&&d.windows.length){ txt=d.windows.map(fmtWin).join(", "); }
      else { txt='<span class="slh-closed">'+esc(L.closed)+'</span>'; }
      h+='<div class="slh-row'+(id===today?" is-today":"")+'"><span class="slh-d">'+esc(L[id])+'</span><span class="slh-t">'+txt+'</span></div>';
    });
    mount.innerHTML='<div class="slotli-hours">'+h+'</div>';
    injectStyle();
  }
  function injectStyle(){
    if(document.getElementById("slotli-hours-style")) return;
    var s=document.createElement("style"); s.id="slotli-hours-style";
    s.textContent=".slotli-hours{max-width:420px}.slh-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.slh-head b{font-size:1.05em}.slh-pill{font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px;border:1px solid currentColor}.slh-pill.is-open{color:#1a8a4b}.slh-pill.is-closed{color:#c0392b}.slh-row{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid currentColor;border-color:rgba(128,128,128,.2)}.slh-row:last-child{border-bottom:none}.slh-row.is-today{font-weight:700}.slh-d{opacity:.85}.slh-closed{opacity:.55}";
    document.head.appendChild(s);
  }
  var LAST={};
  function load(){ fs.collection("booking_configs").doc(OWNER_UID).get().then(function(d){ LAST=d.exists?d.data():{}; render(LAST, pickLang()); }).catch(function(){ mount.innerHTML=""; }); }
  try{ var mo=new MutationObserver(function(){ render(LAST, pickLang()); }); mo.observe(document.documentElement,{attributes:true,attributeFilter:["lang"]}); }catch(e){}
  setInterval(function(){ render(LAST, pickLang()); }, 60000);
  load();
})();
<\/script>`;
}
function activeBookings() {
  return Object.values(state.bookings || {}).filter((b) => b.status !== 'lemondva');
}
function renderDash() {
  const stats = document.getElementById('dash-stats');
  const todayWrap = document.getElementById('dash-today');
  const upWrap = document.getElementById('dash-upcoming');
  if (!stats) return;
  const todayS = now();
  const all = activeBookings();
  const todays = all
    .filter((b) => b.date === todayS)
    .sort((a, b) => minsOf(a.time) - minsOf(b.time));
  const upcoming = all
    .filter((b) => b.date > todayS)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const yearS = String(new Date().getFullYear());
  const paidInv = (state.invoices || []).filter((i) => i.paid);
  const yearRevenue = paidInv
    .filter((i) => (i.paidDate || '').startsWith(yearS))
    .reduce((s, i) => s + invRevenueHuf(i), 0);
  const card = (label, val, cls) =>
    `<div class="card card-stat ${cls}" style="padding:14px 16px"><div style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;font-weight:700">${label}</div><div style="font-size:26px;font-weight:800;margin-top:4px;font-variant-numeric:tabular-nums">${val}</div></div>`;
  stats.innerHTML =
    card('Idei bevétel', fmtCur(yearRevenue, 'HUF'), 'card-stat-green') +
    card('Mai foglalás', todays.length, 'card-stat-blue') +
    card('Közelgő', upcoming.length, 'card-stat-cyan') +
    card('Összes (aktív)', all.length, 'card-stat-green');
  const line = (b) => `<div class="sl-line">
    <div class="sl-line-time">${b.date === todayS ? '' : fmtDateHu(b.date) + ' · '}${escHtml(b.time || '')}</div>
    <div class="sl-line-main"><strong>${escHtml(b.name || '—')}</strong>
      <div class="sl-line-sub">${escHtml(b.serviceLoc || b.service || '')}${b.durationMin ? ' · ' + b.durationMin + ' ' + L('perc', 'min') : ''}${b.phone ? ' · 📞 ' + escHtml(b.phone) : ''}</div>
    </div>
    ${bookingStatusBadge(b.status)}
  </div>`;
  if (todayWrap)
    todayWrap.innerHTML = todays.length
      ? todays.map(line).join('')
      : '<div class="sl-empty">Ma nincs foglalás.</div>';
  if (upWrap)
    upWrap.innerHTML = upcoming.length
      ? upcoming.slice(0, 12).map(line).join('')
      : '<div class="sl-empty">Nincs közelgő foglalás.</div>';
  renderDashRevenue();
}
function invRevenueHuf(inv) {
  if (typeof invTotalHuf === 'function') return invTotalHuf(inv);
  return (inv.items || []).reduce((s, it) => s + (it.qty || 1) * (it.unitPrice || 0), 0);
}
function renderDashRevenue() {
  const wrap = document.getElementById('dash-revenue');
  if (!wrap) return;
  const paid = (state.invoices || []).filter((i) => i.paid);
  const base = new Date();
  const months = [];
  for (let k = 11; k >= 0; k--) months.push(new Date(base.getFullYear(), base.getMonth() - k, 1));
  const rows = months.map((d) => {
    const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    const rev = paid
      .filter((i) => (i.paidDate || '').slice(0, 7) === key)
      .reduce((s, i) => s + invRevenueHuf(i), 0);
    return {
      d,
      rev
    };
  });
  const total = rows.reduce((s, r) => s + r.rev, 0);
  if (total === 0) {
    wrap.innerHTML =
      '<div class="sl-empty">Nincs még bevétel. A kifizetett számlák jelennek meg itt.</div>';
    return;
  }
  const max = Math.max.apply(null, rows.map((r) => r.rev).concat([1]));
  wrap.innerHTML =
    '<div class="rev-total">Utolsó 12 hónap: <strong>' +
    escHtml(fmtCur(total, 'HUF')) +
    '</strong></div>' +
    '<div class="rev-chart">' +
    rows
      .map((r) => {
        const barPx = r.rev ? Math.max(4, Math.round((r.rev / max) * 150)) : 0;
        const label =
          r.d.getMonth() === 0
            ? locDate(r.d, {
                year: '2-digit',
                month: 'short'
              })
            : locDate(r.d, {
                month: 'short'
              });
        return `<div class="rev-col" title="${escHtml(fmtCur(r.rev, 'HUF'))}">
        <div class="rev-col-track">
          ${r.rev ? `<div class="rev-col-val">${escHtml(fmtCurShort(r.rev))}</div>` : ''}
          <div class="rev-col-bar" style="height:${barPx}px"></div>
        </div>
        <div class="rev-col-month">${escHtml(label)}</div>
      </div>`;
      })
      .join('') +
    '</div>';
}
function saveProfile() {
  const el = document.getElementById('acct-name');
  if (!el) return;
  if (!state.profile) state.profile = {};
  state.profile.name = (el.value || '').trim();
  save();
  publishBookingConfig();
  refreshSidebarAccount();
}
function uiDialog(opts) {
  return new Promise((resolve) => {
    const o = opts || {};
    const wrap = document.createElement('div');
    wrap.className = 'modal open';
    const cancelBtn = o.showCancel
      ? `<button class="btn btn-secondary btn-sm" data-act="cancel">${escHtml(o.cancelText || 'Mégsem')}</button>`
      : '';
    wrap.innerHTML = `
      <div class="modal-card" style="max-width:400px">
        <div class="section-title" style="font-size:16px;margin-bottom:10px">${escHtml(o.title || 'Megerősítés')}</div>
        <div style="font-size:13px;line-height:1.6;white-space:pre-line">${escHtml(o.message || '')}</div>
        ${o.detail ? `<div style="font-size:12.5px;color:var(--muted);line-height:1.6;margin-top:8px;white-space:pre-line">${escHtml(o.detail)}</div>` : ''}
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:20px;flex-wrap:wrap">
          ${cancelBtn}
          <button class="btn ${o.danger ? 'btn-danger' : ''} btn-sm" data-act="ok">${escHtml(o.confirmText || 'OK')}</button>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    const done = (val) => {
      document.removeEventListener('keydown', onKey);
      wrap.remove();
      resolve(val);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        done(false);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        done(true);
      }
    };
    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) {
        done(false);
        return;
      }
      const act = e.target.closest('[data-act]');
      if (!act) return;
      done(act.getAttribute('data-act') === 'ok');
    });
    document.addEventListener('keydown', onKey);
    const ok = wrap.querySelector('[data-act="ok"]');
    if (ok) ok.focus();
  });
}
function uiConfirm(message, opts) {
  return uiDialog(
    Object.assign(
      {
        showCancel: true,
        confirmText: 'Törlés',
        danger: true
      },
      opts || {},
      {
        message
      }
    )
  );
}
function uiAlert(message, opts) {
  return uiDialog(
    Object.assign(
      {
        showCancel: false,
        confirmText: 'Rendben',
        danger: false,
        title: 'Értesítés'
      },
      opts || {},
      {
        message
      }
    )
  );
}
function exportData() {
  try {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slotli-mentes-' + now() + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    uiAlert('A mentés nem sikerült.');
  }
}
function importData(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data || typeof data !== 'object') throw new Error('bad');
      state = data;
      _stateLoaded = true;
      normalizeState();
      save();
      publishBookingConfig();
      renderAll();
      closeModal('data-modal');
      uiAlert('A mentés visszatöltve.', {
        title: 'Kész'
      });
    } catch (e) {
      uiAlert('Hibás mentésfájl — nem sikerült beolvasni.', {
        title: 'Hiba'
      });
    }
    input.value = '';
  };
  reader.readAsText(file);
}
async function resetAllData() {
  if (
    !(await uiConfirm(
      'Biztosan törölsz MINDEN adatot ebből a fiókból? Ez a művelet nem visszavonható — előtte érdemes fájlba menteni!',
      {
        title: 'Adatok nullázása',
        confirmText: 'Végleges törlés'
      }
    ))
  )
    return;
  state = defaultState();
  _stateLoaded = true;
  normalizeState();
  try {
    await LocalStore.saveVault(state);
  } catch (e) {}
  location.reload();
}
function toggleNav() {
  document.body.classList.toggle('sidebar-open');
}
function closeNav() {
  document.body.classList.remove('sidebar-open');
}
const LS_SIDEBAR = 'slotli_sidebar';
function toggleSidebarCollapse() {
  const collapsed = document.body.classList.toggle('sidebar-collapsed');
  try {
    localStorage.setItem(LS_SIDEBAR, collapsed ? 'collapsed' : 'expanded');
  } catch (e) {}
}
function initSidebar() {
  let s = null;
  try {
    s = localStorage.getItem(LS_SIDEBAR);
  } catch (e) {}
  if (s === 'collapsed') document.body.classList.add('sidebar-collapsed');
}
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
function refreshSidebarAccount() {
  const p = (state && state.profile) || {};
  const email = registeredEmail();
  const name = (p.name || '').trim();
  const nameEl = document.getElementById('side-account-name');
  const subEl = document.getElementById('side-account-sub');
  const avEl = document.getElementById('side-avatar');
  if (nameEl) nameEl.textContent = name || 'Fiók';
  if (subEl) subEl.textContent = email || 'Beállítások';
  if (avEl) avEl.textContent = (name || email || 'S').trim().charAt(0).toUpperCase() || 'S';
}
function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
const TAB_TITLES = {
  dash: 'Áttekintés',
  bookings: 'Foglalások',
  clients: 'Ügyfelek',
  invoices: 'Számlák',
  booker: 'Foglaló / weboldal',
  account: 'Fiók, vállalkozás és megjelenés'
};
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach((t) => t.classList.remove('active'));
  document.querySelectorAll('#main-nav button').forEach((b) => b.classList.remove('active'));
  const tab = document.getElementById('tab-' + id);
  if (tab) tab.classList.add('active');
  const navBtn = document.querySelector('#main-nav button[data-tab="' + id + '"]');
  if (navBtn) navBtn.classList.add('active');
  const acctBtn = document.getElementById('side-account-btn');
  if (acctBtn) acctBtn.classList.toggle('active', id === 'account');
  const label = document.getElementById('nav-current-label');
  if (label) label.textContent = TAB_TITLES[id] || (navBtn ? navBtn.textContent.trim() : '');
  if (id === 'account') {
    if (typeof window.refreshAppearanceControls === 'function') {
      try {
        window.refreshAppearanceControls();
      } catch (e) {}
    }
    populateAccountForms();
  }
  if (id === 'booker') {
    try {
      renderBooker();
    } catch (e) {}
  }
  if (id === 'invoices') {
    try {
      renderInvoices();
    } catch (e) {}
  }
  closeNav();
  renderAll();
}
function renderAll() {
  try {
    renderDash();
  } catch (e) {}
  if (typeof renderBookingsTable === 'function') {
    try {
      renderBookingsTable();
    } catch (e) {}
  }
  if (typeof renderClients === 'function') {
    try {
      renderClients();
    } catch (e) {}
  }
  if (typeof renderInvoices === 'function') {
    try {
      renderInvoices();
    } catch (e) {}
  }
  if (typeof updateBookingsBadge === 'function') {
    try {
      updateBookingsBadge();
    } catch (e) {}
  }
  if (typeof applyUiLang === 'function') {
    try {
      applyUiLang();
    } catch (e) {}
  }
}
let _appInitialized = false;
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initStore();
  setAuthMode('login');
  LocalStore.onAuthChange(async (user) => {
    if (!user) {
      currentUid = null;
      showAuthGate(true);
      _appInitialized = false;
      return;
    }
    currentUid = LocalStore.uid();
    showAuthGate(false);
    if (_appInitialized) return;
    _appInitialized = true;
    setSaveStatus('Betöltés…', '');
    const ok = await load();
    if (!ok) {
      _appInitialized = false;
      return;
    }
    const hd = document.getElementById('header-date');
    if (hd)
      hd.textContent = locDate(new Date(), {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
    refreshSidebarAccount();
    setSaveStatus('Felhő', '');
    showTab('dash');
    document.dispatchEvent(new Event('swm:ready'));
  });
  LocalStore.start();
});
