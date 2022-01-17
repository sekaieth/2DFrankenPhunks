const { expect } = require("chai");
const { ethers } = require("hardhat");
let abi = require('../artifacts/contracts/FrankenPhunks.sol/FrankenPhunks.json');

async function main() {

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    const contractAddress = "0x2ff6bC0BC35CdCa5c94CfE8D28807BeeE0AE3945";

    contract = await new hre.ethers.Contract(contractAddress, abi.abi, deployer);
    contract.connect(deployer);

    // Set "Not Revealed" URI
    // await contract.setNotRevealedURI("ipfs://QmP6kMYFAWV2L2zMRS3pe2U1i4NXVHBALSH341wjo6fYt9/hidden");

    // Set baseURI
    await contract.setBaseURI("ipfs://bafybeibvaxifxggj4rmwvoxuz6nuvvmrblvxyiicwunx5i332e63gya53a/")
    
    // Reveal!
    // await contract.reveal();

    // console.log("URI of token 0:", await contract.tokenURI(0));
    // console.log("URI of token 1:", await contract.tokenURI(1));



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });