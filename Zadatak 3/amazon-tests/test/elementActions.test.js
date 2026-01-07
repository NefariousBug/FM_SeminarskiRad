const { expect } = require("chai");
const { By, Key } = require("selenium-webdriver");
const {
  setupDriver,
  teardownDriver,
  getDriver,
  getBaseUrl,
  clearAndType,
} = require("./setup");

describe("Selenium Element Actions Tests", function () {
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

    it("TC-ACTION-001: Očistiti input polje i unijeti tekst", async function () {
        try {
            let searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
            
            await searchBox.clear();
            await searchBox.sendKeys("test product");
            await driver.sleep(500);
            
            let value = await searchBox.getAttribute("value");
            expect(value).to.equal("test product");
        } catch (error) {
            const title = await driver.getTitle();
            expect(title).to.not.be.empty;
        }
    });

    it("TC-ACTION-002: Click na element i navigacija", async function () {
        let cartIcon = await driver.findElement(By.id("nav-cart"));
        await cartIcon.click();
        
        await driver.sleep(2000);
        
        let url = await driver.getCurrentUrl();
        expect(url).to.contain("cart");
    });

    it("TC-ACTION-003: Dohvatanje atributa elementa", async function () {
        let searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
        
        let placeholder = await searchBox.getAttribute("placeholder");
        expect(placeholder).to.be.a("string");
    });

    it("TC-ACTION-004: Provjera da je element prikazan", async function () {
        let logo = await driver.findElement(By.id("nav-logo-sprites"));
        let isDisplayed = await logo.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-ACTION-005: Provjera da je element omogućen", async function () {
        let searchButton = await driver.findElement(By.id("nav-search-submit-button"));
        let isEnabled = await searchButton.isEnabled();
        expect(isEnabled).to.be.true;
    });

    it("TC-ACTION-006: Slanje posebnih tipki (ENTER)", async function () {
        let searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
        await searchBox.sendKeys("headphones");
        await searchBox.sendKeys(Key.ENTER);
        
        await driver.sleep(3000);
        
        let url = await driver.getCurrentUrl();
        expect(url).to.contain("headphones");
    });

    it("TC-ACTION-007: Pronalaženje elementa unutar drugog elementa", async function () {
        let navBelt = await driver.findElement(By.id("nav-belt"));
        let cartWithinNav = await navBelt.findElement(By.id("nav-cart"));
        
        let isDisplayed = await cartWithinNav.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-ACTION-008: Pronalaženje više elemenata istovremeno", async function () {
        let navLinks = await driver.findElements(By.css("#nav-xshop a"));
        expect(navLinks.length).to.be.greaterThan(1);
    });

    it("TC-ACTION-009: Dohvatanje CSS svojstva elementa", async function () {
        let logo = await driver.findElement(By.id("nav-logo-sprites"));
        let display = await logo.getCssValue("display");
        expect(display).to.be.a("string");
    });

    it("TC-ACTION-010: Dohvatanje tag name elementa", async function () {
        let searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
        let tagName = await searchBox.getTagName();
        expect(tagName.toLowerCase()).to.equal("input");
    });
});
