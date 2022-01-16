const { expect } = require("chai");
const { ethers } = require("hardhat");

async function main() {

    FrankenPhunks = await hre.ethers.getContractFactory("FrankenPhunks");
    frankenPhunksContract = await FrankenPhunks.deploy("2DFrankenPhunks", "PHUNKEN", "ipfs://bafybeiagkivpeohoid23ntzy4rkurqbvtrqwuqgirbhplz7k74whnxojte/?filename=waveicon-32x32.png");
    contract = await frankenPhunksContract.deployed();
    console.log("Contract deployed to:", contract.address);
    
    accounts = await ethers.getSigners();
    deployer = accounts[0];

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });