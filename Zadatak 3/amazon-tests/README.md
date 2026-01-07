# Amazon.com - Selenium Test Automation

Automatski testovi za Amazon.com koristeći Selenium WebDriver, JavaScript, i Mocha framework.

---

## 🚀 Setup

### Preduslovi
- Node.js (v14 ili noviji)
- Chrome browser

### Instalacija
```bash
# Klonuj/Download projekat
cd amazon-tests

# Instaliraj dependencies
npm install
```

---

## ▶️ Pokretanje Testova

### Svi testovi
```bash
npm test
```

## 📋 Testne Funkcionalnosti

### 🏷️ Category & Filters (10 testova)
- Navigacija kroz kategorije
- Filtracija po brendu, cijeni, review-ima
- Prime eligible filter
- Sortiranje rezultata
- Kombinovanje filtera

### 🔍 Search (6 testova)
- Osnovna pretraga
- Autocomplete suggestions
- URL validacija
- Search button funkcionalnost
- Category dropdown

### 📦 Products (7 testova)
- Prikaz proizvoda u rezultatima
- Product detail stranica
- Add to Basket/Cart
- Quantity selector
- Product informacije

### 🛒 Shopping Cart (6 testova)
- Navigacija na cart
- Empty cart validacija
- Cart count
- Checkout sekcija

### 🏠 Homepage (7 testova)
- Logo, search bar, cart ikona
- Account sekcija
- Page title validacija

### 🧭 Navigation (7 testova)
- Navigation bar
- Hamburger menu
- Orders link
- Logo click navigation
- Prime link

### 🦶 Footer (6 testova)
- Footer postojanje
- Back to Top
- Copyright tekst
- Language selector

### ⚡ Element Actions (10 testova)
- Selenium metode (click, sendKeys, clear)
- getAttribute, isDisplayed, isEnabled
- Specijalne tipke
- CSS values


### 🪟 Windows & Tabs (6 testova)
- Otvaranje tab/window
- Prebacivanje između tab-ova
- Zatvaranje tab-ova

---

## 🎯 Šta Se Testira?

### Funkcionalno Testiranje
- ✅ Pretraga i filtracija proizvoda
- ✅ Navigacija kroz website
- ✅ Shopping cart funkcionalnost
- ✅ Product detail stranice
- ✅ Category browsing


### UI/UX Testiranje
- ✅ Element visibility
- ✅ Button/link funkcionalnost
- ✅ Scroll behavior
- ✅ Responsive elements

### Cross-functional Testiranje
- ✅ URL routing
- ✅ Page titles
- ✅ Multi-tab handling
- ✅ Wait strategije

---

## 🛠️ Tehnologije

- **Selenium WebDriver 4.39.0** - Browser automation
- **Mocha 11.7.5** - Test framework
- **Chai 6.2.2** - Assertions
- **Node.js** - Runtime environment
- **Chrome** - Target browser

---

## 📁 Struktura Projekta

```
amazon-tests/
├── test/
│   ├── setup.js              # Centralni setup sa helper funkcijama
│   ├── security.test.js      # Security & validation testovi
│   ├── categoryFilter.test.js # Category & filter testovi
│   ├── search.test.js        # Search funkcionalnost
│   ├── product.test.js       # Product stranice
│   ├── cart.test.js          # Shopping cart
│   ├── homepage.test.js      # Homepage elementi
│   ├── navigation.test.js    # Navigation testovi
│   ├── footer.test.js        # Footer testovi
│   ├── elementActions.test.js # Selenium akcije
│   ├── explicitWait.test.js  # Wait strategije
│   └── windowTabs.test.js    # Tab/window management
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Konfiguracija

### Timeouts
- Test timeout: `30000ms` (30 sekundi)
- Implicit wait: `10000ms`
- Page load timeout: `30000ms`

### Browser
- Chrome (headful mode)
- Maximized window
- Automatski ChromeDriver download

---

## 📝 Test Izvještaj

Nakon pokretanja, Mocha prikazuje:
- ✅ Broj passed testova
- ❌ Broj failed testova
- ⏭️ Broj pending/skipped testova
- ⏱️ Vrijeme izvršavanja

---
