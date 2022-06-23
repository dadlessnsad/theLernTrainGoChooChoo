// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract dAgoraToken is ERC20 {
    address public immutable tokenAddress;
    address private bridgeFactory;

    constructor(
        string memory name,
        string memory symbol,
        address _tokenAddress
    )   ERC20(name, symbol) {
        require(_tokenAddress != address(0));
        tokenAddress = _tokenAddress;
        bridgeFactory = msg.sender;
    }

    modifier onlyBridge() {
        require(msg.sender == bridgeFactory);
        _;
    }

    function WrapMint(address _to, uint256 _amount) external onlyBridge {
        _mint(_to, _amount);
        
    }

    function WrapBurn(address _from, uint256 _amount) external onlyBridge {
        _burn(_from, _amount);
    }
}
