import React, { Component } from "react";
import tether from "../tether.png";

class Main extends Component {
  // Our React Code Goes In Here
  render() {
    console.log(`StakingBalance:${this.props.stakingBalance}`)
    console.log(`TetherBalance:${this.props.tetherBalance}`)
    console.log(`VoltexBalance:${this.props.voltexBalance}`)

    return (
      <div id="content" className="mt-3">
        <table className="table text-muted text-center">
          <thead>
            <tr style={{ color: "black" }}>
              <th scope="col">StakingBalance</th>
              <th scope="col">Voltex Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "black" }}>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} USDT</td>
              <td>{window.web3.utils.fromWei(this.props.voltexBalance, 'Ether')} Voltex</td>
            </tr>
          </tbody>
        </table>
        <div className="card mb-2" style={{ opacity: ".9" }}>
          <form 
          onSubmit={(event) => {
              event.preventDefault();
              let amount 
              amount = this.input.value.toString();
              amount = window.web3.utils.toWei(amount, 'Ether')
              this.props.stakeTokens(amount)
          }}
          className="mb-3">
            <div style={{ borderSpace: "0 1em" }}>
              <label className="float-left" style={{ marginLeft: "15px" }}>
                <b>Stake Tokens</b>
              </label>
              <span className="float-right" style={{ marginRight: "8px" }}>
                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')} USDT
              </span>
              <div className="input-group mb-4">
                <input 
                ref={(input)=>{this.input= input} }
                type="text"
                placeholder="0"
                required />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img src={tether} alt="tether" height="50" />
                    &nbsp;&nbsp;&nbsp;USDT
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                DEPOSITE
              </button>
            </div>
          </form>
          <button type="submit"
          onClick={(event) =>{
            event.preventDefault();
            this.props.unstakeTokens()
          }}
           className="btn btn-primary btn-lg btn-block"
           >
            WITHDRAW
          </button>
          <div className="card-body text-center" style={{ color: "blue" }}>
            AIRDROP
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
