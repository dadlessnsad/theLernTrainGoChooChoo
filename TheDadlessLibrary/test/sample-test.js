const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("the library test", function () {

    let DadlessLibrary;
    let library;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addrs;


    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        DadlessLibrary = await ethers.getContractFactory("TheDadlessLibrary");
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        library = await DadlessLibrary.deploy( );
        await library.deployed();

    });
    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
      it("Should set the right owner", async function () {
        expect(await library.owner()).to.equal(owner.address);
      });

      it("Should not let random user add book", async function () {
        
        expect( library.connect(addr1).addNewBook(
          "Lord of the Rings: Return of the King",
          "Jr. Tolkien",
          20
        )).to.be.revertedWith('Not the owner')

      })

      it("Should let owner add book to library", async function () {
        const addBook = await library.addNewBook(
          "Lord of the Rings: Return of the King",
          "Jr. Tolkien",
          20
        );

        const getBook = await library.Ledger(1);
        console.log(getBook);

        expect(await library.deweyDecimalId()).to.equal(1)
      })
        
      it("Should allow owner to add copy", async function () {
        const addBook = await library.addNewBook(
          "Lord of the Rings: Return of the King",
          "Jr. Tolkien",
          20
        );
        
        const moarBooks =  await library.addCopies(1, 30);
        const getBook = await library.Ledger(1);
        console.log(getBook);
        

      }) 

      it("Should not let random user add Copies", async function () {
        const addBook = await library.addNewBook(
          "Lord of the Rings: Return of the King",
          "Jr. Tolkien",
          20
        );

        expect( library.connect(addr1).addCopies(
          1,
          20
        )).to.be.revertedWith('Not the owner')

      })

      it("Should let user borrow book", async function () {
        const addBook = await library.addNewBook(
          "Lord of the Rings: Return of the King",
          "Jr. Tolkien",
          20
        );
        await library.connect(addr1).borrowBook(1);
      })

      it("Should not allow user to borrow 2 of the same books", async function () {
        const addBook = await library.addNewBook(
          "Lord of the Rings: Return of the King",
          "Jr. Tolkien",
          20
        );
        await library.connect(addr1).borrowBook(1);

        expect(library.connect(addr1).borrowBook(1)).to.be.revertedWith('User already has copy out')
      })

      it("Should allow user to return book", async function () {
        const addBook = await library.addNewBook(
          "Lord of the Rings: Return of the King",
          "Jr. Tolkien",
          20
        );
        await library.connect(addr1).borrowBook(1);
        await library.connect(addr1).returnBook(1);
      })

      it("Should not allow user to return book they arnt borrowed", async function () {
        const addBook = await library.addNewBook(
          "Lord of the Rings: Return of the King",
          "Jr. Tolkien",
          20
        );
        await library.connect(addr1).borrowBook(1)
        expect(library.connect(addr2).returnBook(1)).to.be.revertedWith('No copy to return')
      })
        
      it("Should not give book if no copys left", async function () {
        const addBook = await library.addNewBook(
          "Lord of the Rings: Return of the King",
          "Jr. Tolkien",
          1 //only one copy
        );
        await library.connect(addr1).borrowBook(1)
        expect(library.connect(addr2).borrowBook(1)).to.be.revertedWith('No books left to borrow');
      })
    })

})
