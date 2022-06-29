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
    address private signer;
    uint256 public bridgeFee;
    uint256 private _nonceCount;

    dAgoraVault private vault;
    dAgoraFactory private factory;

    mapping(uint256 => State) private nonceState;

    event Transfer(address _sender, address _tokenAddress, uint256 _amount, uint256 _nonce);
    event Withdraw(address _tokenAddress, uint256 _amount, uint256 _nonce);

    constructor() Ownable() ReentrancyGuard() {
        paused = true;
        factory = new dAgoraFactory();
        vault = new dAgoraVault();
        bridgeFee = 0.001 ether;
    }

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
        bytes memory _signature
    )   public
        payable 
        isPaused
        nonReentrant
    {
        require(msg.value >= bridgeFee, "Not enough Ether to cover bridge fee");
        require(_amount > 0, "Cant bridge 0 tokens");
        require(nonceState[_nonce] != State.Transferring, "Transfer steps already complete");
        nonceState[_nonce] = State.Transferring;

        bytes32 message = prefixed(keccak256(abi.encodePacked(
            address(vault),
            _amount,
            _nonce
        )));

        require(
            recoverSigner(message, _signature) == msg.sender,
            "Invalid signature"
        );

        if(factory.isdAgoraToken(_tokenAddress)) {
            //Burn/Unwrap token 
            factory.WrapBurn(msg.sender, _tokenAddress, _amount);
        }   else {
            //Vault deposit
            vault.Deposit(msg.sender, _tokenAddress, _amount, _nonce);
        }

        //vault.Deposit(msg.sender, _tokenAddress, _amount, _nonce);
        emit Transfer(msg.sender, _tokenAddress, _amount, _nonce);
    }

    //After burning wrapped tokens a equivalent
    //amount will be released from the vault
    function withdraw(
        address _tokenAddress,
        uint256 _amount,
        uint256 _nonce,
        bytes memory _signature
    )   public 
        payable 
        nonReentrant
        isPaused 
    {
        require(_amount > 0, "cant claim 0");
        require(
            nonceState[_nonce] != State.Withdrawing,
            "Nonce already withdrew"
        );
        nonceState[_nonce] = State.Withdrawing;


        bytes32 message = prefixed(keccak256(abi.encodePacked(
            address(vault),
            _amount,
            _nonce
        )));

        require(
            recoverSigner(message, _signature) == msg.sender,
            "Invalid signature"
        );

        if (vault._isDepositedToVault(_tokenAddress)) {
            vault.Withdraw(msg.sender, _tokenAddress, _nonce);
        }   else {
            factory.WrapMint(msg.sender, _tokenAddress, _amount);
        }

        emit Withdraw(_tokenAddress, _amount, _nonce);
    }

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

    function setNewSigner(address _newSigner) external onlyOwner {
        signer = _newSigner;
    }

    function getVaultContract() 
        external 
        view 
        returns (address) 
    {
        return address(vault);
    }

    function getdAgoraToken(
        address _tokenAddress
    ) 
        public 
        view 
        returns(address) 
    {
        return factory.getdAgoraToken(_tokenAddress);
    }    
    //returns the current nonce from mappings
    function getCurrentNonce() public view returns (uint256) {
        return _nonceCount;
    }


    function prefixed(bytes32 _hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(
            '\x19Ethereum Signed Message:\n32',
            _hash
        ));
    }

    function recoverSigner(bytes32 _message, bytes memory _sig) 
        internal 
        pure
        returns (address)
    {
        uint8 v;
        bytes32 r;
        bytes32 s;
        (v,r,s) = splitSignature(_sig);
        return ecrecover(_message, v,r,s);
    }

    function splitSignature(bytes memory _sig) 
        internal
        pure
        returns(uint8, bytes32, bytes32)
    {
        require(_sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(_sig, 32))
            s := mload(add(_sig, 64))
            v := byte(0, mload(add(_sig, 96)))
        }

        return (v,r,s);
    }



}

