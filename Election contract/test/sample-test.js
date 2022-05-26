const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {

  let TheElections;
  let election;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    TheElections = await ethers.getContractFactory("USElection");
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    election = await TheElections.deploy( );
    await election.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await election.owner()).to.equal(owner.address);
    });

    it('should not allow random user to submit resuls', async function () {
      const tuple = ["California",1000,900,32]
      expect(election.connect(addr2).submitStateResult(tuple)).to.be.reverted
    })

    it('should not allow random user to end election', async function () {
      expect(election.connect(addr2).endElection()).to.be.reverted
    })

    it('should submit results of california', async function () {
      const tuple = ["California",1000,1900,32]
      const cali = await election.submitStateResult(tuple)
      console.log(cali)

      expect(await election.currentLeader()).to.equal(2)
    })

    it('should submit results of 2 states and end election', async function () {
      const caliVotes = ["California",1000,900,32]
      const caliSubmit = await election.submitStateResult(caliVotes)
      const nevadaVotes = ["Nevada",100,900,22]
      const nevadaSubmit = await election.submitStateResult(nevadaVotes)

      const check = await election.currentLeader()
      console.log(check)

      const end = election.connect(owner).endElection()

      expect(await election.currentLeader()).to.equal(1)
      expect(await election.electionEnded()).to.equal(true)

    }) 

  })
});
