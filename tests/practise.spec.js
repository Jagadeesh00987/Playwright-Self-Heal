const { test, expect } = require("@playwright/test");
const { TIMEOUT } = require("dns");
const fs = require("fs");
const { value } = require("jsonpath");

test.describe("My first Test Suite", () => {
  //   test.beforeAll("Launch the browser and Url", async ({ browser }) => {

  //     const page = await browser.newPage();

  //     await page.goto(
  //       "https://www.tutorialspoint.com/selenium/practice/slider.php"
  //     );
  //     await expect(page).toHaveURL(
  //       "https://www.tutorialspoint.com/selenium/practice/slider.php"
  //     );
  //     await expect(page).toHaveTitle("Selenium Practice - Slider");
  //     console.log(await page.title());
  //   });
  test("My First Test Case", async ({ page }) => {
    await page.goto(
      "https://www.tutorialspoint.com/selenium/practice/slider.php"
    );
    await page.locator("//button[normalize-space()='Elements']").click();
    await page.locator("//a[normalize-space()='Text Box']").click();
    const headerTextBox = await page.locator(
      "//h1[normalize-space()='Text Box']"
    );
    await expect(headerTextBox).toBeVisible();
    console.log(await headerTextBox.textContent());

    await page
      .locator("#fullname")
      .pressSequentially("Jagadeesh", { delay: 1000 });
    const value = await page.locator("#fullname").inputValue();
    console.log(value);

    await page.locator("#email").fill("jagadeesh@example.com", { delay: 1000 });
    await page
      .locator("#address")
      .fill("No 123, ABC Street XYZ City", { delay: 1000 });
    await page.locator("#password").fill("Jagadeesh@123", { delay: 1000 });
    await page.locator("//input[@value='Submit']").click();
  });

  test("My Second Test Case", async ({ page }) => {
    await page.goto(
      "https://www.tutorialspoint.com/selenium/practice/slider.php"
    );
    await page.locator("//button[normalize-space()='Elements']").click();
    await page.locator("//a[normalize-space()='Check Box']").click();

    //Main CheckBox open
    //await page.locator("//input[@id='c_bs_1']").click();
    //await page.locator("(//li[@id='bs_1']//span[@class='plus'])[1]").click();
    //Sub CheckBox1 open
    await page.locator("(//span[@class='plus'])[1]").click();
    await page.locator("(//span[@class='plus'])[1]").click();
    const checkbox1 = page.locator("//input[@id='c_io_4']");
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    await checkbox1.uncheck();
    await expect(checkbox1).not.toBeChecked();

    //Sub CheckBox2 closes
    await page.locator("(//span[@class='plus minus'])[1]").click();

    await page.locator("(//li[@id='bs_2']//span[@class='plus'])[1]").click();
    await page.locator("(//li[@id='bf_3'])[1]").click();
    await page.locator("//li[@id='bf_3']//span[@class='plus']").click();
    await page.locator("//input[@id='c_io_12']").check();
    await page.locator("//input[@id='c_io_12']").isChecked();

    // await page.locator("//input[@id='c_io_12']").uncheck();
    // await expect(page.locator("//input[@id='c_io_12']")).not.toBeChecked();
  });
});
test("Radio Button Test", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
  await page.locator("//button[normalize-space()='Elements']").click();
  await page.locator("(//a[normalize-space()='Radio Button'])[1]").click();
  const headContent = await page
    .locator("//p[@class='text-left']")
    .textContent();
  console.log(headContent);
  await expect(page.locator("//p[@class='text-left']")).toBeVisible();

  await page.locator("//input[@value='igottwo']").check();
  await expect(page.locator("//input[@value='igottwo']")).toBeChecked();
});

test("Buttons", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
  await page.locator("//button[normalize-space()='Elements']").click();
  await page.locator("//a[normalize-space()='Buttons']").click();
  await page.locator("//button[normalize-space()='Click Me']").click();
  const text = await page.locator("#welcomeDiv").textContent();
  await expect(text.includes("You have done a dynamic click")).toBeTruthy();
  await page
    .locator("//button[normalize-space()='Double Click Me']")
    .dblclick();
  const text1 = await page.locator("#doublec").textContent();
  await expect(text1.includes("You have Double clicked ")).toBeTruthy();
  await page
    .locator("//button[normalize-space()='Right Click Me']")
    .click({ button: "right" });
  // const text2=await page.locator("#rightclickc").textContent();
  // await expect(text2.includes("You have done a right click")).toBeTruthy();
});

test("Links", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
  await page.locator("//button[normalize-space()='Elements']").click();
  await page.locator("//a[normalize-space()='Links']").click();
  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    page.locator("//a[normalize-space()='Home']").click(),
  ]);
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL("https://www.tutorialspoint.com/index.htm");
  await page.goBack();
  await expect(page).toHaveURL(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
});

test("Click all links in a page", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );

  const all_links = await page.locator("//a");
  const countOfLinks = await all_links.count();

  for (let i = 0; i < countOfLinks; i++) {
    const link = await all_links.nth(i);
    const linkText = await link.textContent();
    console.log(linkText);
    if (linkText.length > 0) {
      console.log(linkText);
      await Promise.all([page.waitForEvent("popup"), link.click()]);
      console.log(page.url());
      await page.goBack();
    }
  }
});

