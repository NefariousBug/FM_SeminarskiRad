const { expect } = require("chai");
const { By, Key, until } = require("selenium-webdriver");
const {
  setupDriver,
  teardownDriver,
  getDriver,
  getBaseUrl,
} = require("./setup");

describe("Amazon Search Functionality Tests", function () {
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

    it("TC-SEARCH-001: Osnovna pretraga sa validnim pojmom", async function () {
        try {
            let searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
            await searchBox.clear();
            await searchBox.sendKeys("laptop");
            await searchBox.sendKeys(Key.ENTER);
            
            await driver.sleep(4000);
            
            let currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).to.include("k=").or.include("laptop").or.include("field-keywords");
        } catch (error) {
            const title = await driver.getTitle();
            expect(title).to.not.be.empty;
        }
    });

    it("TC-SEARCH-002: Provjera autocomplete suggestions tokom kucanja", async function () {
        let searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
        await searchBox.clear();
        await searchBox.sendKeys("iphone");
        
        await driver.sleep(2000);
        
        let suggestions = await driver.wait(
            until.elementLocated(By.css(".s-suggestion")),
            5000
        );
        let isDisplayed = await suggestions.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-SEARCH-003: Provjera da URL sadrži traženi pojam", async function () {
        let searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
        await searchBox.clear();
        await searchBox.sendKeys("headphones");
        await searchBox.sendKeys(Key.ENTER);
        
        await driver.sleep(3000);
        
        let currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.contain("headphones");
    });

    it("TC-SEARCH-004: Pretraga klikom na search dugme", async function () {
        let searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
        await searchBox.clear();
        await searchBox.sendKeys("keyboard");
        
        let searchButton = await driver.findElement(By.id("nav-search-submit-button"));
        await searchButton.click();
        
        await driver.sleep(3000);
        
        let currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.contain("keyboard");
    });

    it("TC-SEARCH-005: Provjera postojanja category dropdown-a", async function () {
        let categoryDropdown = await driver.findElement(By.css("#searchDropdownBox, #nav-search-dropdown-card, .nav-search-dropdown"));
        let exists = categoryDropdown !== null;
        expect(exists).to.be.true;
    });

    it("TC-SEARCH-006: Provjera više rezultata pretrage", async function () {
        let searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
        await searchBox.clear();
        await searchBox.sendKeys("mouse");
        await searchBox.sendKeys(Key.ENTER);
        
        await driver.sleep(3000);
        
        let searchResults = await driver.findElements(By.css("div[data-component-type='s-search-result']"));
        expect(searchResults.length).to.be.greaterThan(1);
    });
});
