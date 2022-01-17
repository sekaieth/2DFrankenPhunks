const { expect } = require("chai");
const { getDefaultProvider } = require("ethers");
const { ethers } = require("hardhat");
let abi = require('../artifacts/contracts/FrankenPhunks.sol/FrankenPhunks.json');

async function main() {

    provider = ethers.getDefaultProvider();
    const contractAddress = "0x2ff6bC0BC35CdCa5c94CfE8D28807BeeE0AE3945";
    const devWallet = new ethers.Wallet(`${process.env.RINKEBY_PAYMENTWALLET_PRIVKEY}`, provider);


    contract = await new hre.ethers.Contract(contractAddress, abi.abi, devWallet);
    await contract.connect(devWallet);
    console.log("Connected to wallet:", devWallet.address);
    
    await contract.mint(1);
    console.log("balance of dev wallet", await contract.balanceOf(devWallet.address))


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });