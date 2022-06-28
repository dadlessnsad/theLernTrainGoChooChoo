const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ASSOT test", function () {

  let DAGORABRIDGE;
  let bridge;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    DAGORABRIDGE = await ethers.getContractFactory('dAgoraBridge');
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    bridge = await DAGORABRIDGE.deploy();
    await bridge.deployed();

  })

  describe('Deployment', function () {

    it("should set right owner", async function () {
      expect(await bridge.owner()).to.be.equal(owner.address);
    });
  })
})