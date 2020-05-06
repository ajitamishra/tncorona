import React, { Component } from "react";
// import Express from "express";
const ipfs = require("ipfs-http-client");
const buffer = require("Buffer");
const IPFS = ipfs({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      report: null,
    };
  }

  changeHandler = (e) => {
    this.setState({ report: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log("Submission queued");
    // const data = {
    //   id: this.state.report,
    // };
    // console.log(typeof JSON.parse(JSON.stringify(data)));
    var myBuffer = buffer.from(this.state.report);
    console.log(myBuffer);
    IPFS.add(myBuffer, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("IPFS Working");
        console.log("IPFS Rsult", res[0].hash);
      }
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input
            type="file"
            name="report"
            onChange={this.changeHandler}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Report;
