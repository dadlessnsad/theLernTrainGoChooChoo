// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TheDadlessLibrary is Ownable {

    uint256 public deweyDecimalId;
    address[] private allUsersAddresses;

    struct Book {
        string name;
        string author;
        uint256 totalCopies;
        uint256 copiesOut;
        mapping(uint256 => address) bookBorrowHistory;
    }

    Book book;

    mapping(string => bool) private exists;
    mapping(uint256 => Book) public Ledger;
    //user address and deweyDecimalId either true or false
    mapping(address => mapping(uint256 => bool)) private onBorrow;


    modifier bookExists(string memory _name) {
        require(!exists[_name], "Book already in library");
        _;
    }

    modifier bookCheck(uint256 _deweyDecimalId) {
        Book storage book = Ledger[deweyDecimalId];
        require(bytes(book.name).length != 0, "Book does not exist");
        _;
    }

    function addNewBook(
        string memory _name,
        string memory _author,
        uint256 _totalCopies
    ) 
        public 
        onlyOwner
        bookExists(_name)
    {
        require(
            bytes(_name).length != 0,
            "Book name can't be empty"
        );
        require(
            bytes(_author).length != 0,
            "Book name can't be empty"
        );
        require(
            _totalCopies > 0,
            "Must have atleast one copy"
        );
        deweyDecimalId = (deweyDecimalId + 1);
        exists[_name] = true;
        Book storage book = Ledger[deweyDecimalId];
        book.name = _name;
        book.author = _author;
        book.totalCopies = _totalCopies;
    }

    function addCopies(
        uint256 _deweyDecimalId,
        uint256 _newCopies
    ) 
        public 
        onlyOwner 
        bookCheck(_deweyDecimalId)
    {
        require(
            _newCopies > 0, 
            "Cant add zero Copies"
        );

        Book storage book = Ledger[deweyDecimalId];
        book.totalCopies = (book.totalCopies + _newCopies);
    }   


    function borrowBook(uint256 _deweyDeciamalId) public {
        require(
            !onBorrow[msg.sender][_deweyDeciamalId],
            "User already has copy out"
        );
        Book storage book = Ledger[_deweyDeciamalId];

        require(
            book.totalCopies > 0,
            "No books left to borrow"
        );

        book.totalCopies = (book.totalCopies - 1);
        onBorrow[msg.sender][_deweyDeciamalId] = true;
        book.bookBorrowHistory[book.copiesOut] = msg.sender;
        book.copiesOut = (book.copiesOut + 1);
        allUsersAddresses.push(msg.sender);

    }

    function returnBook(uint256 _deweyDeciamalId) public {
        require(
            onBorrow[msg.sender][_deweyDeciamalId] == true,
            "No copy to return"
        );
        Book storage book = Ledger[_deweyDeciamalId];
        book.copiesOut = book.copiesOut - 1;
        book.totalCopies = book.totalCopies + 1;
        onBorrow[msg.sender][_deweyDeciamalId] = false;
    }

    function booksAvaliable() public view returns (uint256[] memory) {
        uint256 availableBook = 0;
        for (uint256 i = 1; i <= deweyDecimalId; i++) {
            //Check if book is in stock and not out on borrow
            if(!onBorrow[msg.sender][i] && Ledger[i].totalCopies > 0) {
                availableBook++;
            }
        }

        uint256[] memory Ids = new uint256[](availableBook);
        availableBook = 0;
        for (uint256 i = 1; i <= deweyDecimalId; i++) {
            //Check if book is in stock and not out on borrow
            if(!onBorrow[msg.sender][i] && Ledger[i].totalCopies > 0) {
                Ids[availableBook] = i;
                availableBook++;
            }
        }
        return Ids;
    }

    function whoHasTheBookIWant(uint256 _deweyDecimalId) public view returns (address[] memory) {
        address[] memory user = new address[](Ledger[_deweyDecimalId].copiesOut);
        for (uint256 i = 0; i < user.length; i++) {
            user[i] = Ledger[_deweyDecimalId].bookBorrowHistory[i];
        }
        return user;
    }

    //this gonna filll up and be un useable sadPepe
    function libraryTotalHistory() public view returns(address[] memory) {
        return allUsersAddresses;
    }
}