import React, { Component } from "react";
// import Express from "express";
const ipfs = require("ipfs-http-client");
const buffer = require("Buffer");
const IPFS = ipfs({ host: "localhost", port: 5001, protocol: "http" });
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
      console.log("IPFS Rsult", res);
      if (err) {
        console.log(err);
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
