// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./dAgoraToken.sol";

contract dAgoraFactory is Ownable {

    //Wraped token address to original address
    mapping(address => address) public originAddressToWrappedAddress;
    //Used to store already wrapped tokens
    mapping(address => dAgoraToken) public wrappedTokens;
    uint256 private tokenIndex = 1;

    function WrapMint(
        address _sender,
        address _tokenAddress,
        uint256 _amount
    )   external 
        onlyOwner 
    {
        //addddd requires
        dAgoraToken token = _createWrappedToken(_tokenAddress);
        token.WrapMint(_sender, _amount);
    }

    function WrapBurn(
        address _sender,
        address _tokenAddress,
        uint256 _amount
    )   external 
        onlyOwner 
    {
        ///// addd requiresssss
        dAgoraToken token = dAgoraToken(_tokenAddress);
        token.WrapBurn(_sender, _amount);

    }

    function _createWrappedToken(address _tokenAddress) private returns(dAgoraToken) {
        dAgoraToken token;
        address currentWrappedTkAddr = getWrappedToken(_tokenAddress);
        if( currentWrappedTkAddr != address(0)) {
            token = dAgoraToken(_tokenAddress);
        }   else {
            token = new dAgoraToken(
                getNameForWrappedToken(_tokenAddress),
                getSymbolForWrappedToken(_tokenAddress),
                _tokenAddress
            );
            currentWrappedTkAddr = address(token);
        }
        wrappedTokens[currentWrappedTkAddr] = token;
        originAddressToWrappedAddress[_tokenAddress] = currentWrappedTkAddr;
        tokenIndex++;

        return token;
    }

    function isWrappedToken(address _tokenAddress) public view returns(bool) {
        return address(wrappedTokens[_tokenAddress]) != address(0);
    }


    function getWrappedToken(address _tokenAddress) public view returns(address) {
        return originAddressToWrappedAddress[_tokenAddress];
    }

    function getNameForWrappedToken(address _tokenAddress) private view returns (string memory) {
        string memory tokenName = ERC20(_tokenAddress).name();
        return string(abi.encodePacked("d", tokenName));
    }

    function getSymbolForWrappedToken(address _tokenAddress) private view returns (string memory) {
        string memory tokenSymbol = ERC20(_tokenAddress).symbol();
        return string(abi.encodePacked("d", tokenSymbol));
    }



}