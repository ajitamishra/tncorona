import React, { useState, useEffect } from "react";
import Web3 from "web3";

import FixNix from "../abis/FixNix.json";

const buffer = require("Buffer");

const _ipfs = require("ipfs-http-client");
const _IPFS = _ipfs({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const IPFS = require("ipfs-mini");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const ganache_url = "HTTP://127.0.0.1:7545";

function Test1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    report: "",
  });
  const [fileHash, setFileHash] = useState();
  const [fileBuffer, setFileBuffer] = useState();
  const [contract, setContract] = useState();
  const { name, email, contact, report } = formData;

  //The below portion is executed only once after the first render cycle
  useEffect(() => {
    console.log(
      "-------------------------------------------------------------------------"
    );
    async function loadBlockChain() {
      const web3 = new Web3(ganache_url);
      const networkId = await web3.eth.net.getId();
      const networkData = FixNix.networks[networkId];

      if (networkData) {
        console.log("Connected to proper blockchain network");
        const abi = FixNix.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);
        if (contract) {
          setContract(contract);
        } else {
          alert("Contract not loaded");
        }
      }
    }

    loadBlockChain()
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFileBuffer(Buffer(reader.result));
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(typeof formData);

    var myBuffer = buffer.from(JSON.stringify(formData));
    console.log(typeof myBuffer);
    let response;

    response = await ipfs.add(myBuffer);
    console.log(response);

    // var resFileHash
    _IPFS.add(fileBuffer, (err, res) => {
      setFileHash(res[0].hash);
      console.log("File Hash: ", res[0].hash);
    });

    const ipfsres = await ipfs.catJSON(response);
    console.log(ipfsres);
  };
  return (
    <div>
      {" "}
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="Description">Description</label>
        <br />
        <textarea
          rows="4"
          cols="50"
          name="report"
          id="report"
          value={report}
          onChange={(e) => onChange(e)}
        ></textarea>
        <br />
        <br />
        <label>Personal details</label>
        <br />
        <br />
        <label htmlFor="username">Enter username</label>
        <input
          id="username"
          name="name"
          type="text"
          value={name}
          onChange={(e) => onChange(e)}
        />

        <label htmlFor="email">Enter your email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <label htmlFor="contact">Contact No.</label>
        <input
          id="contact"
          name="contact"
          type="number"
          value={contact}
          onChange={(e) => onChange(e)}
        />
        <input type="file" onChange={captureFile} />

        <button>Send data!</button>
      </form>
    </div>
  );
}

export default Test1;
