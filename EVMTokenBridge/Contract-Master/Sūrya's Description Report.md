 Sūrya's Description Report

 Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/contracts/dAgoraBridge.sol | 301adf4a50966656371b971943b174e77ca82928 |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/node_modules/@openzeppelin/contracts/access/Ownable.sol | d756b3242c79ebd83bcf5905ef187773b0675c8b |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/node_modules/@openzeppelin/contracts/utils/Context.sol | 719844505df30bda93516e78eab1ced3bfe9ff4a |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol | aa4077242e348aa4d7ad35b09c2e761399d9278e |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol | 3f8f9d66083281998547ead9e2a599f5e3d049f8 |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol | 87b62db9a86c0b9bbc58b51d0d2ae7a8b7688800 |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol | 5712d73386a72af8011ee30be7d36714dfb1c752 |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/contracts/dAgoraVault.sol | 545218818882e3d4a99ad1542dbe47074b266538 |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol | 23163a2332e4ca18d1068d6ffbd5534b6e5242d9 |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/contracts/dAgoraFactory.sol | 4121fdaa2e2d9c1d7fa7bfddce03a48082c6d2d1 |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/node_modules/@openzeppelin/contracts/utils/Strings.sol | 8da07805a3ba0f671b12c496f43ae8c2684df165 |
