//SPDX-LICENCE-IDENTIFIER: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    uint256 initialSupply = 1000;


    constructor() ERC20('MehToken', 'MTK') {
        _mint(msg.sender, initialSupply);
    }

    function giveMehTokens() public {
        _mint(msg.sender, 2500);
    }

}