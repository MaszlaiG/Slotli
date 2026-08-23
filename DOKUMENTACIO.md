# Slotli — Műszaki dokumentáció

Fiók-alapú **időpontfoglaló rendszer**: egy admin-felület élőben követi a beérkező foglalásokat, és generál egy **beágyazható foglaló-widgetet** a vállalkozó weboldalára — ütközésvédelemmel (két látogató nem foglalhatja le ugyanazt a sávot). Adattárolás felhőben (Firebase), a foglalások élőben szinkronizálnak. Nincs build lépés, nincs keretrendszer.

> Ez a fájl a **fejlesztői/műszaki** dokumentáció. A felhasználói szintű bemutatás a [README.md](README.md)-ben van.

---

## 1. Technológiai stack

| Réteg | Megoldás |
| --- | --- |
| Nyelv | Vanilla HTML5 + CSS3 + ES2020+ JavaScript (nincs transpiler/bundler) |
| Auth | Firebase Authentication (e-mail + jelszó) |
| Adattár | Cloud Firestore (state-vault + widget-config + foglalt sávok + inbox) |
| Valós idejű szinkron | Firestore `onSnapshot` figyelők |
| E-mail | EmailJS (tulajdonosi + ügyfél-visszaigazolás sablon) |
| Diagram | Saját rajzolású `<canvas>` (utolsó 12 hónap bevétel) |

A UI **kétnyelvű (HU/EN)**, a megjelenés **világos / sötét / auto**, mobil-first reszponzív, összecsukható oldalsávval.

---

## 2. Fájlszerkezet és betöltési sorrend

```
03_Slotli/
├── index.html           # teljes DOM: auth-kapu, oldalsáv, fülek, ablakok
├── style.css            # „Lágy" dizájnrendszer + reszponzív elrendezés + téma
├── firebase-store.js    # Firebase Auth + Firestore burkoló (LocalStore)
├── theme.js             # világos/sötét/auto téma (localStorage: slotli_theme, slotli_mode)
├── fit-text.js          # nagy számkijelzők automatikus zsugorítása
├── script.js            # app-mag: auth, state, foglaló-beállító, widget-generátor, dashboard, i18n
├── bookings.js          # beérkező foglalások (Firestore figyelés), foglalt-sáv kezelés, ügyfelek
├── invoices.js          # számlázás + Fiók (cégadatok, adózás, nyelv)
├── email-sablon*.html   # EmailJS sablonok
├── firebase.json / firestore.rules / firestore.indexes.json
└── slotli-pelda-adatok.json   # példa state (importálható demó adat)
```

**Szkript-betöltési sorrend:**

```
Firebase SDK  →  firebase-store.js  →  theme.js  →  script.js  →  bookings.js  →  invoices.js
```

Nem ES-modulok: a fájlok a globális névtéren keresztül hívják egymást (a `bookings.js` és az `invoices.js` a `script.js`-beli `state`/`save`/`showTab`/`escHtml`/`uiConfirm` elemekre épül).

---

## 3. Architektúra és életciklus

### 3.1 Indulás és auth

- `firebase-store.js` `LocalStore`-ja: `onAuthChange`, `login/register/logout`, `loadVault`/`saveVault` a `vaults/<uid>`-ra.
- `LocalStore.onAuthChange(user => …)` (a `script.js`-ben):
  - **user nélkül** → `showAuthGate(true)` (`#auth-gate` látszik, `#app-root` rejtett);
  - **user esetén** → `showAuthGate(false)`, egyszeri init (`_appInitialized`), `await load()`, fejléc-dátum, `refreshSidebarAccount`, `showTab('dash')`, végül `document.dispatchEvent(new Event('swm:ready'))` — erre indul a `bookings.js` inbox-figyelése.
- Auth-műveletek: `authLogin`, `authRegister`, `authResetPassword`, `authLogout`, `setAuthMode`, `authErr`/`hibaSzoveg`.

### 3.2 State és perzisztencia

