import Web3 from "web3";
import React, { Component } from "react";
import PunksContract from "./contracts/FrankenPhunks.json";
import getWeb3 from "./getWeb3";
import NFTRow from "./components/NFTRow";
import './App.css';

import punk1 from "./assets/2dpunk.jpeg";
import punk2 from "./assets/2dpunk2.jpeg";
import punk3 from "./assets/2dpunk3.jpeg";
import punk4 from "./assets/2dpunk4.jpeg";

import Home from './Home';
import Mint from './Mint';
import {Route, Link} from 'react-router-dom';


class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  connectWallet = async () => {

    if(window.ethereum) {
      
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      const web3socket = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:7545')) //Websocket genacsh RPC

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PunksContract.networks[networkId];
      const instance = new web3.eth.Contract(
        PunksContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      const socketInstance = new web3socket.eth.Contract(
        PunksContract.abi,
        deployedNetwork && deployedNetwork.address,
      );


       // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      const currentSupply = parseInt(await instance.methods.currentSupply().call())

      this.setState({ web3, accounts, contract: instance, currentSupply, quantity: 1 }); 

      const component = this

      socketInstance.events.Transfer({
        fromBlock: 0
      }, function (error, event) {
        if (error) console.log(error)
        let tokenId = event.returnValues.tokenId
        if (parseInt(tokenId) > parseInt(currentSupply))
          component.setState({ currentSupply: tokenId})

      })

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }};

  async mintNFT(e) {
    e.preventDefault()
    console.log(this.state)

    const{accounts, contract, web3, quantity} = this.state

    let price = 0.05 * quantity

    await contract.methods.purchase(quantity).send({
      from: accounts[0],
      value: web3.utils.toWei(String(price), 'ether') //price
    })
  
  }

  nftIDs(){
    let ids = [...Array(parseInt(this.state.currentSupply) + 1).keys()]
    ids.shift()
    return ids
  }
  
  setQuantity(event){
    this.setState({ quantity: event.target.value })

  }
  App() {
    return (
      <div className = "App">
        <Home /> 
      </div>
    );
  }

  render() {
    if (!this.state.web3) {
      return <div className="container-full">
              <div className="header">
                <h3 className="green">
                  2D Franken Phunks
                </h3>
                <button className="cta-button-small connect-wallet-button"
                            onClick={() => this.connectWallet}>
                    Connect Metamask
                  </button>
              </div>
              <div className="container-fluid">
                <div className="image-fader">
                  <img alt="" src={punk1} />
                  <img alt="" src={punk2} />
                  <img alt="" src={punk3} />
                  <img alt="" src={punk4} />
                </div>
              </div>
              <h1 className="large">
                Welcome to the Lab
              </h1>              
              <h3 className="green">
                Connect your wallet to begin your journey
              </h3>
            </div>;
    }
    return (
      <div className="App">
        <p> Current Supply: {this.state.currentSupply}</p>
        <select name ="count" id ="count" onChange={this.setQuantity.bind(this)} value={this.state.quantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>

        </select>
        <a href="#"onClick={this.mintNFT.bind(this)}>Mint Punks</a> 
        <br />
        <table>
          <thead>
            <tr>
              <th>
                Token ID
              </th>
              <th>
                Owner Address
              </th>
            </tr>
          </thead>
          <tbody>
            {this.nftIDs().map((id) => <NFTRow id={id} key={id} contract = {this.state.contract}/>) }
          </tbody>
        </table>     
      </div>
    );
  }
}

export default App;
