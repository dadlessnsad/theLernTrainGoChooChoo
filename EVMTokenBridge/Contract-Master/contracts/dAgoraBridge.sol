// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import './dAgoraVault.sol';
import './dAgoraFactory.sol';

contract dAgoraBridge is Ownable, ReentrancyGuard {

    enum State {
        Standby,
        Transferring,
        Withdrawing
    }


    bool public paused;
    uint256 public bridgeFee;
    uint256 private _nonceCount;

    dAgoraVault private vault;
    dAgoraFactory private factory;


    mapping(uint256 => State) private nonceState;

    event Transfer(address _sender, address _tokenAddress, uint256 _amount, uint256 _nonce);
    event Withdraw(address _tokenAddress, uint256 _amount, uint256 _nonce);

    constructor() {}

    modifier isPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    //used to store ERC20 in vault contract
    //and emit a event for receiving chain
    //mint equivalent amount.
    function Deposit(
        address _tokenAddress,
        uint256 _amount,
        uint256 _nonce,
        bytes calldata _signature
    )   public
        payable 
        isPaused
    {
        require(msg.value >= bridgeFee, "Not enough Ether to cover bridge fee");
        require(_amount > 0, "Cant bridge 0 tokens");
        require(nonceState != State.Transferring, "Transfer steps already complete");

        _nonceCount++;

    }

    //After burning wrapped tokens a equivalent
    //amount will be released from the vault
    function claim() public payable isPaused {}

    //Changes paused state to True
    function pause() external onlyOwner {
        paused = true;
    }

    //Changes paused state to False
    function unPause() external onlyOwner {
        paused = false;
    }
    
    function setNewBridgeFees(uint256 _newBridgeFee) external onlyOwner {
        bridgeFee = _newBridgeFee;
    }

    //Helper relay function to check is a token has a wrapped address already
    function isWrappedToken(address _tokenAddress) private view returns (bool) {
        return factory.isWrappedToken(_tokenAddress);
    }

    //returns the current nonce from mappings
    function getCurrentNonce() public view returns (uint256) {
        return _nonceCount;
    }

    function getVaultContract() public view returns (address) {}

    //Helper relay function to check if token address has stored 
    //Deposti Id
    function isDeposited(address _tokenAddress) private view returns (bool) {
        vault._isDeposited(_tokenAddress);
    }
}