| /home/ser-orphan/Workspace/NFT WORK/limeAcadamy/theLernTrainGoChooChoo/EVMTokenBridge/Contract-Master/contracts/dAgoraToken.sol | 7ab57ad2a22d6ef43135a807245c587559f5f302 |


 Contracts Description Table


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **dAgoraBridge** | Implementation | Ownable, ReentrancyGuard |||
| └ | <Constructor> | Public ❗️ | 🛑  | Ownable ReentrancyGuard |
| └ | Deposit | Public ❗️ |  💵 | isPaused nonReentrant |
| └ | withdraw | Public ❗️ |  💵 | nonReentrant isPaused |
| └ | pause | External ❗️ | 🛑  | onlyOwner |
| └ | unPause | External ❗️ | 🛑  | onlyOwner |
| └ | setNewBridgeFees | External ❗️ | 🛑  | onlyOwner |
| └ | getCurrentNonce | Public ❗️ |   |NO❗️ |
| └ | prefixed | Internal 🔒 |   | |
| └ | recoverSigner | Internal 🔒 |   | |
| └ | splitSignature | Internal 🔒 |   | |
||||||
| **Ownable** | Implementation | Context |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
| └ | owner | Public ❗️ |   |NO❗️ |
| └ | renounceOwnership | Public ❗️ | 🛑  | onlyOwner |
| └ | transferOwnership | Public ❗️ | 🛑  | onlyOwner |
| └ | _transferOwnership | Internal 🔒 | 🛑  | |
||||||
| **Context** | Implementation |  |||
| └ | _msgSender | Internal 🔒 |   | |
| └ | _msgData | Internal 🔒 |   | |
||||||
| **ERC20** | Implementation | Context, IERC20, IERC20Metadata |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
| └ | name | Public ❗️ |   |NO❗️ |
| └ | symbol | Public ❗️ |   |NO❗️ |
| └ | decimals | Public ❗️ |   |NO❗️ |
| └ | totalSupply | Public ❗️ |   |NO❗️ |
| └ | balanceOf | Public ❗️ |   |NO❗️ |
| └ | transfer | Public ❗️ | 🛑  |NO❗️ |
| └ | allowance | Public ❗️ |   |NO❗️ |
| └ | approve | Public ❗️ | 🛑  |NO❗️ |
| └ | transferFrom | Public ❗️ | 🛑  |NO❗️ |
| └ | increaseAllowance | Public ❗️ | 🛑  |NO❗️ |
| └ | decreaseAllowance | Public ❗️ | 🛑  |NO❗️ |
| └ | _transfer | Internal 🔒 | 🛑  | |
| └ | _mint | Internal 🔒 | 🛑  | |
| └ | _burn | Internal 🔒 | 🛑  | |
| └ | _approve | Internal 🔒 | 🛑  | |
| └ | _spendAllowance | Internal 🔒 | 🛑  | |
| └ | _beforeTokenTransfer | Internal 🔒 | 🛑  | |
| └ | _afterTokenTransfer | Internal 🔒 | 🛑  | |
||||||
| **IERC20** | Interface |  |||
| └ | totalSupply | External ❗️ |   |NO❗️ |
| └ | balanceOf | External ❗️ |   |NO❗️ |
| └ | transfer | External ❗️ | 🛑  |NO❗️ |
| └ | allowance | External ❗️ |   |NO❗️ |
| └ | approve | External ❗️ | 🛑  |NO❗️ |
| └ | transferFrom | External ❗️ | 🛑  |NO❗️ |
||||||
| **IERC20Metadata** | Interface | IERC20 |||
| └ | name | External ❗️ |   |NO❗️ |
| └ | symbol | External ❗️ |   |NO❗️ |
| └ | decimals | External ❗️ |   |NO❗️ |
||||||
| **ReentrancyGuard** | Implementation |  |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
||||||
| **dAgoraVault** | Implementation | Ownable |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
| └ | Deposit | External ❗️ | 🛑  | onlyOwner |
| └ | Withdraw | External ❗️ | 🛑  | onlyOwner |
| └ | checkDepositId | Private 🔐 |   | onlyOwner |
| └ | _isDepositedToVault | External ❗️ |   | onlyOwner |
||||||
| **EnumerableSet** | Library |  |||
| └ | _add | Private 🔐 | 🛑  | |
| └ | _remove | Private 🔐 | 🛑  | |
| └ | _contains | Private 🔐 |   | |
| └ | _length | Private 🔐 |   | |
| └ | _at | Private 🔐 |   | |
| └ | _values | Private 🔐 |   | |
| └ | add | Internal 🔒 | 🛑  | |
| └ | remove | Internal 🔒 | 🛑  | |
| └ | contains | Internal 🔒 |   | |
| └ | length | Internal 🔒 |   | |
| └ | at | Internal 🔒 |   | |
| └ | values | Internal 🔒 |   | |
| └ | add | Internal 🔒 | 🛑  | |
| └ | remove | Internal 🔒 | 🛑  | |
| └ | contains | Internal 🔒 |   | |
| └ | length | Internal 🔒 |   | |
| └ | at | Internal 🔒 |   | |
| └ | values | Internal 🔒 |   | |
| └ | add | Internal 🔒 | 🛑  | |
| └ | remove | Internal 🔒 | 🛑  | |
| └ | contains | Internal 🔒 |   | |
| └ | length | Internal 🔒 |   | |
| └ | at | Internal 🔒 |   | |
| └ | values | Internal 🔒 |   | |
||||||
| **dAgoraFactory** | Implementation | Ownable |||
| └ | WrapMint | External ❗️ | 🛑  | onlyOwner |
| └ | WrapBurn | External ❗️ | 🛑  | onlyOwner |
| └ | _createdAgoraToken | Private 🔐 | 🛑  | |
| └ | isdAgoraToken | Public ❗️ |   |NO❗️ |
| └ | getdAgoraToken | Public ❗️ |   |NO❗️ |
| └ | getNameForWrappedToken | Private 🔐 |   | |
| └ | getSymbolForWrappedToken | Private 🔐 |   | |
||||||
| **Strings** | Library |  |||
| └ | toString | Internal 🔒 |   | |
| └ | toHexString | Internal 🔒 |   | |
| └ | toHexString | Internal 🔒 |   | |
||||||
| **dAgoraToken** | Implementation | ERC20 |||
| └ | <Constructor> | Public ❗️ | 🛑  | ERC20 |
| └ | WrapMint | External ❗️ | 🛑  | onlyBridge |
| └ | WrapBurn | External ❗️ | 🛑  | onlyBridge |


 Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |
