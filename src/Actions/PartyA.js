import React, { Component } from "react";
const IPFS = require("ipfs-mini");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const buffer = require("Buffer");
class PartyA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ipfsres: {},
      ans: null,
      genuine: false,
      secretkey: null,
    };
  }

  componentDidMount = async () => {
    //------------------------calling gethash-----------------

    const contract = this.props.passedStates.contract;
    const account = this.props.passedStates.account;
    const key = await contract.methods.getpartyA().call();
    console.log("key from getPartyA method smart contract", key);
    console.log(typeof key.toString());
    this.setState({ secretkey: key.toString() });
    const reply = await contract.methods.getDataHash(key.toString()).call();
    console.log("reply from contract in partyA ", reply);

    //-----------------fetching from ipfs-------------------

    const res = await ipfs.catJSON(reply);
    this.setState({ ipfsres: res });
    const a = this.state.ipfsres.report;
    this.setState({ ans: a });
  };

  //----------------------------for valid------------------------
  changeHandler = async () => {
    await this.setState({ genuine: true });
    const obj = {
      report: this.state.ans,
      response: this.state.genuine,
    };
    //----------------------partyA response added to ipfs------------------------
    var myBuffer = buffer.from(JSON.stringify(obj));
    const response = await ipfs.add(myBuffer);
    console.log(response);
    console.log(obj);

    //-------------------secret key to hash mapping after adding partyA response ---------------
    const contract = this.props.passedStates.contract;
    const account = this.props.passedStates.account;
    await contract.methods
      .setDataHash(response, this.state.secretkey)
      .send({ from: account });
    await contract.methods
      .setpartyB(this.state.secretkey)
      .send({ from: account });
    await contract.methods.verdictA(this.state.genuine).send({ from: account });
  };

  //-----------------------------------------for invalid---------------

  changeHandlernotG = async () => {
    this.setState({ genuine: false });
    const obj = {
      report: this.state.ans,
      response: this.state.genuine,
    };

    //------------------------added response to ipfs -------------------------------

    var myBuffer = buffer.from(JSON.stringify(obj));
    const response = await ipfs.add(myBuffer);
    console.log(response);
    console.log(obj);

    //-------------------secret key to hash mapping after adding partyA response ---------------

    const contract = this.props.passedStates.contract;
    const account = this.props.passedStates.account;
    await contract.methods
      .setDataHash(response, this.state.secretkey)
      .send({ from: account });
    await contract.methods
      .setpartyB(this.state.secretkey)
      .send({ from: account });
    await contract.methods.verdictA(this.state.genuine).send({ from: account });
  };

  render() {
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
