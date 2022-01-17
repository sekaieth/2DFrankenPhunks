const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy & Test FrankenPhunks", function () {

  let accounts, FrankenPhunks, contract, deployer, frankenPhunksContract

  beforeEach('Set up contract for each test', async () => {

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    devWallet = accounts[1];

    FrankenPhunks = await hre.ethers.getContractFactory("FrankenPhunks");
    frankenPhunksContract = await FrankenPhunks.deploy("2DFrankenPhunks", "PHUNKEN", deployer.address, devWallet.address,  "ipfs://bafybeiagkivpeohoid23ntzy4rkurqbvtrqwuqgirbhplz7k74whnxojte/?filename=waveicon-32x32.png");
    contract = await frankenPhunksContract.deployed();
  })

  // it("Withdraw funds from contract", async function () {

  //   await frankenPhunksContract.deployed();
  //   console.log("Contract address:", contract.address)


  //   // **** TEST WITHDRAW ****

  //   // Get balances before anything
  //   let deployerBalance = await deployer.getBalance();
  //   console.log("Deployer ETH balance:", ethers.utils.formatUnits(deployerBalance, "ether"));

  //   let devWalletBalance = await devWallet.getBalance();
  //   console.log("Dev Wallet ETH balance:", ethers.utils.formatUnits(devWalletBalance, "ether"));

  //   let contractBalance = await contract.getBalance();
  //   console.log("Contract balance:", ethers.utils.formatUnits(contractBalance, "ether"));

  //   // Send 1ETH from owner to contract
  //   console.log("Sending Ether!") 

  //   await deployer.sendTransaction({ 
  //     to: contract.address,
  //     value: ethers.utils.parseEther("1.0")
  //    })

  //   // Check balances of deployer, dev wallet, contract
  //   let deployerBalanceAfterSend = await deployer.getBalance();
  //   console.log("Deployer ETH balance:", ethers.utils.formatUnits(deployerBalanceAfterSend, "ether"));

  //   let devWalletBalanceAfterSend = await devWallet.getBalance();
  //   console.log("Dev Wallet ETH balance:", ethers.utils.formatUnits(devWalletBalanceAfterSend, "ether"));

  //   let contractBalanceAfterSend = await contract.getBalance();
  //   console.log("Contract balance:", ethers.utils.formatUnits(contractBalanceAfterSend, "ether"));

  //    console.log("Withdraw from Contract!")
     
  //    const withdraw = await contract.withdraw();



  //   let deployerBalanceAfterWithdraw= await deployer.getBalance();
  //   console.log("Deployer ETH balance:", ethers.utils.formatUnits(deployerBalanceAfterWithdraw, "ether"));

  //   let devWalletBalanceAfterWithdraw = await devWallet.getBalance();
  //   console.log("Dev Wallet ETH balance:", ethers.utils.formatUnits(devWalletBalanceAfterWithdraw, "ether"));

  //   let contractBalanceAfterWithdraw = await contract.getBalance();
  //   console.log("Contract balance:", ethers.utils.formatUnits(contractBalanceAfterWithdraw, "ether"));



  it("Mints", async function () {

    await frankenPhunksContract.deployed();
    console.log("Contract address:", contract.address)


  // **** TEST MINTING FOR FREE ****

  console.log("MINTING FOR FREE!!!!!");
  console.log("Deployer token balance:", await contract.balanceOf(deployer.address));
  console.log("devWallet token balance:", await contract.balanceOf(devWallet.address));

  await contract.mint(100);
  await contract.mint(100);
  await contract.mint(100);
  await contract.mint(100);
  await contract.mint(100);
  await contract.mint(100);
  await contract.mint(100);
  await contract.mint(100);
  await contract.mint(100);
  await contract.mint(100);
  await contract.mint(11);


  console.log("MINTING AT COST");
  // **** TEST MINTING AT 0.032ETH/MINT ****

  await contract.mint(100, {
    value: ethers.utils.parseEther("3.2")
  });

  await contract.mint(100, {
    value: ethers.utils.parseEther("3.2")
  });

  await contract.mint(100, {
    value: ethers.utils.parseEther("3.2")
  });

  await contract.mint(100, {
    value: ethers.utils.parseEther("3.2")
  });

  await contract.mint(100, {
    value: ethers.utils.parseEther("3.2")
  });

  await contract.mint(100, {
    value: ethers.utils.parseEther("3.2")
  });

  await contract.mint(100, {
    value: ethers.utils.parseEther("3.2")
  });


  console.log("MINTING COMPLETED!");

  const deployerTokenBalance =  await contract.balanceOf(deployer.address);
  console.log("Deployer token balance:", deployerTokenBalance.toString());

  contractEtherBalance = await contract.getBalance();
  console.log("Contract Ether Balance:", ethers.utils.formatUnits(contractEtherBalance, "ether"));

  deployerBalance = deployer.getBalance();
  console.log("Deployer Ether balance before withdraw:", await deployerBalance);

  devWalletBalanceBeforeWithdraw = devWallet.getBalance();
  console.log("Dev Wallet Ether balance before withdraw:", await devWalletBalanceBeforeWithdraw);

  // Set Dev Wallet
  console.log("dev wallet:", devWallet.address);
  await contract.setDevWallet(devWallet.address);

  withdraw = await contract.withdraw();

  deployerBalanceAfterWithdraw = deployer.getBalance();
  console.log("Deployer Ether balance after withdraw:", await deployerBalanceAfterWithdraw);

  devWalletBalanceAfterWithdraw = devWallet.getBalance();
  console.log("Dev Wallet Ether balance after withdraw:", await devWalletBalanceAfterWithdraw);

    
  });
});
