import React, { useState } from "react";
import UID from "uid";
import Analysis from "../Actions/Analysis";
function Test1(props) {
  //   const ipfs = require("ipfs-http-client");
  //   const IPFS = ipfs({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
  // console.log("Inside test", props.passedStates);
  //------------------------------- Ipfs  setup ----------------------

  const IPFS = require("ipfs-mini");
  const buffer = require("Buffer");
  const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  // ------------------------formdata get and set--------------------------------------

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    report: "",
  });
  const { name, email, contact, report } = formData;
  const contract = props.passedStates.contract;
  const account = props.passedStates.account;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //----------------data submission---------------------------

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof formData);
    var myBuffer = buffer.from(JSON.stringify(formData));
    console.log(typeof myBuffer);
    let response, ipfsres;

    //--------------------adding to ipfs----------------------------

    response = await ipfs.add(myBuffer);
    console.log(response);

    // -------------------secret key generation-----------------------------
    const secretkey = UID();
    console.log(secretkey);

    //----------------setting hash on smart contract--------------

    await contract.methods
      .setDataHash(response, secretkey)
      .send({ from: account });
    await contract.methods.setpartyA(secretkey).send({ from: account });
    console.log(typeof secretkey);
    const reply = await contract.methods.getDataHash(secretkey).call();
    console.log("reply from contract", reply);

    //----------------ipfs cat---------------------

    ipfsres = await ipfs.catJSON(response);
    console.log(ipfsres);
  };
  return (
    <div>
      {" "}
      <form onSubmit={(e) => onSubmit(e)}>
        <lable htmlFor="Description">Description</lable>
        <br></br>
        <textarea
          rows="4"
          cols="50"
          name="report"
          id="report"
          value={report}
          onChange={(e) => onChange(e)}
        ></textarea>
        <br></br>
        <br></br>
        <label>Personal details</label>
        <br></br>
        <br></br>
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
        <button>Send data!</button>
      </form>
    </div>
  );
}

export default Test1;
