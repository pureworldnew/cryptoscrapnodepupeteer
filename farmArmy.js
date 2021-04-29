const puppeteer = require("puppeteer");
const { connection } = require("./db");
const { getColumns } = require("./util");
class Farmarmy {
  constructor() {
    (async () => {
      const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
      const page = await browser.newPage();
      await page.goto(
        "https://farm.army/0xd17cb65B0eb9B370BFD51a3d249be92cdae0Eeed",
        { waitUntil: "networkidle2" }
      );
      await page
        .waitForXPath(
          "/html/body/main/div[1]/div/div[3]/div[2]/div/div[1]/div/div/div[1]"
        )
        .then(() => console.log("waited for Rewards value"));

      async function unit_func(xpath) {
        let [value] = await page.$x(xpath);
        let values = await page.evaluate((ele) => ele.textContent, value);
        return values;
      }

      const xpath_array = {
        wallet:
          "/html/body/main/div[1]/div/div[3]/div[2]/div/div[1]/div/div/div[1]",
        // pancake: "/html/body/main/div[1]/div/div[5]/div[1]/div[2]/div/span[1]",
        // wallet:
        //   "/html/body/main/div[1]/div/div[3]/div[2]/div/div[1]/div/div/div[1]",
        // reward:
        //   "/html/body/main/div[1]/div/div[3]/div[2]/div/div[2]/div/div/div[1]",
        // vault: "/html/body/main/div[1]/div/div[3]/div[2]/div/div[3]/div/div/div[1]",
        // total: "/html/body/main/div[1]/div/div[3]/div[2]/div/div[4]/div/div/div[1]",
        // cakePercentage:
        //   "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[1]/div[2]/div[2]",
        // cakeUSD:
        //   "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[1]/div[4]/div[1]",
        // cakeUsdBelow:
        //   "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[1]/div[4]/div[2]",
        // cakeSmall:
        //   "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[1]/div[1]",
        // cakeSmallBelow:
        //   "/html/body/main/div[1]/div/div[5]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[1]/div[2]",
        // bdoUsd:
        //   "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[1]/div[4]/div[1]",
        // bdoUsdBelow:
        //   "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[1]/div[4]/div[2]",
        // bdoSmall:
        //   "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div[1]/div[1]",
        // bdoSmallBelow:
        //   "/html/body/main/div[1]/div/div[5]/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div[1]/div[2]",
      };

      const keys = Object.keys(xpath_array);
      const columns = getColumns(keys);
      let result = {};

      keys.forEach(async (key, index) => {
        result[key] = await unit_func(xpath_array[key]);
        if (index === keys.length - 1) {
          console.log(result);
          let values = [];
          values.push(Array(result.wallet));
          var sql = "INSERT INTO farmarmy " + columns + " VALUES ?";
          connection.query(sql, [values], function (err) {
            if (err) throw err;
            console.log("farmarmy successfully inserted");
            connection.end(function (err) {
              if (err) {
                return console.log(err.message);
              }
            });
          });
        }
      });

      await page.screenshot({ path: "example.png" });
      await browser.close();
    })();
  }
}
let farmarmy = new Farmarmy();
module.exports = { Farmarmy };
