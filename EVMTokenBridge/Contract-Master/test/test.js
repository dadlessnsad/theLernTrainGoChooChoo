const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { utils } = require("ethers");
const { keccak256 } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

function message(tokenAddress, amount, nonce) {
    var data = utils.solidityPack([
        "address",
        "uint256",
        "uint256"
    ], [
        tokenAddress,
        amount,
        nonce
    ]);
    return utils.arrayify(utils.keccak256(data));
}

function createRandomNonce() {
    return BigNumber.from(utils.randomBytes(32));
}

console.log('nonce: ', createRandomNonce())

describe("dAgora Bridge test", function () {

    let DAGORABRIDGE;
    let DAGORATOKEN;
    let bridge;
    let token;
    let tokenAddress
    let owner;
    let signer
    let addr1;
    let addr2;
    let addr3;

    //const nonce = _nonce()


    beforeEach(async function () {
      // Get the contract instance of test erc20 token

        DAGORATOKEN = await ethers.getContractFactory('Token', signer);
        [signer, owner, addr1, addr2, addr3] = await ethers.getSigners();
        dAtoken = await DAGORATOKEN.deploy();
        await dAtoken.deployed();
        const getTokens = await dAtoken.giveMehTokens();


        DAGORABRIDGE = await ethers.getContractFactory('dAgoraBridge', signer);

        bridge = await DAGORABRIDGE.deploy();
        await bridge.deployed();

        vaultAddr = await bridge.getVaultContract();
        tokenAddress = dAtoken.address;
        const unPause = await bridge.connect(signer).unPause();

        const approveTx = await dAtoken.approve(vaultAddr, 1000);
        await approveTx.wait();
        const minttoken = await dAtoken.connect(addr1).giveMehTokens();
        const approveTx1 = await dAtoken.connect(addr1).approve(vaultAddr, 1000);
        await approveTx1.wait();
    })

    describe('Deployment of Dagora Bridge', function () {
        it("Should fail if contract is paused", async function () {
            const unPause = await bridge.connect(signer).pause();

            const nonce = createRandomNonce();
            const _message = message(vaultAddr, 1000, nonce);
            const signature = await signer.signMessage(_message);


            expect(bridge.connect(signer).Deposit(
                tokenAddress,
                1,
                nonce,
                signature
            )).to.be.revertedWith("Contract is paused");
        }),
        
        it("Should allow user to deposit", async function () {
            const _nonce = createRandomNonce()
            console.log("Token Balance Beggining: ", await dAtoken.balanceOf(addr1.address));
            const _message = message(vaultAddr, 1000, _nonce);

            const signature = await addr1.signMessage(_message);
            console.log('signature: ', signature)

            const tx = await bridge.connect(addr1).Deposit(
                tokenAddress,
                1000,
                _nonce,
                signature,
                { value: ethers.utils.parseEther("0.001") }
            )
            console.log('tx.hash: ', tx.hash)
            const receipt = await tx.wait();
            expect(receipt.status).to.be.equal(1);
            console.log("Token Balance After: ", await dAtoken.balanceOf(addr1.address));
        }),

        it("Should fail if fee not sent", async function () {
            const _nonce = createRandomNonce();
            const _message = message(vaultAddr, 1000, _nonce);
            const signature = await signer.signMessage(_message);
            
            expect(bridge.connect(signer).Deposit(
                tokenAddress,
                1000,
                _nonce,
                signature
            )).to.be.revertedWith("Not enough Ether to cover bridge fee");
        }),

        it("Should let user withdraw ", async function () {
            const _nonce = createRandomNonce()
        
            const _message = message(vaultAddr, 1000, _nonce);
            const signature = await addr1.signMessage(_message);
            const withdraw = await bridge.connect(addr1).withdraw(
                tokenAddress,
                1000,
                _nonce,
                signature,
            )
            console.log("withdraw: ", withdraw)
            const receipt = await withdraw.wait();
            expect(receipt.status).to.be.equal(1);
        })

        it("Should fail if user tries to withdraw twice", async function () {
            const _nonce = createRandomNonce()
            const _message = message(vaultAddr, 1000, _nonce);
            const signature = await addr1.signMessage(_message);
            const withdraw = await bridge.connect(addr1).withdraw(
                tokenAddress,
                1000,
                _nonce,
                signature,
            )
            console.log("withdraw: ", withdraw)
            const receipt = await withdraw.wait();
            expect(receipt.status).to.be.equal(1);
            expect(bridge.connect(addr1).withdraw(
                tokenAddress,
                1000,
                _nonce,
                signature,
            )).to.be.revertedWith("User has already withdrawn");
        })
        
        it("Should transfer and withdraw for user", async function () {
            const _nonce = createRandomNonce()
            const _message = message(vaultAddr, 10, _nonce);
            const signature = await addr1.signMessage(_message);

            //addr1 balance 2500
            const deposit = await bridge.connect(addr1).Deposit(
                tokenAddress,
                10,
                _nonce,
                signature,
                { value: ethers.utils.parseEther("0.001") }
            )
            const depositReceipt = await deposit.wait();
            expect(depositReceipt.status).to.be.equal(1);
            expect(await dAtoken.balanceOf(addr1.address)).to.be.equal(2490);

            const withdraw = await bridge.connect(addr1).withdraw(
                tokenAddress,
                10,
                _nonce,
                signature
            )
            const withdrawReceipt = await withdraw.wait();
            expect(withdrawReceipt.status).to.be.equal(1);
            expect(await dAtoken.balanceOf(addr1.address)).to.be.equal(2500);
        })
        
        it("Should Do full token movement flow ", async function () {
            const userAddress = await addr1.getAddress();


            const _nonce = createRandomNonce()
            const _message = message(vaultAddr, 10, _nonce);
            const signature = await addr1.signMessage(_message);
            const vaultAddress = await bridge.getVaultContract();

            //Claiming bridged tokens
            const claiming = await bridge.connect(addr1).withdraw(
                tokenAddress,
                10,
                _nonce,
                signature
            )
            const claimingReceipt = await claiming.wait();
            expect(claimingReceipt.status).to.be.equal(1);

            const dAgoraTokenAddress = await bridge.getdAgoraToken(tokenAddress)
            const dAgoraTokenFacoty = await ethers.getContractFactory('dAgoraToken');
            const dAgoraToken = dAgoraTokenFacoty.attach(dAgoraTokenAddress);

            //console.log("dAgoraToken: ", dAgoraToken)
            console.log('hello whore')

            
            //Burning bridge tokens
            const burning = await bridge.connect(addr1).Deposit(
                dAgoraToken.address,
                10,
                _nonce,
                signature,
                { value: ethers.utils.parseEther("0.001") }
            )

            const burningReceipt = await burning.wait();
            expect(burningReceipt.status).to.eq(1)
            expect(await dAgoraToken.balanceOf(addr1.address)).to.eq(0)
        })
    })
})  