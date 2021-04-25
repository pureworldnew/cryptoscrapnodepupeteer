const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://farm.army/0xd17cb65B0eb9B370BFD51a3d249be92cdae0Eeed",
    { waitUntil: "networkidle2" }
  );
  page
    .waitForXPath(
      "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[1]/div[2]"
    )
    .then(() => console.log("waited for Rewards value"));
  let farmArmy = {};

  let [pancake] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[1]/div[2]/div/span[1]"
  );
  let pancakes = await page.evaluate((ele) => ele.textContent, pancake);

  let [wallet] = await page.$x(
    "/html/body/main/div[1]/div/div[3]/div[2]/div/div[1]/div/div/div[1]"
  );
  let wallets = await page.evaluate((e) => e.textContent, wallet);

  let [reward] = await page.$x(
    "/html/body/main/div[1]/div/div[3]/div[2]/div/div[2]/div/div/div[1]"
  );
  let rewards = await page.evaluate((e) => e.textContent, reward);

  let [vault] = await page.$x(
    "/html/body/main/div[1]/div/div[3]/div[2]/div/div[3]/div/div/div[1]"
  );
  let vaults = await page.evaluate((e) => e.textContent, vault);

  let [total] = await page.$x(
    "/html/body/main/div[1]/div/div[3]/div[2]/div/div[4]/div/div/div[1]"
  );
  let totals = await page.evaluate((e) => e.textContent, total);

  let [cakePercentage] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[1]/div[2]/div[2]"
  );
  let cakePercentages = await page.evaluate(
    (e) => e.textContent,
    cakePercentage
  );

  let [cakeUSD] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[1]/div[4]/div[1]"
  );
  let cakeUSDs = await page.evaluate((e) => e.textContent, cakeUSD);

  let [cakeUsdBelow] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[1]/div[4]/div[2]"
  );
  let cakeUsdBelows = await page.evaluate((e) => e.textContent, cakeUsdBelow);

  let [cakeSmall] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[1]/div[1]"
  );
  let cakeSmalls = await page.evaluate((e) => e.textContent, cakeSmall);

  let [cakeSmallBelow] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[1]/div[2]"
  );
  let cakeSmallBelows = await page.evaluate(
    (e) => e.textContent,
    cakeSmallBelow
  );

  let [bdoUsd] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[1]/div[4]/div[1]"
  );
  let bdoUSDs = await page.evaluate((e) => e.textContent, bdoUsd);

  let [bdoUsdBelow] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[1]/div[4]/div[2]"
  );
  let bdoUsdBelows = await page.evaluate((e) => e.textContent, bdoUsdBelow);

  let [bdoSmall] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div[1]/div[1]"
  );
  let bdoSmalls = await page.evaluate((e) => e.textContent, bdoSmall);

  let [bdoSmallBelow] = await page.$x(
    "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div[1]/div[2]"
  );
  let bdoSmallBelows = await page.evaluate((e) => e.textContent, bdoSmallBelow);

  farmArmy["bdoSmallBelow"] = bdoSmallBelows;
  farmArmy["bdoSmall"] = bdoSmalls;
  farmArmy["bdoUsdBelow"] = bdoUsdBelows;
  farmArmy["bdoUSD"] = bdoUSDs;
  farmArmy["cakeSmallBelow"] = cakeSmallBelows;
  farmArmy["cakeSmall"] = cakeSmalls;
  farmArmy["cakeUSDBelow"] = cakeUsdBelows;
  farmArmy["cakeUSD"] = cakeUSDs;
  farmArmy["cakePercentage"] = cakePercentages.replace(/\r?\n|\r/g, " ").trim();
  farmArmy["Total"] = totals;
  farmArmy["Rewards"] = rewards;
  farmArmy["Pancake"] = pancakes;
  farmArmy["Wallet"] = wallets;
  farmArmy["Vaults"] = vaults;
  console.log(farmArmy);
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