- Egyetlen memóriabeli `state` (lásd [4. Adatmodell](#4-adatmodell)).
- `load()` — vault beolvasása (vagy `defaultState`), `normalizeState()` + `normalizeBookingConfig()` (a widget-konfig épségének biztosítása), `ensureInboxKey()`.
- `save()` — a „csak sikeres betöltés után menthet" őrrel véd a felhő felülírása ellen; utána `LocalStore.saveVault(state)` + `flashSaved()`.
- `publishBookingConfig()` — a foglaló-konfigot közzéteszi a `booking_configs/<uid>` dokumentumba, hogy a beágyazott widget beolvashassa.
- Export/import/törlés: `exportData`/`importData`/`resetAllData`.

### 3.3 Renderelés, téma, i18n

- `showTab(id)` állítja az aktív fület és `renderAll()`-t hív; `renderAll()` a modul-renderelők gyűjtője (`renderDash`, `renderBooker`, `renderBookingsTable`, `renderClients`, `renderInvoices`).
- **Téma** (`theme.js`): `data-theme` + `data-mode` a `<html>`-en; `setAppearanceMode` (localStorage `slotli_mode`), auto módban napszak szerint.
- **i18n**: futásidejű DOM-fordítás (`translateToEn`/`restoreHu`/`_i18nWalk` + `startI18nObserver`), `applyUiLang`/`setUiLang`, `L(hu,en)`/`locDate`.

---

## 4. Adatmodell (`state`)

| Kulcs | Tartalom |
| --- | --- |
| `uiLang`, `bizTaxRate`, `fxEurHuf` | nyelv, adókulcs, EUR/HUF árfolyam |
| `inboxKey` | a widgethez tartozó egyedi azonosító |
| `bookingConfig` | **a foglaló beállítása**: `services` (név, `durationMin`, ár), `hours` (naponként `open` + `windows` [{start,end}]), `slotMinutes`, `minNoticeHours` |
| `bookings` | foglalások (idő, ügyfél, szolgáltatás, státusz) |
| `invoices` | kiállított számlák |
| `bizIncome` | bevétel-tételek |
| `profile`, `sellerInfo` | fiók- és cégadatok (számlához) |
| `bookingNumByYear` | évenkénti foglalás-sorszám |
| `importedBookingIds` | a már behúzott inbox-elemek azonosítói (duplikáció ellen) |

---

## 5. Fájlonkénti bontás és kulcsfüggvények

### 5.1 `script.js` (~2090 sor) — app-mag + foglaló-generátor

**Foglaló-beállító.** `renderServiceRows`/`setSvc`/`addService`/`removeSvc` (szolgáltatások időtartammal + árral); `renderHoursRows`/`setDayOpen`/`setWindow`/`addWindow`/`removeWindow` (**napi nyitvatartás több idősávval**, pl. ebédszünet: 09:00–12:00 és 14:00–18:00); `defaultHours`, `normalizeBookingConfig`, `bkCfg`. Mentés + közzététel: `saveBookingConfig` → `publishBookingConfig`.

**Idősáv-logika (a foglalás magja).**
- `cellKey(date, min)` egy nap+percpont kulcsa; `cellsForBooking(...)` egy foglalás által lefedett cellák; `minsOf('HH:MM')`/`hhmmOf(min)` átváltások.
- **`bpLoadSlots()`** — a felkínált időpontok kiszámítása: a kiválasztott nap nyitvatartási ablakain végigmegy `slotMinutes` lépésközzel; egy sáv akkor szabad, ha (a) a szolgáltatás időtartama alatt egyetlen cellája sem foglalt, és (b) nem esik a `minNoticeHours` minimum előjegyzési időn belülre (mai napra a jelen időhöz képest). A foglalt cellákat a `busy` állományból nézi.
- `bpSetService`/`bpSetDate`/`bpSelectSlot`/`bpSubmitNote` — az előnézeti foglaló interakciói; `bookerPreviewHtml` az admin-oldali élő előnézet.

**Beágyazható widget (generátor).** `bookerSnippet()` — a weboldalra másolható, **önálló** JS-widget teljes kódját adja: a látogató oldalán fut, a `booking_configs/<uid>`-ból olvassa a konfigot, a `busy` sávokból számol szabad időpontot, és **azonnal, ütközésvédelemmel** foglal a Firestore-ban, majd az `inbox`-ba írja a foglalás részleteit. `priceListSnippet`/`hoursSnippet` külön beágyazható árlista/nyitvatartás; `copyBookerSnippet`/`copySnippetFrom` vágólap; `readBookerControls`/`updateBookerOutputs` a beállítófelület kötése.

**Áttekintő dashboard.** `activeBookings()`, **`renderDash()`** — stat-kártyák (idei bevétel, mai foglalás, közelgő, összes aktív), „Mai nap" és „Közelgő foglalások" lista, valamint `renderDashRevenue()` amely `<canvas>`-ra rajzolja az **utolsó 12 hónap bevétel-diagramját**. `invRevenueHuf` a számla bevételének HUF-ra váltása.

**Közös UI + segédek.** `uiDialog`/`uiConfirm`/`uiAlert`, `openModal`/`closeModal`, `toggleNav`/`toggleSidebarCollapse`/`initSidebar`, `refreshSidebarAccount`, `escHtml`, `fmtCur`/`fmtCurShort`, `fmtDateHu`, `pad2`, `saveProfile`.

### 5.2 `bookings.js` (~330 sor) — beérkező foglalások + ütközésvédelem

- **`initInboxSync()`** — a `swm:ready`-re indul: `inbox/<uid>/items` **élő figyelése** (`onSnapshot`); az új foglalásokat behúzza a `state.bookings` közé (`importedBookingIds` alapján), lefoglalja a hozzá tartozó sávokat (`claimBusyCells`), és törli a sort. `refreshInbox` kézi újraindítás, `showBookingsSyncError` hibajelzés.
- **Foglalt-sáv kezelés (a Firestore-ban).**
  - `_busyCol()` → `busy/<uid>/slots` kollekció;
  - `claimBusyCells(cells, date)` — **batch**-elt `set` a foglalt cellákra (ez adja az ütközésvédelmet: két egyidejű foglalás ugyanarra a cellára nem élhet meg egymás mellett);
  - `freeBusyCells(cells)` — **batch**-elt `delete` (lemondáskor felszabadítja a sávot).
- **Státuszok.** `BOOKING_STATUS_MAP` = `uj` (Új foglalás) / `lemondva` (Lemondva); `setBookingStatus(id, status)` — ha „Lemondva", meghívja a `freeBusyCells`-t, így a sáv újra foglalható; `bookingStatusBadge` a címke.
- `addBooking` (kézi rögzítés), `openBookingModal`, `renderBookingsTable` (szűrhető lista), `renderClients` (a foglalásokból épített ügyféltörzs), `updateBookingsBadge`.

### 5.3 `invoices.js` (~730 sor) — számlázás + Fiók

- **Számlázás.** `billableBookings()` (mely foglalások számlázhatók), `invOpen`/`invUpdatePreview`/`invSave`/`invMarkPaid`/`invDelete`, `invTotal`/`invTotalHuf`, `nextInvoiceNumForBooking`/`invNextNum`/`migrateBookingNumbers`, `reconcileInvoiceIncomes` (a számlából könyvelt bevétel szinkronban tartása), `renderInvoices` (függő/kifizetett bontás, stat-kártyák). `invDownloadPDF(id)` tiszta nyomtatási ablakot nyit (böngésző fejléc/lábléc nélkül).
- **Fiók.** `populateAccountForms`, `saveAccountProfile`, `saveBusinessProfile`, `saveSellerInfo`, `onVatStatusChange`/`updateTaxNote`, `changeAccountPassword`, `sendAccountPasswordReset`, `applyUiLang`/`setUiLang` (a fiókoldali nyelvváltás), `openDataModal`.

### 5.4 `firebase-store.js` / `theme.js` / `fit-text.js`
A testvér-appokkal azonos szerep: adatréteg (Auth + Firestore), téma/mód, nagy számok illesztése.

---

## 6. Külső integrációk és a foglalás adatáramlása

Firestore-dokumentumok:
- `vaults/<uid>` — az app teljes állapota;
- `booking_configs/<uid>` — a közzétett widget-konfiguráció (a látogató oldala ezt olvassa);
- `busy/<uid>/slots/<cellKey>` — lefoglalt idő-cellák (ütközésvédelem);
- `inbox/<uid>/items` — beérkező foglalás-részletek sora.

```
Látogató weboldala (beágyazott widget)                 Slotli admin
  ├─ olvassa:  booking_configs/<uid>  (szolgáltatások, nyitvatartás)
  ├─ olvassa:  busy/<uid>/slots       (mely sávok foglaltak → szabad időpontok)
  ├─ FOGLAL:   busy/<uid>/slots       (azonnal, ütközésvédelemmel)
  └─ beküld:   inbox/<uid>/items ──────onSnapshot──────►  bookings.js:
                                                            state.bookings-be húzza,
                                                            claimBusyCells, törli a sort
Lemondás (admin) → freeBusyCells → a sáv újra foglalható
```

EmailJS: tulajdonosi értesítő és ügyfél-visszaigazolás a sablonokból.

---

## 7. Reszponzivitás

Mobil-first; az oldalsáv hamburgerré csukódik, a rácsok `auto-fit`-tel törnek (a dashboard „Mai nap / Közelgő foglalások" blokkja mobilon egy oszlopba rendeződik), a széles táblák a saját konténerükben görgethetők — **nincs oldalszintű vízszintes túllógás** (mobil/tablet/asztali tesztelve).

---

## 8. Beüzemelés

1. Firebase-projekt + konfiguráció (`firestore.rules` telepítés); EmailJS beállítás.
2. A fájlok feltöltése statikus tárhelyre (Firebase Hosting / GitHub Pages / Netlify / saját szerver).
3. Regisztráció → **Foglaló / weboldal** fül: szolgáltatások, nyitvatartás, sávhossz beállítása → **Beállítások mentése** → a generált widget-kód a weboldalra másolása (elég egyszer; a későbbi módosítások a közzétett konfigon át maguktól frissülnek).

Nincs build lépés; fejlesztéshez elég egy statikus fájlkiszolgáló.
