require("dotenv").config();
let mysql = require("mysql2");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "cryptoscrap",
});

// connect to the MySQL server
connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("DB connected successfully");

  //pancakebunny
  //[ 'pool_name', 'apy', 'earn', 'balance', 'total_deposit', 'created_at' ]
  let createPancakebunny = `create table if not exists pancakebunny(
                          id int primary key auto_increment,
                          pool_name varchar(255),
                          apy varchar(255),
                          earn varchar(255),
                          balance varchar(255),
                          total_deposit varchar(255),
                          created_at DATETIME default CURRENT_TIMESTAMP
                      )`;

  connection.query(createPancakebunny, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  //farmyArmy
  //[
  //   'pancake',   'wallet',
  //   'reward',    'vault',
  //   'total',     'cakePercentage',
  //   'cakeUSD',   'cakeUsdBelow',
  //   'cakeSmall', 'cakeSmallBelow',
  //   'bdoUsd',    'bdoUsdBelow',
  //   'bdoSmall',  'bdoSmallBelow'
  // ]

  // pancake varchar(255),
  // wallet varchar(255),
  // reward varchar(255),
  // vault varchar(255),
  // total varchar(255),
  // cakePercentage varchar(255),
  // cakeUSD varchar(255),
  // cakeUsdBelow varchar(255),
  // cakeSmall varchar(255),
  // cakeSmallBelow varchar(255),
  // bdoUsd varchar(255),
  // bdoUsdBelow varchar(255),
  // bdoSmall varchar(255),
  // bdoSmallBelow varchar(255),
  let createFarmArmy = `create table if not exists farmarmy(
                          id int primary key auto_increment,
                          wallet varchar(255),
                          created_at DATETIME default CURRENT_TIMESTAMP
                      )`;
  connection.query(createFarmArmy, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  //alpacafinance
  // [
  //   'swap_name',
  //   'apy_leverage',
  //   'apy_base',
  //   'yield_farming',
  //   'trading_fees',
  //   'Alpaca_rewards',
  //   'borrowing_interest',
  //   'Total_APR',
  //   'leverage_value'
  // ]
  let createAlpacaFinance = `create table if not exists alpacafinance(
                          id int primary key auto_increment,
                          swap_name varchar(255),
                          apy_leverage varchar(255),
                          apy_base varchar(255),
                          yield_farming varchar(255),
                          trading_fees varchar(255),
                          Alpaca_rewards varchar(255),
                          borrowing_interest varchar(255),
                          Total_APR varchar(255),
                          leverage_value varchar(255),
                          created_at DATETIME default CURRENT_TIMESTAMP
                        )`;

  connection.query(createAlpacaFinance, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  //pancakeswapfinance
  // [
  //   'total_jackpot_this_round',
  //   'total_jackpot_this_round_dollar',
  //   'earn_up_to_in_farms',
  //   'lottery_with_up_for_grabs',
  //   'total_cake_supply',
  //   'total_cake_burned',
  //   'new_cake_block',
  //   'total_value_locked_tvl'
  // ]
  let createPancakeswapfinance = `create table if not exists pancakeswapfinance(
    id int primary key auto_increment,
    total_jackpot_this_round varchar(255),
    total_jackpot_this_round_dollar varchar(255),
    earn_up_to_in_farms varchar(255),
    lottery_with_up_for_grabs varchar(255),
    total_cake_supply varchar(255),
    total_cake_burned varchar(255),
    new_cake_block varchar(255),
    total_value_locked_tvl varchar(255),
    created_at DATETIME default CURRENT_TIMESTAMP
  )`;

  connection.query(createPancakeswapfinance, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  //Yieldwatch net
  // { watchBalance: 1.4833161325670297, walletBalance: 40951.78425227338 }
  let createYieldwatch = `create table if not exists yieldwatch(
    id int primary key auto_increment,
    watchBalance varchar(255),
    walletBalance varchar(255),
    created_at DATETIME default CURRENT_TIMESTAMP
  )`;
  connection.query(createYieldwatch, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
});

module.exports = { connection };
