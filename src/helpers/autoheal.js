const { saveDOMSnapshot } = require("./fileHandler");
const { healLocator } = require("./healingCore");
const logger = require("../utils/logger");
require("dotenv").config();


async function safeClick(page, locator) {
  try {
    await page.click(locator, { timeout: 3000 }); // short timeout
    logger.info(`[PASS] Clicked: ${locator}`);
  } catch (err) {
    logger.warn(`[WARN] Locator failed: ${locator}`);

    const snapshotPath = await saveDOMSnapshot(page, locator);
    const healedLocator = await healLocator(snapshotPath, locator);

    if (healedLocator) {
      logger.info(`[INFO] Healing suggested: ${healedLocator}`);
      await page.click(healedLocator, { timeout: 5000 });
      logger.info(`[PASS] Retried with healed locator`);
    } else {
      throw err; // no healing found
    }
  }
}

async function safeFill(page, locator, value) {
  try {
    await page.fill(locator, value, { timeout: 3000 });
    logger.info(`[PASS] Filled: ${locator}`);
  } catch (error) {
    logger.warn(`[WARN] Fill failed for: ${locator}`);

    const snapshotPath = await saveDOMSnapshot(page, locator);
    const healedLocator = await healLocator(snapshotPath, locator);

    if (healedLocator) {
      logger.info(`[INFO] Healing suggested: ${healedLocator}`);
      await page.fill(healedLocator, value, { timeout: 5000 });
      logger.info(`[PASS] Retried fill with healed locator`);
    } else {
      throw error; // nothing to heal with
    }
  }
}

async function safeExpectVisible(page, locator) {
  try {
    await page.waitForSelector(locator, { state: "visible", timeout: 3000 });
    logger.info(`[PASS] Visible: ${locator}`);
  } catch (error) {
    logger.warn(`[WARN] Expect visible failed for: ${locator}`);

    const snapshotPath = await saveDOMSnapshot(page, locator);
    const healedLocator = await healLocator(snapshotPath, locator);

    if (healedLocator) {
      logger.info(`[INFO] Healing suggested: ${healedLocator}`);
      await page.waitForSelector(healedLocator, { state: "visible", timeout: 5000 });
      logger.info(`[PASS] Retried expectVisible with healed locator`);
    } else {
      throw error;
    }
  }
}


module.exports = { safeClick, safeFill, safeExpectVisible };