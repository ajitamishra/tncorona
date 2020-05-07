import React from "react";

function PartyA(props) {
  return (
    <div>
      <p>{props.report}</p>
      <button>Genuine</button>
      <button>Not Genuine</button>
    </div>
  );
}

export default PartyA;
