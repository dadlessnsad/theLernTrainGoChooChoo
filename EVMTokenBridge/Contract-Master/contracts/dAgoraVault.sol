// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";


contract dAgoraVault is Ownable {
    using EnumerableSet for EnumerableSet.UintSet;
    enum State {
        Standby,
        Transferring,
        Withdrawing
    }

    struct DepositData {
        address _ownerOf;
        uint256 _amount;
        uint256 _nonce;
        State state;
    }

    mapping(address => EnumerableSet.UintSet) private addressDepositId;
    mapping(uint256 => DepositData) private depositState;
    

    constructor () {}


    function Deposit(
        address _sender,
        address _tokenAddress,
        uint256 _amount,
        uint256 _nonce
    )   external 
        onlyOwner 
    {
        require(
            !checkDepositId(_tokenAddress, _nonce),
            "Can re-use Deposit Id"
        );

        addressDepositId[_tokenAddress].add(_nonce);
        depositState[_nonce] = DepositData(
            _sender,
            _amount,
            _nonce,
            State.Transferring
        );

        ERC20 token = ERC20(_tokenAddress);
        token.transferFrom(_sender, address(this), _amount);
    }

    function Withdraw(
        address _sender,
        address _tokenAddress,
        uint256 _nonce
    )   external 
        onlyOwner 
    {
        require(
            checkDepositId(_tokenAddress, _nonce),
            "Can't find Deposit Id"
        );

        DepositData memory data = depositState[_nonce];
        require(data._ownerOf == _sender, "Not token Owner");   
        require(data.state != State.Withdrawing, "Already withdrew");
        require(data._nonce == _nonce, "Wrong nonce");
        
        data.state = State.Withdrawing;
        ERC20 token = ERC20(_tokenAddress);
        token.transfer(_sender, data._amount);
    }

    // returns True or false based on if
    // deposit Id is stored in addresses deposit ids
    function checkDepositId(address _tokenAddress,uint256 _nonce) private view onlyOwner returns(bool) {
        return addressDepositId[_tokenAddress].contains(_nonce);
    }

    //checks set of token address
    //returns bool based on deposit length
    function _isDepositedToVault(address _tokenAddress) external view onlyOwner returns(bool) {
        return addressDepositId[_tokenAddress].length() != 0;
    }
}