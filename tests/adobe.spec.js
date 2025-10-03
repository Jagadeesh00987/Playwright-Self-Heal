const { test, expect } = require("@playwright/test");

test("Click all Adobe Learn links - fixed", async ({ page }) => {
  await page.goto("https://www.adobe.com/learn");
  await page.waitForLoadState("networkidle");

  // Open dropdown first time
  await page.locator("(//div[contains(@class,'_oa11 LqtE1sc11')])[1]").click();

  const learnLinks = page.locator(
    'nav[aria-label="Secondary navigation"] ul'
  );

  const count = await learnLinks.count();
  console.log(`Found ${count} learn links`);

  for (let i = 0; i < count; i++) {
    const link = learnLinks.nth(i);
    const linkText = await link.innerText();
    console.log(`Clicking link: ${linkText}`);

    await Promise.all([
      page.waitForURL("**/learn/**", { timeout: 15000 }),
      link.click(),
    ]);

    console.log(`Navigated to: ${page.url()}`);

    // Popup check
    const popup = page.getByRole("dialog", { name: "Lightroom and Lightroom Classic" });

    if ((await popup.count()) > 0) {
      try {
        await popup.waitFor({ state: "visible", timeout: 5000 });
        console.log("Lightroom popup is visible");
        await popup.getByRole("button", { name: "Ok" }).click();
      } catch (e) {
        console.log("Popup did not appear");
      }
    }

    // Wait for tutorial card
    const tutorialCard = page.locator('div.learn-apps-header-container button');
   await tutorialCard.isVisible();
    await tutorialCard.waitFor({ state: "visible", timeout: 10000 });

    // Go back and ensure page is ready
    await page.goBack();
    await page.waitForLoadState("domcontentloaded");

    // Wait for dropdown to be visible again (stable) before clicking
    const dropdownTrigger = page.locator("text=Browse Adobe Learn");
    await dropdownTrigger.waitFor({ state: "visible", timeout: 10000 });
    await dropdownTrigger.click();
  }
});

test("zjsdhjhzd",async({page})=>{

// const browser=await chromium.launch({headless:false});
// const context=await browser.newContext();
// const page=await context.newPage();

await page.goto("https://www.adobe.com/learn");
await page.waitForLoadState("networkidle");     

})
