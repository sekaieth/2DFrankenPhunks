const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy & Test FrankenPhunks", function () {

  let accounts, FrankenPhunks, contract, deployer, frankenPhunksContract

  beforeEach('Set up contract for each test', async () => {

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    devWallet = accounts[1];

    FrankenPhunks = await hre.ethers.getContractFactory("FrankenPhunks");
    frankenPhunksContract = await FrankenPhunks.deploy("2DFrankenPhunks", "PHUNKEN", deployer.address, devWallet.address, "ipfs://bafybeiagkivpeohoid23ntzy4rkurqbvtrqwuqgirbhplz7k74whnxojte/?filename=waveicon-32x32.png");
    contract = await frankenPhunksContract.deployed();
  })

  it("Withdraw funds from contract", async function () {

    await frankenPhunksContract.deployed();
    console.log("Contract address:", contract.address)


    // **** TEST WITHDRAW ****

    // Get balances before anything
    let deployerBalance = await deployer.getBalance();
    console.log("Deployer ETH balance:", ethers.utils.formatUnits(deployerBalance, "ether"));

    let devWalletBalance = await devWallet.getBalance();
    console.log("Dev Wallet ETH balance:", ethers.utils.formatUnits(devWalletBalance, "ether"));

    let contractBalance = await contract.getBalance();
    console.log("Contract balance:", ethers.utils.formatUnits(contractBalance, "ether"));

    // Send 1ETH from owner to contract
    console.log("Sending Ether!") 

    await deployer.sendTransaction({ 
      to: contract.address,
      value: ethers.utils.parseEther("1.0")
     })

    // Check balances of deployer, dev wallet, contract
    let deployerBalanceAfterSend = await deployer.getBalance();
    console.log("Deployer ETH balance:", ethers.utils.formatUnits(deployerBalanceAfterSend, "ether"));

    let devWalletBalanceAfterSend = await devWallet.getBalance();
    console.log("Dev Wallet ETH balance:", ethers.utils.formatUnits(devWalletBalanceAfterSend, "ether"));

    let contractBalanceAfterSend = await contract.getBalance();
    console.log("Contract balance:", ethers.utils.formatUnits(contractBalanceAfterSend, "ether"));

     console.log("Withdraw from Contract!")
     
     const withdraw = await contract.withdraw();



    let deployerBalanceAfterWithdraw= await deployer.getBalance();
    console.log("Deployer ETH balance:", ethers.utils.formatUnits(deployerBalanceAfterWithdraw, "ether"));

    let devWalletBalanceAfterWithdraw = await devWallet.getBalance();
    console.log("Dev Wallet ETH balance:", ethers.utils.formatUnits(devWalletBalanceAfterWithdraw, "ether"));

    let contractBalanceAfterWithdraw = await contract.getBalance();
    console.log("Contract balance:", ethers.utils.formatUnits(contractBalanceAfterWithdraw, "ether"));






  // **** TEST REVEAL ****

    // Token URI Before reveal
    // console.log("Token URIs before reveal:");
    // console.log("Token 0 URI:", await contract.tokenURI(0));
    // console.log("Token 1 URI:", await contract.tokenURI(1));
    // console.log("Token 2 URI:", await contract.tokenURI(2));

    // console.log("Token URIs after reveal:");
    // contract.reveal();
    // console.log("Token 0 URI:", await contract.tokenURI(0));
    // console.log("Token 1 URI:", await contract.tokenURI(1));
    // console.log("Token 2 URI:", await contract.tokenURI(2));

    
  });
});
