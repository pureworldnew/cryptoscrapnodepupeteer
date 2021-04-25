const fetch = require("node-fetch");

fetch(
  "https://www.yieldwatch.net/api/all/0xd17cb65B0eb9B370BFD51a3d249be92cdae0Eeed?platforms=beefy,pancake,hyperjump,auto,mdex"
)
  .then((res) => res.json())
  .then((data) => {
    let yieldWatch = {};
    yieldWatch["walletBalance"] = data.result.walletBalance;
    yieldWatch["PancakeSwap_LPStaking_totalUSDValues"] =
      data.result.PancakeSwap.LPStaking.totalUSDValues;
    yieldWatch["PancakeSwap_LPStaking_vaults"] =
      data.result.PancakeSwap.LPStaking.vaults;
    yieldWatch["PancakeSwap_LPStaking_vaults_LPInfo"] =
      data.result.PancakeSwap.LPStaking.vaults[0].LPInfo;
    yieldWatch["PancakeSwap_staking_totalUSDValues"] =
      data.result.PancakeSwap.staking.totalUSDValues;
    yieldWatch["PancakeSwap_staking_vaults"] =
      data.result.PancakeSwap.staking.vaults;
    yieldWatch["PancakeSwap_staking_vaults_LPInfo"] =
      data.result.PancakeSwap.staking.vaults[0].LPInfo;
    yieldWatch["watchBalance"] = data.result.watchBalance;
    console.log(yieldWatch);
  });
