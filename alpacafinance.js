const puppeteer = require("puppeteer");
const { connection } = require("./db");
const { getColumns } = require("./util");
class Alpacafinance {
  constructor() {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://app.alpacafinance.org/farm", {
        waitUntil: "networkidle2",
      });
      await page
        .waitForXPath(
          "/html/body/div/div/section/section/section/main/div[1]/div[4]/div/div[3]/div/div[3]/div/div/div/div/div/div/table/tbody/tr[2]/td[3]/div/div[2]"
        )
        .then(() => console.log("waited for Rewards value"));

      async function unit_func(tag_path) {
        const data = await page.evaluate((e) => {
          const tds = Array.from(document.querySelectorAll(e));
          return tds.map((td) => td.innerText);
        }, tag_path);
        return data;
      }

      const path_array = {
        swap_name:
          "table tbody tr td:nth-child(2) .c-lpPoolName--value:nth-child(2)",
        apy_leverage: "table tbody tr td:nth-child(3) .c-apy--leverage",
        apy_base: "table tbody tr td:nth-child(3) .c-apy--base",
        yield_farming:
          "table tbody tr td:nth-child(4) div div:nth-child(1) .c-yeild--value",
        trading_fees:
          "table tbody tr td:nth-child(4) div div:nth-child(2) .c-yeild--value",
        Alpaca_rewards:
          "table tbody tr td:nth-child(4) div div:nth-child(3) .c-yeild--value",
        borrowing_interest:
          "table tbody tr td:nth-child(4) div div:nth-last-child(2) .c-yeild--value",
        // Itam_rewards:
        //   "table tbody tr td:nth-child(4) div div:nth-child(5) .c-yeild--value",
        Total_APR:
          "table tbody tr td:nth-child(4) div div:last-child .c-yeild--value",
        leverage_value:
          "table tbody tr td:nth-child(5) div div:first-child div:nth-child(2) div div",
      };
      const keys = Object.keys(path_array);
      const columns = getColumns(keys);

      let result = {};

      keys.forEach(async (key, index) => {
        result[key] = await unit_func(path_array[key]);
        if (index === keys.length - 1) {
          let values = [];
          for (let i = 0; i < result.swap_name.length; i++) {
            values.push(
              Array(
                result.swap_name[i],
                result.apy_leverage[i],
                result.apy_base[i],
                result.yield_farming[i],
                result.trading_fees[i],
                result.Alpaca_rewards[i],
                result.borrowing_interest[i],
                result.Total_APR[i],
                result.leverage_value[i]
              )
            );
          }
          var sql = "INSERT INTO alpacafinance " + columns + " VALUES ?";
          connection.query(sql, [values], function (err) {
            if (err) throw err;
            console.log("alpacafinance successfully inserted");
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
let alpacafinance = new Alpacafinance();
module.exports = { Alpacafinance };
