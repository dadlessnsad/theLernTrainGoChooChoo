const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Network name=",  await ethers.provider.getNetwork());

  const dAgoraBridge = await hre.ethers.getContractFactory("dAgoraBridge");
  const bridge = await dAgoraBridge.deploy();

  await bridge.deployed();

  console.log("dAgoraBridge deployed to:", bridge.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
