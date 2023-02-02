import React, { Component } from "react";
import "./App.css";
import bank from "../bank.png";

class Navbar extends Component {
  // Our React Code Goes In Here
  render() {
    return (
      <nav
        className="navbar navbar-dark fixed-top shadow p-0"
        style={{ backgroundColor: "black", height: "50px" }}
      >
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          style={{ color: "white" }}
        >
          <img
            src={bank}
            width="50"
            height="30"
            className="d-inline-block align-top"
            alt="bank"
          />
          &nbsp; DAPP Yield Staking (Decentralized Bank)
        </a>
        <ul className="navbar-nav px-3">
          <li className="text-nowarp d-none nav-item d-sm-none d-sm-block">
            <small style={{ color: "white" }}>ACCOUNT NUMBER:{this.props.account}</small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
