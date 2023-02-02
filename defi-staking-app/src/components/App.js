import React, { Component } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Web3 from "web3";
import Tether from "../truffle_abis/Tether.json";
import Voltex from "../truffle_abis/Voltex.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";
import Main from "./Main";
class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum Browser detected. Check your metamask");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    this.setState({ account: account[0] });
    const networkId = await web3.eth.net.getId();

    //Load Tether Contract
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      this.setState({ tether: tether });
      let tetherBalance = await tether.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ tetherBalance: tetherBalance.toString() });
    } else {
      window.alert(
        "Error! Tether Contract is not deployed - no detected network"
      );
    }

    //Load Voltex Contract
    const voltexData = Voltex.networks[networkId];
    if (voltexData) {
      const voltex = new web3.eth.Contract(Voltex.abi, voltexData.address);
      this.setState({ voltex: voltex });
      let voltexBalance = await voltex.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ voltexBalance: voltexBalance.toString() });
    } else {
      window.alert(
        "Error! Voltex Contract is not deployed - no detected network"
      );
    }

    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(
        DecentralBank.abi,
        decentralBankData.address
      );
      this.setState({ decentralBank: decentralBank });
      let stakingBalance = await decentralBank.methods
        .stakingBalance(this.state.account)
        .call();
      this.setState({ stakingBalance: stakingBalance.toString() });
    } else {
      window.alert(
        "Error! DecentralBank Contract is not deployed - no detected network"
      );
    }
    this.setState({ loading: false });
  }
  // two function one that stakes and one that unstakes-
  // leverage our decentralBack contract - deposit tokens and unstaking
  // depositeTokens tranksfer From
  // function approve transactions hash ----
  // Staking Function  >> decentralBanmk. depositeTokens(send)

  //staking function
  stakeTokens = (amount) => {
    this.setState({loading: true })
    this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
      this.state.decentralBank.methods.depositeTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({loading:false})
      })
    }) 
  }
  //unstaking function
  unstakeTokens = () => {
    this.setState({ loading: true });
    this.state.decentralBank
      .methods
      .unstakeTokens()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  // UnstakeToken

  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      tether: {},
      voltex: {},
      decentralBank: {},
      tetherBalance: "0",
      voltexBalance: "0",
      stakingBalance: "0",
      loading: true,
    };
  }

  // Our React Code Goes In Here
  render() {
    let content;
    {
      this.state.loading
        ? (content = (
            <p id="loader" className="text-center" style={{ margin: "30px" }}>
              Loading ....
            </p>
          ))
        : (content = (
            <Main
              tetherBalance={this.state.tetherBalance}
              voltexBalance={this.state.voltexBalance}
              stakingBalance={this.state.stakingBalance}
              stakeTokens={this.stakeTokens}
              unstakeTokens={this.unstakeTokens} 
            />
          ));
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px", minHeight: "100vm" }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
