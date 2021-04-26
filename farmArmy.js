const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://farm.army/0xd17cb65B0eb9B370BFD51a3d249be92cdae0Eeed",
    { waitUntil: "networkidle2" }
  );
  await page
    .waitForXPath(
      "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[1]/div[2]"
    )
    .then(() => console.log("waited for Rewards value"));

  async function unit_func(xpath) {
    let [value] = await page.$x(xpath);
    let values = await page.evaluate((ele) => ele.textContent, value);
    return values;
  }

  const xpath_array = {
    pancake: "/html/body/main/div[1]/div/div[5]/div[1]/div[2]/div/span[1]",
    wallet:
      "/html/body/main/div[1]/div/div[3]/div[2]/div/div[1]/div/div/div[1]",
    reward:
      "/html/body/main/div[1]/div/div[3]/div[2]/div/div[2]/div/div/div[1]",
    vault: "/html/body/main/div[1]/div/div[3]/div[2]/div/div[3]/div/div/div[1]",
    total: "/html/body/main/div[1]/div/div[3]/div[2]/div/div[4]/div/div/div[1]",
    cakePercentage:
      "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[1]/div[2]/div[2]",
    cakeUSD:
      "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[1]/div[4]/div[1]",
    cakeUsdBelow:
      "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[1]/div[4]/div[2]",
    cakeSmall:
      "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[1]/div[1]",
    cakeSmallBelow:
      "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[1]/div[2]",
    bdoUsd:
      "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[1]/div[4]/div[1]",
    bdoUsdBelow:
      "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[1]/div[4]/div[2]",
    bdoSmall:
      "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div[1]/div[1]",
    bdoSmallBelow:
      "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div[1]/div[2]",
  };

  const keys = Object.keys(xpath_array);
  let result = {};

  keys.forEach(async (key, index) => {
    result[key] = await unit_func(xpath_array[key]);
    if (index === keys.length - 1) {
      console.log(result);
    }
  });

  await page.screenshot({ path: "example.png" });
  await browser.close();
})();
