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

  async function unit_func(xpath) {
    let [value] = await page.$x(xpath);
    let values = await page.evaluate((ele) => ele.textContent, value);
    return values;
  }
  const xpath_array = {
    total_depostied_value_bunnys:
      "/html/body/div/div[3]/div[1]/div[1]/div/div/div/div[1]/div[1]/span[1]",
    bunny_market_caps:
      "/html/body/div/div[3]/div[1]/div[1]/div/div/div/div[1]/div[2]/span[1]",
    monthly_profits_to_bunnylovers:
      "/html/body/div/div[3]/div[1]/div[1]/div/div/div/div[1]/div[3]/span[1]",
    top_dollar: "/html/body/div/div[2]/div/div/div[3]/div[1]",
    active_pools: "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/span",
    bunny_boost_APY:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[1]/div/div[3]/div/div/div/span",
    bunny_boost_APR:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[1]/div/div[3]/span[1]",
    bunny_boost_total_deposit:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[1]/div/div[6]/span[2]",
    bunny_APY:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[2]/div/div[3]/div/div/div/span",
    bunny_APR:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[2]/div/div[3]/span[1]",
    bunny_total_deposit:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[2]/div/div[6]/span[2]",
    cake_APR:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[3]/div/div[3]/span[1]",
    cake_total_deposit:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[3]/div/div[6]/span[2]",
    rnb_APR:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[4]/div/div[3]/span[1]",
    rnb_total_deposit:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[4]/div/div[6]/span[2]",
    eth_APR:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[5]/div/div[3]/span[1]",
    eth_total_deposit:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[5]/div/div[6]/span[2]",
    rtcb_APR:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[6]/div/div[3]/span[1]",
    rtcb_total_deposit:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[6]/div/div[6]/span[2]",
    usdt_APR:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[7]/div/div[3]/span[1]",
    usdt_total_deposit:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[7]/div/div[6]/span[2]",
    busd_APR:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[8]/div/div[3]/span[1]",
    busd_total_deposit:
      "/html/body/div/div[3]/div[1]/div[2]/div/div/div/div[2]/div[8]/div/div[6]/span[2]",
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
