const { expect } = require("chai");
const { ethers } = require("hardhat");

async function main() {

    const multisig = "0xf5963554E4FD06F910E4e74dD012E9b018C83209";
    const devWallet = "0x246913F9b282208E8377E0251900bd3942B35c1c";

    FrankenPhunks = await hre.ethers.getContractFactory("FrankenPhunks");
    frankenPhunksContract = await FrankenPhunks.deploy("2DFrankenPhunks", "PHUNKEN", multisig, devWallet, "ipfs://QmP6kMYFAWV2L2zMRS3pe2U1i4NXVHBALSH341wjo6fYt9/hidden");
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