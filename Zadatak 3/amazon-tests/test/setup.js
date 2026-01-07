const { Builder, Browser } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = null;

const BASE_URL = "https://www.amazon.com";
const IMPLICIT_WAIT = 10000;
const PAGE_LOAD_TIMEOUT = 30000;

async function setupDriver() {
  try {
    const options = new chrome.Options();
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeOptions(options)
      .build();
    
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: IMPLICIT_WAIT });
    await driver.manage().setTimeouts({ pageLoad: PAGE_LOAD_TIMEOUT });
    
    return driver;
  } catch (error) {
    console.error("Greška pri pokretanju WebDriver-a:", error);
    throw error;
  }
}

async function teardownDriver() {
  try {
    if (driver) {
      await driver.quit();
      driver = null;
    }
  } catch (error) {
    console.error("Greška pri zatvaranju WebDriver-a:", error);
  }
}

function getDriver() {
  return driver;
}

function getBaseUrl() {
  return BASE_URL;
}

async function waitForElement(locator, timeout = 10000) {
  const { until } = require("selenium-webdriver");
  return await driver.wait(until.elementLocated(locator), timeout);
}

async function waitForClickable(element, timeout = 10000) {
  const { until } = require("selenium-webdriver");
  return await driver.wait(until.elementIsVisible(element), timeout);
}

async function scrollToElement(element) {
  await driver.executeScript("arguments[0].scrollIntoView(true);", element);
  await driver.sleep(500);
}

async function clearAndType(element, text) {
  await element.clear();
  await element.sendKeys(text);
}

module.exports = {
  setupDriver,
  teardownDriver,
  getDriver,
  getBaseUrl,
  waitForElement,
  waitForClickable,
  scrollToElement,
  clearAndType,
  IMPLICIT_WAIT,
  PAGE_LOAD_TIMEOUT,
};
