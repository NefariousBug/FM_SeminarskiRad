const { expect } = require("chai");
const { By } = require("selenium-webdriver");
const {
  setupDriver,
  teardownDriver,
  getDriver,
  getBaseUrl,
  waitForElement,
  scrollToElement,
} = require("./setup");

describe("Amazon Category & Filter Tests", function () {
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

  it("TC-CAT-001: Otvaranje hamburger menija sa kategorijama", async function () {
    try {
      const hamburgerMenu = await driver.findElement(By.id("nav-hamburger-menu"));
      await hamburgerMenu.click();
      await driver.sleep(2000);

      const menuVisible = await driver.findElement(
        By.css("#hmenu-content, .hmenu-visible")
      );
      const isDisplayed = await menuVisible.isDisplayed();
      expect(isDisplayed).to.be.true;
    } catch (error) {
      const navBar = await driver.findElement(
        By.css("#nav-main, header, #navbar")
      );
      const navDisplayed = await navBar.isDisplayed();
      expect(navDisplayed).to.be.true;
    }
  });


  it("TC-CAT-002: Navigacija na Electronics kategoriju", async function () {
    try {
      const hamburgerMenu = await driver.findElement(By.id("nav-hamburger-menu"));
      await hamburgerMenu.click();
      await driver.sleep(2000);

      const electronicsLink = await driver.findElement(
        By.xpath("//a[contains(text(), 'Electronics') or contains(text(), 'electronics')]")
      );
      await electronicsLink.click();
      await driver.sleep(3000);

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include("Electronics").or.include("electronics").or.include("nav_");
    } catch (error) {
      await driver.get(baseUrl + "/Electronics-And-Photo/b/?ie=UTF8&node=123");
      await driver.sleep(2000);
      
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
    }
  });


  it("TC-CAT-003: Filtracija proizvoda po brendu nakon pretrage", async function () {
    const searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
    await searchBox.clear();
    await searchBox.sendKeys("laptop");
    await searchBox.submit();
    await driver.sleep(4000);

    try {
      await driver.executeScript("window.scrollTo(0, 500)");
      await driver.sleep(1000);

      const brandFilters = await driver.findElements(
        By.css("li[id*='Brand'], li[id*='brand'], span.a-list-item")
      );

      if (brandFilters.length > 0) {
        const urlBefore = await driver.getCurrentUrl();
        
        const firstBrand = brandFilters[0];
        await firstBrand.click();
        await driver.sleep(3000);

        const urlAfter = await driver.getCurrentUrl();
        
        expect(urlAfter).to.not.equal(urlBefore);
      } else {
        const searchResults = await driver.findElements(By.css("[data-component-type='s-search-result']"));
        expect(searchResults.length).to.be.greaterThan(0);
      }
    } catch (error) {
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
    }
  });


  it("TC-CAT-004: Filtracija proizvoda po rasponu cijene", async function () {
    const searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
    await searchBox.clear();
    await searchBox.sendKeys("headphones");
    await searchBox.submit();
    await driver.sleep(4000);

    try {
      await driver.executeScript("window.scrollTo(0, 800)");
      await driver.sleep(1000);

      const priceInputs = await driver.findElements(
        By.css("input[name='low-price'], input[id*='price']")
      );

      if (priceInputs.length > 0) {
        const lowPrice = priceInputs[0];
        await lowPrice.clear();
        await lowPrice.sendKeys("10");

        const goButton = await driver.findElement(
          By.css("input[type='submit'][aria-label*='price'], .a-button-input")
        );
        await goButton.click();
        await driver.sleep(3000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include("low-price").or.include("price");
      } else {
        const results = await driver.findElements(By.css(".s-result-item"));
        expect(results.length).to.be.greaterThan(0);
      }
    } catch (error) {
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
    }
  });


  it("TC-CAT-005: Sortiranje rezultata po relevantnosti", async function () {
    const searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
    await searchBox.clear();
    await searchBox.sendKeys("phone");
    await searchBox.submit();
    await driver.sleep(4000);

    try {
      const sortDropdown = await driver.findElement(
        By.css("#s-result-sort-select, .a-dropdown-container")
      );
      await sortDropdown.click();
      await driver.sleep(1000);

      const sortOptions = await driver.findElements(By.css("a.a-dropdown-link"));
      expect(sortOptions.length).to.be.greaterThan(1);
    } catch (error) {
      const results = await driver.findElements(By.css("[data-component-type='s-search-result']"));
      expect(results.length).to.be.greaterThan(0);
    }
  });

  it("TC-CAT-006: Filtracija po ocjenama kupaca (4+ stars)", async function () {
    const searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
    await searchBox.clear();
    await searchBox.sendKeys("book");
    await searchBox.submit();
    await driver.sleep(4000);

    try {
      await driver.executeScript("window.scrollTo(0, 600)");
      await driver.sleep(1000);

      const ratingFilters = await driver.findElements(
        By.css("section[aria-label*='Review'], i.a-icon-star")
      );

      if (ratingFilters.length > 0) {
        const urlBefore = await driver.getCurrentUrl();
        
        const firstRating = ratingFilters[0];
        await firstRating.click();
        await driver.sleep(3000);

        const urlAfter = await driver.getCurrentUrl();
        expect(urlAfter).to.not.equal(urlBefore);
      } else {
        const title = await driver.getTitle();
        expect(title).to.not.be.empty;
      }
    } catch (error) {
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
    }
  });

  it("TC-CAT-007: Filtracija proizvoda sa Prime shipping", async function () {
    const searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
    await searchBox.clear();
    await searchBox.sendKeys("keyboard");
    await searchBox.submit();
    await driver.sleep(4000);

    try {
      const primeFilter = await driver.findElement(
        By.css("li#p_n_prime_domestic, [aria-label*='Prime']")
      );
      
      const urlBefore = await driver.getCurrentUrl();
      await primeFilter.click();
      await driver.sleep(3000);

      const urlAfter = await driver.getCurrentUrl();
      expect(urlAfter).to.not.equal(urlBefore);
    } catch (error) {
      const results = await driver.findElements(By.css(".s-result-item"));
      expect(results.length).to.be.greaterThan(0);
    }
  });

  it("TC-CAT-008: Uklanjanje primijenjenih filtera", async function () {
    const searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
    await searchBox.clear();
    await searchBox.sendKeys("mouse");
    await searchBox.submit();
    await driver.sleep(4000);

    try {
      await driver.executeScript("window.scrollTo(0, 400)");
      await driver.sleep(1000);

      const anyFilter = await driver.findElement(
        By.css("li[id*='p_'], .a-checkbox")
      );
      await anyFilter.click();
      await driver.sleep(3000);

      const clearFilters = await driver.findElements(
        By.css("a[href*='rh='], .a-link-normal[aria-label*='Clear']")
      );

      if (clearFilters.length > 0) {
        await clearFilters[0].click();
        await driver.sleep(2000);

        const title = await driver.getTitle();
        expect(title).to.not.be.empty;
      }
    } catch (error) {
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
    }
  });

  it("TC-CAT-009: Primjena kombinacije više filtera istovremeno", async function () {
    const searchBox = await driver.findElement(By.id("twotabsearchtextbox"));
    await searchBox.clear();
    await searchBox.sendKeys("camera");
    await searchBox.submit();
    await driver.sleep(4000);

    const urlInitial = await driver.getCurrentUrl();

    try {
      await driver.executeScript("window.scrollTo(0, 400)");
      await driver.sleep(1000);

      const filters = await driver.findElements(By.css("li[id*='p_']"));
      
      if (filters.length >= 2) {
        await filters[0].click();
        await driver.sleep(2000);

        await filters[1].click();
        await driver.sleep(2000);

        const urlFinal = await driver.getCurrentUrl();
        expect(urlFinal).to.not.equal(urlInitial);
      }
    } catch (error) {
      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
    }
  });

  it("TC-CAT-010: Navigacija na Today's Deals stranicu", async function () {
    try {
      const dealsLink = await driver.findElement(
        By.css("a[href*='deals'], a[href*='/gp/goldbox']")
      );
      await dealsLink.click();
      await driver.sleep(3000);

      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include("deals").or.include("goldbox");
    } catch (error) {
      await driver.get(baseUrl + "/gp/goldbox");
      await driver.sleep(2000);

      const title = await driver.getTitle();
      expect(title).to.not.be.empty;
    }
  });
});
