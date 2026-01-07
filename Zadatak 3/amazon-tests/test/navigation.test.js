const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");
const {
  setupDriver,
  teardownDriver,
  getDriver,
  getBaseUrl,
  scrollToElement,
} = require("./setup");

describe("Amazon Navigation Menu Tests", function () {
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

    it("TC-NAV-001: Provjera da navigation bar postoji i funkcionira", async function () {
        try {
            const navBar = await driver.findElement(By.css("#nav-main, #navbar, header"));
            const isDisplayed = await navBar.isDisplayed();
            expect(isDisplayed).to.be.true;
        } catch (error) {
            const logo = await driver.findElement(By.id("nav-logo-sprites"));
            const isLogoDisplayed = await logo.isDisplayed();
            expect(isLogoDisplayed).to.be.true;
        }
    });

    it("TC-NAV-002: Otvaranje hamburger menu-a klikom", async function () {
        let hamburgerMenu = await driver.findElement(By.id("nav-hamburger-menu"));
        await hamburgerMenu.click();
        
        await driver.sleep(2000);
        
        let menuPanel = await driver.wait(
            until.elementLocated(By.id("hmenu-content")),
            5000
        );
        let isDisplayed = await menuPanel.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-NAV-003: Provjera da 'Orders' link postoji", async function () {
        let ordersLink = await driver.findElement(By.id("nav-orders"));
        let isDisplayed = await ordersLink.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-NAV-004: Provjera teksta 'Returns & Orders' linka", async function () {
        let ordersLink = await driver.findElement(By.id("nav-orders"));
        let text = await ordersLink.getText();
        expect(text).to.contain("Orders");
    });

    it("TC-NAV-005: Navigacija na homepage klikom na logo", async function () {
        let cartIcon = await driver.findElement(By.id("nav-cart"));
        await cartIcon.click();
        await driver.sleep(2000);
        
        let logo = await driver.findElement(By.id("nav-logo-sprites"));
        await logo.click();
        await driver.sleep(2000);
        
        let currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.contain("amazon.com");
    });

    it("TC-NAV-006: Provjera da 'Deliver to' sekcija postoji", async function () {
        let deliverTo = await driver.findElement(By.id("nav-global-location-popover-link"));
        let isDisplayed = await deliverTo.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-NAV-007: Provjera da Prime link postoji u navigaciji", async function () {
        let primeLink = await driver.findElement(By.css("a[data-csa-c-slot-id='nav_cs_0']"));
        let isDisplayed = await primeLink.isDisplayed();
        expect(isDisplayed).to.be.true;
    });
});
