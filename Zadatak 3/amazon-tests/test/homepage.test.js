const { expect } = require("chai");
const { By } = require("selenium-webdriver");
const {
  setupDriver,
  teardownDriver,
  getDriver,
  getBaseUrl,
} = require("./setup");

describe("Amazon Homepage Tests", function () {
  this.timeout(60000);

  let driver;
  const baseUrl = getBaseUrl();

  before(async function () {
    driver = await setupDriver();
  });

  after(async function () {
    await teardownDriver();
  });

  beforeEach(async function () {
    await driver.get(baseUrl);
    await driver.sleep(3000);
  });

    it("TC-HOME-001: Provjera naslova stranice sadrži 'Amazon'", async function () {
        let title = await driver.getTitle();
        expect(title).to.contain("Amazon");
    });

    it("TC-HOME-002: Provjera da je Amazon logo vidljiv", async function () {
        let logo = await driver.findElement(By.id("nav-logo-sprites"));
        let isDisplayed = await logo.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-HOME-003: Provjera da search bar postoji na stranici", async function () {
        let searchBar = await driver.findElement(By.id("twotabsearchtextbox"));
        let isDisplayed = await searchBar.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-HOME-004: Provjera da search dugme postoji", async function () {
        let searchButton = await driver.findElement(By.id("nav-search-submit-button"));
        let isDisplayed = await searchButton.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-HOME-005: Provjera da Cart ikona postoji", async function () {
        let cartIcon = await driver.findElement(By.id("nav-cart"));
        let isDisplayed = await cartIcon.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-HOME-006: Provjera da Cart ikona ima tekst 'Cart'", async function () {
        let cartText = await driver.findElement(By.id("nav-cart-text-container"));
        let text = await cartText.getText();
        expect(text).to.contain("Cart");
    });

    it("TC-HOME-007: Provjera da Account & Lists sekcija postoji", async function () {
        let accountSection = await driver.findElement(By.id("nav-link-accountList"));
        let isDisplayed = await accountSection.isDisplayed();
        expect(isDisplayed).to.be.true;
    });
});
