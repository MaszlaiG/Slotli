# Slotli

**Language / Nyelv:** [English](#english) · [Magyar](#magyar)

**📄 Design doc / Tervdokumentáció:** [`dokumentumok/`](dokumentumok/) (PDF, HU + EN)

---

## English

**🌐 Live site:** <https://maszlaig.github.io/Slotli/>

**Slotli** is an account-based **appointment-booking manager** for service providers — bookings, clients and invoices in one place, plus an **embeddable booking widget** whose submissions appear automatically. Data is stored per account in **Firebase** (Auth + Firestore). No build step, no framework: plain HTML/CSS/JS. Bilingual (HU/EN), light/dark "Studio" design with a blue-teal accent.

**Highlights**
- **Embeddable booking widget** — paste it onto your own site; the offered slots are computed from your services, opening hours and slot length, with collision protection.
- **Live inbox** — submitted bookings pull straight into the account (`onSnapshot`) with statuses; a cancellation frees the slot again.
- **Confirmation e-mails** — automatic client + provider notifications via **EmailJS**.
- **Invoicing** — issue and print invoices as **PDF**.
- **Overview** — a dashboard with a last-12-months revenue chart, clients and upcoming bookings.

**Tech:** vanilla HTML/CSS/JS · Firebase (Auth + Firestore) · EmailJS · custom canvas charts · no build step.

**Structure:** `index.html` · `css/` · `js/` (`script.js`, `bookings.js`, `invoices.js`, `theme.js`, `firebase-store.js`, `fit-text.js`) · `img/` (logó, favicon) · `email-sablonok/` · `firebase/` · `dokumentumok/` (design doc PDF, HU + EN).

**Deploy:** static hosting (GitHub Pages); Firestore rules from the `firebase/` folder (`cd firebase && firebase deploy --only firestore:rules`). Full details: the **design document PDF** in `dokumentumok/`.

---

## Magyar

**🌐 Élő oldal:** <https://maszlaig.github.io/Slotli/>

A **Slotli** fiók-alapú **időpontfoglalás-kezelő** szolgáltatóknak — foglalások, ügyfelek és számlák egy helyen, plusz egy **beágyazható foglaló-widget**, amelynek foglalásai automatikusan megjelennek. Az adat fiókonként a **Firebase**-ben (Auth + Firestore). Nincs build lépés, nincs keretrendszer: tiszta HTML/CSS/JS. Kétnyelvű (HU/EN), világos/sötét „Stúdió" dizájn kék-teal akcentussal.

**Kiemelt funkciók**
- **Beágyazható foglaló-widget** — a saját weboldaladra illeszthető; a felkínált idősávokat a szolgáltatásaidból, a nyitvatartásból és a sávhosszból számolja, ütközésvédelemmel.
- **Élő beérkező lista** — a leadott foglalások élőben behúzódnak a fiókba (`onSnapshot`), státuszokkal; egy lemondás visszaszabadítja a sávot.
- **Visszaigazoló e-mailek** — automatikus ügyfél + szolgáltató értesítés **EmailJS**-en.
- **Számlázás** — számlák kiállítása és nyomtatása **PDF**-ként.
- **Áttekintés** — irányítópult az utolsó 12 hónap bevétel-diagramjával, ügyfelekkel és közelgő foglalásokkal.

**Technológia:** vanilla HTML/CSS/JS · Firebase (Auth + Firestore) · EmailJS · egyedi canvas diagramok · build lépés nélkül.

**Szerkezet:** `index.html` · `css/` · `js/` (`script.js`, `bookings.js`, `invoices.js`, `theme.js`, `firebase-store.js`, `fit-text.js`) · `img/` (logó, favicon) · `email-sablonok/` · `firebase/` · `dokumentumok/` (tervdokumentáció PDF, HU + EN).

**Közzététel:** statikus tárhely (GitHub Pages); a Firestore-szabály a `firebase/` mappából (`cd firebase && firebase deploy --only firestore:rules`). Teljes leírás: a **tervdokumentáció PDF** a `dokumentumok/` mappában.
