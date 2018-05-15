import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { DrizzleProvider } from "drizzle-react";
import HourlyPay from "./contracts/HourlyPay.json";

class Main extends React.Component {

  options = {
    web3: {
      block: false,
      fallback: {
        type: "ws",
        url: "ws://127.0.0.1:7545"
      }
    },
    contracts: [HourlyPay],
    events: {}
  };

  componentWillMount() {
    if (this.props.match.params.address) {
      this.options.contracts[0].networks['3'].address = this.props.match.params.address;
    }
  }

  changeAddress = (address) => {
    this.props.history.push(`/${address}`);
    window.location.reload();
  } 

  render() {
    // if (this.props.match.params.address) {
    //   this.options.contracts[0].networks['3'].address = this.props.match.params.address;
    // }
    return (
      <DrizzleProvider options={this.options} key={this.props.match.params.address}>
        <App changeAddress={this.changeAddress} contractAddress={this.options.contracts[0].networks['3'].address} key={this.props.match.params.address} />
      </DrizzleProvider>
    )
  };
}

export default Main;