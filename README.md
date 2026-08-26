# Slotli — appointment booking (admin + embeddable booking widget)

**Language / Nyelv:** [English](#english) · [Magyar](#magyar)

**🌐 Live / Élő oldal:** <https://maszlaig.github.io/Slotli/>

**🔗 GitHub:** <!-- Paste the project repository link here, e.g. https://github.com/username/slotli / Illeszd be ide a projekt repójának linkjét --> _(link coming soon / link hamarosan)_

---

## English

An account-based application built along the lines of Rendli. It does two things: it **monitors your clients' appointment bookings**, and it **generates an embeddable booking widget** for your website. The visitor picks from fixed time slots, and the booking **reserves the slot immediately** (with collision protection). Data is stored per account in the cloud (**Firebase** — Auth + Cloud Firestore), so bookings sync live.

The interface is fully **bilingual (Hungarian / English)** and uses the shared **"Soft" (Lágy)** design with a collapsible left sidebar (icon + label, collapses to icon). The layout is **responsive** — phone, tablet and desktop alike — with no horizontal page overflow (wide tables scroll inside their own container) and a sidebar that collapses on small screens.

### Files

- `index.html` — the UI (auth gate, sidebar, tabs)
- `css/style.css` — the shared "Soft" design system + Slotli additions, responsive layout
- `js/theme.js` — light / dark / auto appearance (keys: `slotli_theme`, `slotli_mode`)
- `js/script.js` — auth, state, booking setup, **widget generator**, overview (incl. the last-12-months revenue chart), i18n
- `js/bookings.js` — live incoming-booking sync (Firestore), bookings table, statuses, clients
- `js/invoices.js` — invoicing + Account (company details, business/tax form, language)
- `js/firebase-store.js` — Firebase Auth + Cloud Firestore data layer (`vaults/<uid>`)
- `js/fit-text.js` — auto-fit for large numeric displays
- `icon.svg` — app icon
- `email-sablon.html`, `email-sablon-tulaj.html` — booking-confirmation e-mail templates
- `README.md`, `DOKUMENTACIO.md`, `firebase.json`, `firestore.rules`, `firestore.indexes.json`

> Script load order: Firebase SDK → `firebase-store.js` → `theme.js` → `script.js` → `bookings.js` → `invoices.js`.

### Setup

There is **no build step**. Set up a Firebase project (fill in the config and deploy `firestore.rules`), then either:

1. **Open `index.html` directly** in a modern browser, or
2. **Host the files on any static host** (Firebase Hosting, GitHub Pages, Netlify, your own server) and open the site.

On first use, register an account (email + password). Then go to the **Booking / website** tab, configure your services and opening hours, and copy the generated widget code onto your website.

> **Note on the widget:** the widget reads its config and reserves slots in Cloud Firestore, so bookings **sync live across visitors and devices** — two people can't grab the same slot at once.

### Usage

- Register / sign in → **Booking / website** tab: set up the services (duration + price), the opening hours, the slot length → **Save settings**.
  - **Multiple windows per day**: within a single day you can define several time windows (e.g. with a lunch break: 09:00–12:00 and 14:00–18:00) via the "+ time slot" button. The widget only offers appointments within these windows.
- Copy the generated code onto your website (once is enough). If you edit and save later, the widget updates itself — no need to re-copy.
- Incoming bookings appear on the **Bookings** tab; setting a status to "Cancelled" **frees up** the slot in the booker.

### Architecture in a nutshell

- **`firebase-store.js`** wraps Firebase Auth (email/password) and Cloud Firestore, storing the app's data in a per-user vault (`vaults/<uid>`).
- The embeddable widget reads/writes Firestore under the owner's uid:
  - `booking_configs/<uid>` — the published booking config (services, opening hours…) the widget reads.
  - `.../slots` + `busy/<uid>` — slot reservations; the widget computes free slots from these and **reserves immediately** (two simultaneous bookings for the same slot collide, the second fails).
  - `inbox/<uid>/items` — incoming booking details; `bookings.js` pulls these into the app live.
- Use **Account → Export / Import** to back up or move your data (JSON).

---

## Magyar

A Rendli mintájára készült, fiók-alapú alkalmazás. Két dolgot csinál: **monitorozza az ügyfelek időpontfoglalásait**, és **generál egy beágyazható foglaló-widgetet** a weboldaladra. A látogató fix idősávokból választ, és a foglalás **azonnal lefoglalja** a sávot (ütközésvédelemmel). Az adatok fiókonként a felhőben (**Firebase** — Auth + Cloud Firestore) tárolódnak, így a foglalások élőben szinkronizálódnak.

A felület teljesen **kétnyelvű (magyar / angol)**, a közös **„Lágy"** dizájnt használja, összecsukható bal oldali menüsávval (ikon + felirat, ikonná csukható). Az elrendezés **reszponzív** — telefonon, tableten és asztali gépen egyaránt —, vízszintes túllógás nélkül (a széles táblázatok a saját konténerükben görgethetők), az oldalsáv pedig kis képernyőn összecsukódik.

### Fájlok

- `index.html` — a felület (auth-kapu, oldalsáv, tabok)
- `css/style.css` — a közös „Lágy" megjelenési rendszer + Slotli-kiegészítések, reszponzív elrendezés
- `js/theme.js` — világos / sötét / auto megjelenés (kulcsok: `slotli_theme`, `slotli_mode`)
- `js/script.js` — auth, állapot, foglaló-beállító, **widget-generátor**, áttekintés (benne az utolsó 12 hónapos bevétel-diagram), i18n
- `js/bookings.js` — élő beérkező-foglalás szinkron (Firestore), foglalás-táblázat, státuszok, ügyfelek
- `js/invoices.js` — számlázás + Fiók (cégadatok, vállalkozási forma/adózás, nyelv)
- `js/firebase-store.js` — Firebase Auth + Cloud Firestore adatréteg (`vaults/<uid>`)
- `js/fit-text.js` — nagy számkijelzők automatikus méretezése
- `icon.svg` — az alkalmazás ikonja
- `email-sablon.html`, `email-sablon-tulaj.html` — foglalás-visszaigazoló e-mail sablonok
- `README.md`, `DOKUMENTACIO.md`, `firebase.json`, `firestore.rules`, `firestore.indexes.json`

> Szkript-betöltési sorrend: Firebase SDK → `firebase-store.js` → `theme.js` → `script.js` → `bookings.js` → `invoices.js`.

### Beüzemelés

**Nincs build lépés.** Állíts be egy Firebase-projektet (töltsd ki a konfigurációt és telepítsd a `firestore.rules`-t), majd vagy:

1. **Nyisd meg közvetlenül az `index.html`-t** egy modern böngészőben, vagy
2. **Töltsd fel a fájlokat tetszőleges statikus tárhelyre** (Firebase Hosting, GitHub Pages, Netlify, saját szerver) és nyisd meg az oldalt.

Első használatkor regisztrálj egy fiókot (e-mail + jelszó). Ezután a **Foglaló / weboldal** fülön állítsd be a szolgáltatásaidat és a nyitvatartást, majd másold a generált widget-kódot a weboldaladra.

> **Megjegyzés a widgetről:** a widget a konfigurációt a Cloud Firestore-ból olvassa, és ott is foglalja le a sávokat, így a foglalások **élőben szinkronizálódnak látogatók és eszközök között** — két ember nem foglalhatja le ugyanazt a sávot egyszerre.

### Használat

- Regisztrálj/lépj be → **Foglaló / weboldal** fül: állítsd be a szolgáltatásokat (időtartam + ár), a nyitvatartást, a sávhosszt → **Beállítások mentése**.
  - **Nyitvatartás naponta több ablakkal**: egy napon belül több idősávot is megadhatsz (pl. ebédszünettel: 09:00–12:00 és 14:00–18:00) a „+ idősáv" gombbal. A widget csak az ablakokon belül kínál fel időpontot.
- Másold a generált kódot a weboldaladra (elég egyszer). Ha később módosítasz és mentesz, a widget magától frissül — nem kell újramásolni.
- A beérkező foglalások a **Foglalások** fülön jelennek meg; a státusz „Lemondva"-ra állítása **felszabadítja** a sávot a foglalón.

### Architektúra dióhéjban

- A **`firebase-store.js`** a Firebase Autht (e-mail/jelszó) és a Cloud Firestore-t burkolja, az app adatait felhasználónkénti vaultban (`vaults/<uid>`) tárolva.
- A beágyazható widget a Firestore-t írja/olvassa a tulaj uid-ja alatt:
  - `booking_configs/<uid>` — a közzétett foglalási konfiguráció (szolgáltatások, nyitvatartás…), amit a widget olvas.
  - `.../slots` + `busy/<uid>` — sávfoglalások; a widget ebből számolja a szabad sávokat és **azonnal foglal** (két egyidejű foglalás ugyanarra a sávra ütközik, a második elbukik).
  - `inbox/<uid>/items` — beérkező foglalás-részletek; a `bookings.js` élőben behúzza az appba.
- A **Fiók → Export / Import** funkcióval menthető/átvihető az adat (JSON).
