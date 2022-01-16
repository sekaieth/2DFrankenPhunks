// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FrankenPhunks is ERC721Enumerable, ReentrancyGuard, Ownable {

    using Strings for uint256;


// *****  GLOBAL STATE *****

  uint16 public constant MAX_SUPPLY = 3333;
  uint16 public constant FREE_MINTS = 1111;
  uint8 public constant MAX_MULTIMINT = 7;
  uint256 public constant PRICE = 0.032 ether;


  using Counters for Counters.Counter;
  bool public revealed = false;
  string public notRevealedUri;
  string baseURI;
  string public baseExtension = ".json";



  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initNotRevealedUri
  ) ERC721(_name, _symbol) {
    setNotRevealedURI(_initNotRevealedUri);
  }
  

// ***** MINTING *****

  function mint(uint16 count) public payable nonReentrant {

    require(totalSupply() + count - 1 < MAX_SUPPLY, "Exceeds max supply");
    require(count <= MAX_MULTIMINT, "Mint at most 7 at a time");

      // Free Mints
    if (totalSupply() <= FREE_MINTS) {
        for (uint256 i = 0; i < count; i++) {
        _mint(msg.sender, totalSupply());
      }
    }


      // Mint
    if (totalSupply() > FREE_MINTS) {

    require(
      msg.value >= PRICE * count, "Insufficient payment, 0.032 ETH per item"
    );
        for (uint256 i = 0; i < count; i++) {
        _mint(msg.sender, totalSupply());
      }
    }
  }


// ***** URI HANDLING *****

  function tokenURI(uint256 _tokenId) public view override returns (string memory) {
    require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
    if(revealed == false) {
      return notRevealedUri;
    }

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, _tokenId.toString(), baseExtension))
        : "";
  }

// ***** Owner Functions *****

  function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    notRevealedUri = _notRevealedURI;
  }

  function setBaseURI(string memory _newBaseURI) external onlyOwner {
    baseURI = _newBaseURI;
  }

  function reveal() public onlyOwner() {
    revealed = true;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function withdraw() public nonReentrant payable onlyOwner{
    uint256 balance = address(this).balance;

    Address.sendValue(payable(owner()), balance);
  }

// ***** Internal Functions *****
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }
}
