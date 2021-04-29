const puppeteer = require("puppeteer");
const { connection } = require("./db");
const { getColumns } = require("./util");

class Pancakeswapfinance {
  constructor() {
    (async () => {
      const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
      const page = await browser.newPage();
      await page.goto("https://pancakeswap.finance/", {
        waitUntil: "networkidle2",
      });
      await page
        .waitForXPath(
          "/html/body/div/div[1]/div/div[2]/div[2]/div[2]/div[1]/div[2]/div/div[2]/div[3]"
        )
        .then(() => console.log("waited for Rewards value"));

      async function unit_func(xpath) {
        let [value] = await page.$x(xpath);
        let values = await page.evaluate((ele) => ele.textContent, value);
        return values;
      }

      const xpath_array = {
        total_jackpot_this_round:
          "/html/body/div/div[1]/div/div[2]/div[2]/div[2]/div[1]/div[2]/div/div[2]/div[2]",
        total_jackpot_this_round_dollar:
          "/html/body/div/div[1]/div/div[2]/div[2]/div[2]/div[1]/div[2]/div/div[2]/div[3]",
        earn_up_to_in_farms:
          "/html/body/div/div[1]/div/div[2]/div[2]/div[2]/div[2]/div[1]/div/h2[2]",
        lottery_with_up_for_grabs:
          "/html/body/div/div[1]/div/div[2]/div[2]/div[2]/div[2]/div[3]/div/h2[2]",
        total_cake_supply:
          "/html/body/div/div[1]/div/div[2]/div[2]/div[2]/div[3]/div[1]/div/div[1]/div[2]",
        total_cake_burned:
          "/html/body/div/div[1]/div/div[2]/div[2]/div[2]/div[3]/div[1]/div/div[2]/div[2]",
        new_cake_block:
          "/html/body/div/div[1]/div/div[2]/div[2]/div[2]/div[3]/div[1]/div/div[3]/div[2]",
        total_value_locked_tvl:
          "/html/body/div/div[1]/div/div[2]/div[2]/div[2]/div[3]/div[2]/div/h2[2]",
      };

      const keys = Object.keys(xpath_array);
      const columns = getColumns(keys);
      console.log(columns);
      let result = {};

      keys.forEach(async (key, index) => {
        result[key] = await unit_func(xpath_array[key]);
        if (index === keys.length - 1) {
          let values = [];
          console.log(result);
          values.push(
            Array(
              result["total_jackpot_this_round"],
              result["total_jackpot_this_round_dollar"],
              result["earn_up_to_in_farms"],
              result["lottery_with_up_for_grabs"],
              result["total_cake_supply"],
              result["total_cake_burned"],
              result["new_cake_block"],
              result["total_value_locked_tvl"]
            )
          );
          var sql = "INSERT INTO pancakeswapfinance " + columns + " VALUES ?";
          connection.query(sql, [values], function (err) {
            if (err) throw err;
            console.log("pancakeswapfinance successfully inserted");
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

let pancakeswapfinance = new Pancakeswapfinance();
module.exports = { Pancakeswapfinance };
