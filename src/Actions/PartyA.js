import React, { Component } from "react";
const IPFS = require("ipfs-mini");
class PartyA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ipfsres: {},
      ans: null,
      genuine: false,
    };
  }

  componentDidMount = async () => {
    // -------------------ipfshash setup------------------

    console.log("Inside componenDidMount");

    const ipfs = new IPFS({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });

    //------------------------calling gethash-----------------

    const contract = this.props.passedStates.contract;
    const account = this.props.passedStates.account;
    const key = await contract.methods.getpartyA().call();
    console.log("key from getPartyA method smart contract", key);
    console.log(typeof key.toString());
    const reply = await contract.methods.getDataHash(key.toString()).call();
    console.log("reply from contract in partyA ", reply);

    //-----------------fetching from ipfs-------------------

    const res = await ipfs.catJSON(reply);
    this.setState({ ipfsres: res });
    const a = this.state.ipfsres.report;
    this.setState({ ans: a });
  };
  changeHandler = async () => {
    this.setState({ genuine: true });
  };
  changeHandlernotG = async () => {
    this.setState({ genuine: false });
  };

  render() {
    {
      this.state.genuine &&
        console.log("Response from PartyA", this.state.genuine);
    }
    return (
      <div>
        <h1>Description:</h1>
        <p>{this.state.ans}</p>
        <button onClick={this.changeHandler}>Genuine</button>
        <button onClick={this.changeHandlernotG}>Not Genuine</button>
      </div>
    );
  }
}

export default PartyA;
