const { test } = require("@playwright/test");
const { safeClick, safeFill } = require("../src/helpers/autoheal");

test("Example with AI + fallback healing", async ({ page }) => {
   await page.goto("https://opensource-demo.orangehrmlive.com/", {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });
  // Purposely broken locator to trigger healing
  await safeFill(page,"//input[@placeholder='Username']", "Admin");
  await safeFill(page, 'input[placeholder="Password123"]', "admin123");
  await safeClick(page, 'button:has-text("Login123")');
});
