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
    fetch("/api/form-submit");
    console.log("Submission queued");
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
          <lable>Description</lable>
          <br></br>
          <textarea
            rows="4"
            cols="50"
            name="report"
            id="report"
            onChange={this.changeHandler}
          ></textarea>
          <br></br>

          <br></br>
          <label>Personal details</label>
          <br></br>
          <div>
            <br></br>
            Name: <input type="text" name="name" id="name"></input>
            <br></br>
            Email: <input type="email" name="email" id="email"></input>
            <br></br>
            Contact: <input type="number" id="contact" name="contact"></input>
            <br></br>
          </div>
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Report;
