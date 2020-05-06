import React, { useState } from "react";

function Test1() {
  //   const ipfs = require("ipfs-http-client");
  const buffer = require("Buffer");
  //   const IPFS = ipfs({ host: "ipfs.infura.io", port: 5001, protocol: "https" });
  const IPFS = require("ipfs-mini");
  const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    report: "",
  });
  const { name, email, contact, report } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(typeof formData);
    var myBuffer = buffer.from(JSON.stringify(formData));
    console.log(typeof myBuffer);
    let response;
    // await IPFS.add(myBuffer, (err, res) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log("IPFS Working");
    //     console.log("IPFS Rsult", res[0].hash);
    //     response = res[0].hash;
    //   }
    // });
    // // const node = await ipfs.create();

    // const data = await IPFS.cat(response);
    // console.log(data);
    response = await ipfs.add(myBuffer);
    console.log(response);

    const ipfsres = await ipfs.catJSON(response);
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