test("Validate all images on the page", async ({ page }) => {
  // Go to your target page
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
  await page.locator("//button[normalize-space()='Elements']").click();
  await page.locator("//a[normalize-space()='Broken Links - Images']").click();
  // Get all image elements
  const images = page.locator("img");
  const count = await images.count();
  console.log(`Found ${count} images`);

  for (let i = 0; i < count; i++) {
    const img = images.nth(i);
    const src = img.getAttribute("src");
    const isBroken = await img.evaluate((node) => {
      return !(node.naturalWidth && node.complete > 0);
    });
    if (isBroken) {
      console.log(`Image with src ${src} is broken`);
    } else {
      console.log(`Image with src ${src} is valid`);
    }
  }
});
//Broken Links
test("Broken Links", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
  await page.locator("//button[normalize-space()='Elements']").click();
  // await page.locator("//a[normalize-space()='Broken Links - Images']").click();
  await page.locator("//a[normalize-space()='Links']").click();
  await page.locator("//button[normalize-space()='Elements']").click();
  //await page.locator("//a[normalize-space()='Broken Links - Images']").click();
  const brokenLinks = await page.locator("//a");
  const LinkCount = await brokenLinks.count();
  console.log(`Total ${LinkCount} Links `);

  for (let i = 0; i < LinkCount; i++) {
    const link = brokenLinks.nth(i);
    let url = await link.getAttribute("href");

    if (
      !url ||
      url === "#" ||
      url.toLowerCase().startsWith("javascript") ||
      url.toLowerCase().startsWith("mailto")
    ) {
      console.log(`⚠️ Skipping invalid link: ${url}`);
      continue;
    }

    // ✅ Convert relative URLs to absolute
    if (!url.startsWith("http")) {
      url = new URL(url, page.url()).toString();
    }

    const response = await page.request.get(url);
    if (!response.ok()) {
      console.log(`Broken Link ${url}| Status ${response.status()}`);
    } else {
      console.log(`Valid Link ${url}| Status ${response.status()}`);
    }
    //expect(response.ok()).toBeTruthy();
  }
});
//Upload and Download
test("Upload and Download", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
  await page.locator("//button[normalize-space()='Elements']").click();
  await page.locator("//a[normalize-space()='Upload and Download']").click();

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("#downloadButton").click(),
  ]);

  const downloadPath = await download.path();
  console.log(`File downloaded to: ${downloadPath}`);

  await page.setInputFiles("#uploadFile", downloadPath);
  // const uploadedFileName=await page.locator("#uploadedFilePath").textContent();
  // console.log(uploadedFileName);
  // expect(uploadedFileName.includes("sampleFile.jpeg")).toBeTruthy();
});

//Download file example
test("download file example", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/download");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("//a[normalize-space()='sampleFile.txt']").click(),
  ]);
  const filePath = "downloads/sampleFile.txt";
  await download.saveAs(filePath);
  console.log(`File downloaded to: ${filePath}`);
  expect(fs.existsSync(filePath)).toBeTruthy();
});

//Forms
test("Forms", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
  await page.locator("//button[normalize-space()='Forms']").click();
  await page.locator("//a[normalize-space()='Practice Form']").click();
  await page.locator("#name").fill("Jagadeesh");
  await page.locator("#email").fill("jagadeesh.singaravel@gmail.com");
  await page.locator("#gender").check();
  await page.locator("#mobile").fill("9876543210");
  await page.locator("#dob").clear();
  await page.locator("#dob").fill("1993-09-30");
  await page.locator("#subjects").fill("Science");
  await page.locator("input[type='checkbox']").nth(0).check();
  await page.setInputFiles("input[type='file']", "downloads/sampleFile.txt");
  await page
    .locator("textarea[placeholder='Currend Address']")
    .fill("No 123, ABC Street XYZ City");
  await page.locator("#state").selectOption("NCR");
  await page.locator("#city").selectOption("Lucknow");
  await page.locator("input[type='submit']").click();
});

//Alerts
test.only("Alerts", async ({ page }) => {
  await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
  await page.locator("//button[normalize-space()='Alerts, Frames & Windows']").click();
  await page.locator("//a[normalize-space()='Alerts']").click();
  //Alerts
  page.once("dialog", async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
  });
  await page.locator("//button[normalize-space()='Alert']").click();
  

  //Alerts will display after 5 sec
  page.once("dialog",async(dialog)=>{
    console.log(dialog.message());
    await dialog.accept();                              // (page.on==> can be used to handle only one alert in a page)
  });                                                  //(page.once==>can be used to handle mutiple alert in apage or in a test)
  await page.locator("//button[@onclick='myMessage()']").click();
  await page.waitForEvent('dialog',{timeout:7000});
  console.log("The timer alert handled successfully")

//Confirm Alerts
page.once("dialog",async(dialog)=>{
console.log(dialog.message());
await dialog.dismiss();
});
await page.locator("//button[@onclick='myDesk()']").click();
console.log('The alert handle successfully')
 
//prompt alert
page.once('dialog',async(dialog)=>{
console.log(dialog.message());
await dialog.accept("Playwright User")
})
await page.locator("//button[@onclick='myPromp()']").click();
 });