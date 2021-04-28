const puppeteer = require("puppeteer");
const { connection } = require("./db");
const { getColumns } = require("./util");
class Pancakebunny {
  constructor() {
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
      const columns = getColumns(keys);

      let result = {};

      keys.forEach(async (key, index) => {
        result[key] = await unit_func(path_array[key]);
        if (index === keys.length - 1) {
          let values = [];
          for (let i = 0; i < result.apy.length; i++) {
            values.push(
              Array(
                result.pool_name[i].includes("\n")
                  ? result.pool_name[i].replace("\n", "(") + ")"
                  : result.pool_name[i],
                result.apy[i],
                result.earn[i],
                result.balance[i],
                result.total_deposit[i]
              )
            );
          }
          var sql = "INSERT INTO pancakebunny " + columns + " VALUES ?";
          connection.query(sql, [values], function (err) {
            if (err) throw err;
            console.log("pancakebunny successfully inserted");
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
let pan = new Pancakebunny();
module.exports = { Pancakebunny };
