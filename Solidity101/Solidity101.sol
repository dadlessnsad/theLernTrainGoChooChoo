// 1. What is delegatecall? Give example with code.

// Delegate call  allows a calling contract to send a msg to a external contract & execute the code in the context of the calling contract
// A DelegateCall is very similar to a msgcall.
// Except that the code at the target address is executed in the context of the calling contract
// when a function is called these valuse will stay the same
  // address(this)
  // msg.sender
  // msg.value


  contract contractA {
    address public user;
    uint256 public tickets;
    uint256 public value;

    function setTicket(address _anotherContract, uint256 _ticketAmount) public payable {
      (bool success, bytes memory data) = _anotherContract.delegatecall(
        abi.encodeWithSignature("setTicket(uint256)", _ticketAmount)
      );
      require(success, "delegateCall failed");
    }

  }


  contract ContractB {
    address public user;
    uint256 public tickets;
    uint256 public value;

     
   

    function setTicket(uint256 _ticketAmount) external payable {
      user = msg.sender;
      tickets = _ticketAmount;
      value = msg.value;
    }

  }

  
// 2. What is multicall? Give example with code.
// batches together multiple calls from contract into a singular external call.

  contract Insurance {

    function functionUno() external view returns (uint, uint) {
      return(1, block.timestamp);
    }

    function functioDos() external view returns (uint, uint) {
      return(2, block.timestamp);
    }

    function UnoData() external pure returns (bytes memory) {
      return abi.encodeWithSelector(this.functionUno.selector);
    }

    function DosData() external pure returns (bytes memory) {
      return abi.encodeWithSelector(this.functioDos.selector);
    }
  }

  contract MultiCall {

    function multiCall(address[] calldata targets, bytes[] calldata data) external view returns (bytes[] memory) {
      require(targets.length == data.length, "must be same lengeth");
      bytes[] memory results = new bytes[](data.length);

      for (uint i; i < targets.length; i++) {
        (bool success, bytes memory result) = targets[i].staticcall(data[i]);
        require(success);
        results[i] = result;
      }
      return results;
    }
  }

// 3. What is time lock? Give example with code.
// Can be used to lock code functionallity until a certain amount of time has passed

  contract TimeLock {
      mapping(address => uint) public balances;
      mapping(address => uint) public lockTime;
      
    function withdraw() public {
      require(balances[msg.sender] > 0, "insufficient funds");

      require(block.timestamp > lockTime[msg.sender], "lock time has not expired");


      uint amount = balances[msg.sender];
      balances[msg.sender] = 0;

      (bool sent, ) = msg.sender.call{value: amount}("");
      require(sent, "Failed to send ether");

    }
  }