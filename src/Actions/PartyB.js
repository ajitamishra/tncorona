import React, { Component } from "react";
const IPFS = require("ipfs-mini");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
const buffer = require("Buffer");
class PartyB extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ipfsres: {},
      report: null,
      ansa: null,
      ansb: null,
      approved: false,
      secretkey: null,
    };
  }
  componentDidMount = async () => {
    //------------------------calling gethash-----------------

    const contract = this.props.passedStates.contract;
    const account = this.props.passedStates.account;
    const key = await contract.methods.getpartyB().call();
    console.log("key from getPartyB method smart contract", key);
    console.log(typeof key.toString());
    this.setState({ secretkey: key.toString() });
    const reply = await contract.methods.getDataHash(key.toString()).call();
    console.log("reply from contract in partyB ", reply);

    //-----------------fetching from ipfs-------------------

    const res = await ipfs.catJSON(reply);
    this.setState({ ipfsres: res });
    const a = this.state.ipfsres.report;
    const b = this.state.ipfsres.response;
    console.log(b);
    this.setState({ report: a });
    this.setState({ ansa: b });
  };
  changeHandler = async () => {
    await this.setState({ approved: true });
    const obj = {
      report: this.state.report,
      approve: this.state.approved,
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
      .verdictB(this.state.approved)
      .send({ from: account });
  };

  //-----------------------------------------for invalid---------------

  changeHandlernotG = async () => {
    this.setState({ genuine: false });
    const obj = {
      report: this.state.report,
      approve: this.state.approved,
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
      .verdictB(this.state.approved)
      .send({ from: account });
  };

  render() {
    console.log(this.state.ansa);
    return (
      <div>
        <div>
          <p>{this.state.report}</p>
        </div>
        <div>{this.state.ansa && <p>Genuine</p>}</div>
        <button onClick={this.changeHandler}>Approved</button>
        <button onClick={this.changeHandlernotG}>Not Approved</button>
      </div>
    );
  }
}

export default PartyB;
