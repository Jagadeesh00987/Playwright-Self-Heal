const { test, expect } = require("@playwright/test");
const { TIMEOUT } = require("dns");

test.describe('My first Test Suite',() => {
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

test('Buttons',async({page})=>{
 await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
 await page.locator("//button[normalize-space()='Elements']").click();
 await page.locator("//a[normalize-space()='Buttons']").click();
 await page.locator("//button[normalize-space()='Click Me']").click();
 const text=await page.locator("#welcomeDiv").textContent();
await expect(text.includes("You have done a dynamic click")).toBeTruthy();
await page.locator("//button[normalize-space()='Double Click Me']").dblclick();
const text1=await page.locator("#doublec").textContent();
await expect(text1.includes("You have Double clicked ")).toBeTruthy();
await page.locator("//button[normalize-space()='Right Click Me']").click({button:'right'});
// const text2=await page.locator("#rightclickc").textContent();
// await expect(text2.includes("You have done a right click")).toBeTruthy();
});

test('Links',async({page})=>{
await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
 await page.locator("//button[normalize-space()='Elements']").click();
await page.locator("//a[normalize-space()='Links']").click();
const [newPage]=await Promise.all([

page.waitForEvent('popup'),
page.locator("//a[normalize-space()='Home']").click()

]);
await newPage.waitForLoadState();
await expect(newPage).toHaveURL("https://www.tutorialspoint.com/index.htm");
await page.goBack();
await expect(page).toHaveURL("https://www.tutorialspoint.com/selenium/practice/slider.php");
});


test('Click all links in a page',async({page})=>{

await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );

  const all_links=await page.locator("//a");
  const countOfLinks=await all_links.count();

  for(let i=0;i<countOfLinks;i++){
    const link=await all_links.nth(i);
    const linkText=await link.textContent();
    console.log(linkText)
    if(linkText.length>0){
      console.log(linkText);
      await Promise.all([
        page.waitForEvent('popup'),
        link.click()
      ]);
      console.log(page.url());
      await page.goBack();
    }
  }
})

test.only('Validate all images on the page', async ({ page }) => {
  // Go to your target page
 await page.goto(
    "https://www.tutorialspoint.com/selenium/practice/slider.php"
  );
  await page.locator("//button[normalize-space()='Elements']").click();
  await page.locator("//a[normalize-space()='Broken Links - Images']").click();
  // Get all image elements
  const images = page.locator('img');
  const count = await images.count();
  console.log(`Found ${count} images`);

  for(let i=0;i<count;i++){
   const img=images.nth(i); 
   const src=img.getAttribute('src')
   const isBroken=await img.evaluate((node)=>{
    return !(node.naturalWidth && node.complete>0)
   })
     if(isBroken){
    console.log(`Image with src ${src} is broken`);
  }
  else{
    console.log(`Image with src ${src} is valid`);
  }
  }



  
});