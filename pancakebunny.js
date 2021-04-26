const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://pancakebunny.finance/pool", {
    waitUntil: "networkidle2",
  });
  await page
    .waitForXPath(
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[1]/div/div[3]/div/div/div/span"
    )
    .then(() => console.log("waited for Rewards value"));

  async function unit_func(tag_path) {
    console.log(tag_path);
    const data = await page.evaluate((e) => {
      const tds = Array.from(document.querySelectorAll(e));
      return tds.map((td) => td.innerText);
    }, tag_path);
    return data;
  }

  const path_array = {
    pool_name: "div.section div div.farms-card-item div.label",
    apy: "div.section div div.farms-card-item div.rates .apy",
    // apr: "div.section div div.farms-card-item div.rates .apr",
    earn: "div.section div div.farms-card-item div.return .value",
    balance: "div.section div div.farms-card-item div.balance .value",
    total_deposit: "div.section div div.farms-card-item div.total .value",
  };

  const keys = Object.keys(path_array);

  let result = {};

  keys.forEach(async (key, index) => {
    result[key] = await unit_func(path_array[key]);
    if (index === keys.length - 1) {
      console.log(result);
    }
  });

  await page.screenshot({ path: "example.png" });
  await browser.close();
})();
