import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Test1 from "../Components/Test1";
import PartyA from "./PartyA";
import PartyB from "./PartyB";
import PartyC from "./PartyC";
function Analysis(props) {
  console.log("Inside analysis", props.passedStates.account);

  return (
    <Router>
      <div>
        <button>
          <Link to="/PartyA">PartyA </Link>
        </button>
        <button>
          <Link to="/PartyB">PartyB</Link>
        </button>
        <button>
          <Link to="/PartyC">PartyC</Link>
        </button>
        <button>
          <Link to="/Test1">Report</Link>
        </button>
        <Switch>
          <Route path="/PartyA">
            <PartyA {...props} />
          </Route>
          <Route path="/PartyB">
            <PartyB {...props} />
          </Route>
          <Route path="/PartyC">
            <PartyC />
          </Route>
          <Route path="/Test1">
            <Test1 {...props} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Analysis;
