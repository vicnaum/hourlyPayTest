import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import { ContractData, ContractForm } from "drizzle-react-components";
import ContractDataTimer from "./ContractDataTimer";
import ContractDataETH from "./ContractDataETH";
import ContractDataBool from "./ContractDataBool";
import ContractDataTS from "./ContractDataTS";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {address: props.contractAddress};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({address: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state.address);
    this.props.changeAddress(this.state.address);
  }

  render() {
    const { drizzleStatus, accounts } = this.props;

    if (drizzleStatus.initialized) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Hourly Pay</h1>
            <p>
              <strong>Contract Address: </strong>
              <input type="text" value={this.state.address} size="45" onChange={this.handleChange} />
              <button onClick={this.handleSubmit}>Change</button>
            </p>
            <p><strong>Client/Owner: </strong><ContractData contract="HourlyPay" method="owner" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Employee: </strong><ContractData contract="HourlyPay" method="employeeAddress" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Contract Balance: </strong><ContractDataETH contract="HourlyPay" method="getBalance" methodArgs={[{ from: accounts[0] }]}/> ETH</p>
            <hr />
            <p><strong>Hourly Rate: </strong><ContractDataETH contract="HourlyPay" method="ratePerHourInWei" methodArgs={[{ from: accounts[0] }]}/> ETH/hour</p>
            <p><strong>Payday Frequency: </strong><ContractData contract="HourlyPay" method="paydayFrequencyInDays" methodArgs={[{ from: accounts[0] }]}/> days</p>
            <p><strong>Daily Hour Limit: </strong><ContractData contract="HourlyPay" method="dailyHourLimit" methodArgs={[{ from: accounts[0] }]}/> hours</p>
            <p><strong>Contract Duration: </strong><ContractData contract="HourlyPay" method="contractDurationInDays" methodArgs={[{ from: accounts[0] }]}/> days</p>
            <hr />
            <p><strong>Hired? </strong><ContractDataBool contract="HourlyPay" method="hired" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Contract has enough funds to start? </strong><ContractDataBool contract="HourlyPay" method="hasEnoughFundsToStart" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Can Start Work? </strong><ContractDataBool contract="HourlyPay" method="canStartWork" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Can Stop Work? </strong><ContractDataBool contract="HourlyPay" method="canStopWork" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Working? </strong><ContractDataBool contract="HourlyPay" method="working" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Currently working: </strong><ContractData contract="HourlyPay" method="getWorkSecondsInProgress" methodArgs={[{ from: accounts[0] }]}/> seconds</p>
            {/* <p><strong>Working Overtime? </strong><ContractDataBool contract="HourlyPay" method="isOvertime" methodArgs={[{ from: accounts[0] }]}/></p> */}
            {/* <p><strong>New day came? </strong><ContractDataBool contract="HourlyPay" method="isNewDay" methodArgs={[{ from: accounts[0] }]}/></p> */}
            <hr />
            <p><strong>Contract Start date: </strong><ContractDataTS contract="HourlyPay" method="beginTimeTS" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Last Started Work: </strong><ContractDataTS contract="HourlyPay" method="startedWorkTS" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Current day begin: </strong><ContractDataTS contract="HourlyPay" method="currentDayTS" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Last payday time: </strong><ContractDataTS contract="HourlyPay" method="lastPaydayTS" methodArgs={[{ from: accounts[0] }]}/></p>
            <p><strong>Current time: </strong><ContractDataTS contract="HourlyPay" method="currentTime" methodArgs={[{ from: accounts[0] }]}/></p>
            <hr />
            <p><strong>Worked Today: </strong><ContractData contract="HourlyPay" method="workedTodayInSeconds" methodArgs={[{ from: accounts[0] }]}/> seconds</p>
            <p><strong>Earnings: </strong><ContractDataETH contract="HourlyPay" method="earnings" methodArgs={[{ from: accounts[0] }]}/> ETH</p>
                        

          </header>
        </div>
      );
    }

    return <div>Loading dapp...</div>;
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    HourlyPay: state.contracts.HourlyPay
  };
};

const AppContainer = drizzleConnect(App, mapStateToProps);
export default AppContainer;