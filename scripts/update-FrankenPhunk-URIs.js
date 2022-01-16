const { expect } = require("chai");
const { ethers } = require("hardhat");
let abi = require('../artifacts/contracts/FrankenPhunks.sol/FrankenPhunks.json');

async function main() {

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    const contractAddress = "0x8A7982316D139FE72E9551E2C0B8b4B29EbF2f71";

    contract = await new hre.ethers.Contract(contractAddress, abi.abi, deployer);
    contract.connect(deployer);


    // await contract.setNotRevealedURI("ipfs://QmRxTrsATAmTtiYXyXniGb8WDQwkHwLAcYHW5YRmirFHCd/hidden.json");
    console.log("URI of token 0", await contract.tokenURI(0));
    console.log("URI of token 4", await contract.tokenURI(4));




    console.log("URI of token 0", await contract.tokenURI(0));
    console.log("URI of token 4", await contract.tokenURI(4));



    console.log("URI of token 0", await contract.tokenURI(0));
    console.log("URI of token 4", await contract.tokenURI(4));


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });