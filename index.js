const puppeteer = require("puppeteer");
const { connection } = require("./db");

(async () => {
  let browser = await puppeteer.launch();

  const { Pancakebunny } = require("./pancakebunny");
  const pancakebunny = await new Pancakebunny(connection).getResult();

  // const { Pancakeswapfinance } = require("./pancakeswapfinance");
  // const pancakeswapfinance = new Pancakeswapfinance(browser);

  // const { Farmarmy } = require("./farmArmy");
  // const farmarmy = new Farmarmy(browser);

  const { Yieldwatchnet } = require("./yieldwatchnet");
  const yieldwatch = new Yieldwatchnet(connection);

  // const { Alpacafinance } = require("./alpacafinance");
  // const alpacafinance = new Alpacafinance(browser);

  await browser.close();
  await connection.end(function (err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("connection end of Database");
  });
})();
