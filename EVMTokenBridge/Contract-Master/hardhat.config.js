require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require("solidity-coverage");
require('dotenv').config();

const { DEPLOYER_PRIVATE_KEY, INFURA_PROJECT_ID, ETHERSCAN_API_KEY, COIN_MARKET_CAP_KEY, POLYSCAN_API_KEY, OPKOVAN_API_KEY, ARBRINKEBY_API_KEY } = process.env;  



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
        // mainnet: {
        //   url: INFURA_PROJECT_ID,
        //   accounts: [`${DEPLOYER_PRIVATE_KEY}`]
        // },
        rinkeby: {
            url:`https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`${DEPLOYER_PRIVATE_KEY}`]
        },
        ropsten: {
            url:`https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`${DEPLOYER_PRIVATE_KEY}`]
        },
        kovan: {
            url:`https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`${DEPLOYER_PRIVATE_KEY}`]
        },
        goerli: {
            url:`https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`${DEPLOYER_PRIVATE_KEY}`]
        },
        optimismKovan: {
            url: `https://optimism-kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`${DEPLOYER_PRIVATE_KEY}`]
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`${DEPLOYER_PRIVATE_KEY}`]
        },
        arbRinkeby: {
            url: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`${DEPLOYER_PRIVATE_KEY}`]
        }
    },

    solidity: "0.8.13",
    settings: {
        optimizer: {
            enabled: true,
            runs: 999
        }
    },
    gasReporter: {
        currency: 'USD',
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        coinmarketcap: COIN_MARKET_CAP_KEY,
        gasPrice: 68
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: {
            rinkeby: ETHERSCAN_API_KEY,
            goerli: ETHERSCAN_API_KEY,
            ropsten: ETHERSCAN_API_KEY,
            kovan: ETHERSCAN_API_KEY,
            optimisticKovan: OPKOVAN_API_KEY,
            polygonMumbai: POLYSCAN_API_KEY,
            arbitrumTestnet: ARBRINKEBY_API_KEY
          }
    }

};
