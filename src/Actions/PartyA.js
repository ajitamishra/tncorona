import React from "react";

function PartyA(props) {
  //------------------------------- Ipfs  setup ----------------------

  const IPFS = require("ipfs-mini");
  const buffer = require("Buffer");
  const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });

  //------------------------calling gethash-----------------

  const contract = props.passedStates.contract;
  const account = props.passedStates.account;
  const reply = contract.methods.getDataHash(secretkey).call();
  console.log("reply from contract", reply);

  //-----------------fetching from ipfs-------------------

  const ipfsres = ipfs.catJSON(reply);
  console.log(ipfsres);

  return (
    <div>
      <p>hello</p>
      <button>Genuine</button>
      <button>Not Genuine</button>
    </div>
  );
}

export default PartyA;
