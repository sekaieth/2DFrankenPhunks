const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy & Test FrankenPhunks", function () {

  let accounts, FrankenPhunks, contract, deployer, frankenPhunksContract

  beforeEach('Set up contract for each test', async () => {
    FrankenPhunks = await hre.ethers.getContractFactory("FrankenPhunks");
    frankenPhunksContract = await FrankenPhunks.deploy("2DFrankenPhunks", "PHUNKEN", "0xf5963554E4FD06F910E4e74dD012E9b018C83209", "ipfs://bafybeiagkivpeohoid23ntzy4rkurqbvtrqwuqgirbhplz7k74whnxojte/?filename=waveicon-32x32.png");
    contract = await frankenPhunksContract.deployed();
    accounts = await ethers.getSigners();
    deployer = accounts[0];
  })

  it("Mints a new token", async function () {
    const cost = ethers.utils.parseEther("0.096");
    await frankenPhunksContract.deployed();
    console.log("Contract address:", contract.address)


    const balanceBefore = await contract.balanceOf(deployer.address);
    console.log("Balance of deployer", balanceBefore.toString());

    await contract.setBaseURI("ipfs://QmfYoQ7cKykmtPbmnKXFFFUG88VqvWvyLgavYo4W6tLF2y/")

    await contract.mint(3);


    balanceAfter = await contract.balanceOf(deployer.address);
    console.log("Balance of Deployer after mint:", balanceAfter.toString());

    // Token URI Before reveal
    console.log("Token URIs before reveal:");
    console.log("Token 0 URI:", await contract.tokenURI(0));
    console.log("Token 1 URI:", await contract.tokenURI(1));
    console.log("Token 2 URI:", await contract.tokenURI(2));

    console.log("Token URIs after reveal:");
    contract.reveal();
    console.log("Token 0 URI:", await contract.tokenURI(0));
    console.log("Token 1 URI:", await contract.tokenURI(1));
    console.log("Token 2 URI:", await contract.tokenURI(2));

    
  });
});
