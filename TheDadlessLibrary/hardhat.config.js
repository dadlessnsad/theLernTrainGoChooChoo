require('solidity-coverage')
require("@nomiclabs/hardhat-waffle");
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const { expect } = require("chai");
const { DEPLOYER_PRIVATE_KEY, INFURA_PROJECT_ID, ETHERSCAN_API_KEY } = process.env;  


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    // rinkeby: {
    //   url: INFURA_PROJECT_ID,
    //   accounts: [`${DEPLOYER_PRIVATE_KEY}`]
    // }
  },
  solidity: "0.8.4",
  settings: {
    optimizer: {
      enabled: true,
      runs: 999
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
