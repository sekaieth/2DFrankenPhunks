const { expect } = require("chai");
const { ethers } = require("hardhat");
let abi = require('../artifacts/contracts/FrankenPhunks.sol/FrankenPhunks.json');

async function main() {

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    const contractAddress = "0x8A7982316D139FE72E9551E2C0B8b4B29EbF2f71";
    const devWallet = "0x246913F9b282208E8377E0251900bd3942B35c1c"

    contract = await hre.ethers.getContractFactory("FrankenPhunks");

    const estimatedGas = await ethers.provider.estimateGas(contract.getDeployTransaction("2DFrankenPhunks", "PHUNKEN", "0xf5963554E4FD06F910E4e74dD012E9b018C83209", devWallet, "ipfs://QmP6kMYFAWV2L2zMRS3pe2U1i4NXVHBALSH341wjo6fYt9/hidden"));

    const feeData = await ethers.provider.getFeeData();
    console.log("Fee data:", feeData)
    const gasPrice = feeData.gasPrice;
    console.log("estimated gas:", ethers.utils.formatUnits(estimatedGas, "gwei"), "gwei");
    console.log("gas price:", ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");
    const totalEstimate = gasPrice * estimatedGas;
    console.log("Estimated Cost to Deploy:", ethers.utils.formatUnits((totalEstimate.toString())), "ETH");




}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });