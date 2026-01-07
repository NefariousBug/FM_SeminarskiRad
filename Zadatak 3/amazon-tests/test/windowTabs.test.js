const { expect } = require("chai");
const { By } = require("selenium-webdriver");
const {
  setupDriver,
  teardownDriver,
  getDriver,
  getBaseUrl,
} = require("./setup");

describe("Window and Tab Management Tests", function () {
  this.timeout(60000);

  let driver;
  const baseUrl = getBaseUrl();
  let originalWindow;

  before(async function () {
    driver = await setupDriver();
  });

  after(async function () {
    await teardownDriver();
  });

  beforeEach(async function () {
    await driver.get(baseUrl);
    await driver.sleep(3000);
    originalWindow = await driver.getWindowHandle();
  });

    beforeEach(async function () {
        originalWindow = await driver.getWindowHandle();
    });

    afterEach(async function () {
        let handles = await driver.getAllWindowHandles();
        for (let handle of handles) {
            if (handle !== originalWindow) {
                await driver.switchTo().window(handle);
                await driver.close();
            }
        }
        await driver.switchTo().window(originalWindow);
    });

    it("TC-WINDOW-001: Dohvatanje window handle trenutnog prozora", async function () {
        let windowHandle = await driver.getWindowHandle();
        expect(windowHandle).to.be.a("string");
        expect(windowHandle.length).to.be.greaterThan(0);
    });

    it("TC-WINDOW-002: Otvaranje novog tab-a", async function () {
        await driver.switchTo().newWindow("tab");
        
        let handles = await driver.getAllWindowHandles();
        expect(handles.length).to.equal(2);
    });

    it("TC-WINDOW-003: Otvaranje novog prozora", async function () {
        await driver.switchTo().newWindow("window");
        
        let handles = await driver.getAllWindowHandles();
        expect(handles.length).to.equal(2);
    });

    it("TC-WINDOW-004: Prebacivanje između tabova", async function () {
        await driver.switchTo().newWindow("tab");
        await driver.get("https://www.amazon.com/gp/cart/view.html");
        await driver.sleep(2000);
        
        let cartUrl = await driver.getCurrentUrl();
        expect(cartUrl).to.contain("cart");
        
        await driver.switchTo().window(originalWindow);
        let homeUrl = await driver.getCurrentUrl();
        expect(homeUrl).to.equal("https://www.amazon.com/");
    });

    it("TC-WINDOW-005: Zatvaranje taba i vraćanje na originalni", async function () {
        await driver.switchTo().newWindow("tab");
        let newTabHandle = await driver.getWindowHandle();
        
        await driver.close();
        await driver.switchTo().window(originalWindow);
        
        let handles = await driver.getAllWindowHandles();
        expect(handles.length).to.equal(1);
        expect(handles[0]).to.equal(originalWindow);
    });

    it("TC-WINDOW-006: Provjera različitih naslova u različitim tabovima", async function () {
        let originalTitle = await driver.getTitle();
        
        await driver.switchTo().newWindow("tab");
        await driver.get("https://www.amazon.com/gp/cart/view.html");
        await driver.sleep(2000);
        
        let newTitle = await driver.getTitle();
        
        expect(originalTitle).to.not.equal(newTitle);
    });
});
