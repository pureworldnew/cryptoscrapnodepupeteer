const fetch = require("node-fetch");
const { connection } = require("./db");
class Yieldwatchnet {
  constructor() {
    fetch(
      "https://www.yieldwatch.net/api/all/0xd17cb65B0eb9B370BFD51a3d249be92cdae0Eeed?platforms=beefy,pancake,hyperjump,auto,mdex"
    )
      .then((res) => res.json())
      .then((data) => {
        let yieldWatch = {};
        yieldWatch["watchBalance"] = data.result.watchBalance.USDPrice;
        yieldWatch["walletBalance"] = data.result.walletBalance.totalUSDValue;
        let columns = "(watchBalance,walletBalance)";
        let values = [];
        values.push(
          Array(yieldWatch["watchBalance"], yieldWatch["walletBalance"])
        );
        var sql = "INSERT INTO yieldwatch " + columns + " VALUES ?";
        connection.query(sql, [values], function (err) {
          if (err) throw err;
          console.log("yieldwatch successfully inserted");
          connection.end(function (err) {
            if (err) {
              return console.log(err.message);
            }
          });
        });
      });
  }
}

let yieldwatch = new Yieldwatchnet();
module.exports = { Yieldwatchnet };
