import React, { Component } from "react";
import Report from "./Components/Report";
import getWeb3 from "./getWeb3";
import Test1 from "./Components/Test1";
import Corona from "./Corona";
import Analysis from "./Actions/Analysis";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      contract: null,
      account: null,
      accounts: null,
    };
  }
  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Corona.networks[networkId];
      const instance = new web3.eth.Contract(
        Corona.abi,
        deployedNetwork.address
      );
      // console.log(deployedNetwork);
      this.setState({
        web3,
        accounts,
        contract: instance,
      });
      this.setState({ account: accounts[0] });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  render() {
    if (!this.state.web3)
      return (
        <div>
          <p>Failed to load web3, accounts, or contract.</p>
        </div>
      );
    return (
      // <Router>
      //   <div>
      //     <button>
      //       <Link to="/Analysis">Analysis</Link>
      //     </button>
      //   </div>
      // </Router>
      <div>
        <Analysis passedStates={this.state} />
      </div>
    );
  }
}

export default App;
