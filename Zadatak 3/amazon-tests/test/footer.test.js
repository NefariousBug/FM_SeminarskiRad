const { expect } = require("chai");
const { By } = require("selenium-webdriver");
const {
  setupDriver,
  teardownDriver,
  getDriver,
  getBaseUrl,
  scrollToElement,
} = require("./setup");

describe("Amazon Footer Tests", function () {
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

    it("TC-FOOTER-001: Provjera postojanja footer sekcije", async function () {
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
        await driver.sleep(2000);
        
        try {
            let footer = await driver.findElement(By.css("footer, #navFooter, [role='contentinfo']"));
            let isDisplayed = await footer.isDisplayed();
            expect(isDisplayed).to.be.true;
        } catch (error) {
            const backToTop = await driver.findElement(By.css("#navBackToTop, a[href='#top']"));
            const isVisible = await backToTop.isDisplayed();
            expect(isVisible).to.be.true;
        }
    });

    it("TC-FOOTER-002: Provjera da 'Back to Top' link postoji", async function () {
        let backToTop = await driver.findElement(By.id("navBackToTop"));
        let isDisplayed = await backToTop.isDisplayed();
        expect(isDisplayed).to.be.true;
    });

    it("TC-FOOTER-003: Scroll na vrh stranice klikom na 'Back to Top'", async function () {
        await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
        await driver.sleep(1500);
        
        let backToTop = await driver.findElement(By.id("navBackToTop"));
        await driver.executeScript("arguments[0].click();", backToTop);
        await driver.sleep(1000);
        
        let scrollPosition = await driver.executeScript("return window.pageYOffset;");
        expect(scrollPosition).to.be.lessThan(100);
    });

    it("TC-FOOTER-004: Provjera da copyright tekst sadrži 'Amazon'", async function () {
        let copyright = await driver.findElement(By.css(".navFooterCopyright"));
        let text = await copyright.getText();
        expect(text).to.contain("Amazon");
    });

    it("TC-FOOTER-005: Provjera da footer sadrži više linkova", async function () {
        let footerLinks = await driver.findElements(By.css("#navFooter a"));
        expect(footerLinks.length).to.be.greaterThan(5);
    });

    it("TC-FOOTER-006: Provjera da language selector postoji", async function () {
        let languageSelector = await driver.findElement(By.css(".icp-nav-link-inner"));
        let isDisplayed = await languageSelector.isDisplayed();
        expect(isDisplayed).to.be.true;
    });
});
