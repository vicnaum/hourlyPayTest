import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ContractDataTimer extends Component {
  constructor(props, context) {
    super(props)

    this.state = {
      elapsed: 0
    }

    this.contracts = context.drizzle.contracts

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;


    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = this.props.methodArgs ? this.props.methodArgs : []
    this.dataKey = this.contracts[this.props.contract].methods[this.props.method].cacheCall(...methodArgs)

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
          this.fnABI = abi[i]

          break
      }
    }
  }

  componentDidMount() {

    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState({elapsed: new Date() - this.startTime});
  }

  componentWillReceiveProps() {
    this.startTime = new Date();
  }

  render() {
    // Contract is not yet intialized.
    if(!this.props.contracts[this.props.contract].initialized) {
      return (
        <span>Initializing...</span>
      )
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(this.dataKey in this.props.contracts[this.props.contract][this.props.method])) {
      return (
        <span>Fetching...</span>
      )
    }

    // Show a loading spinner for future updates.
    var pendingSpinner = this.props.contracts[this.props.contract].synced ? '' : ' 🔄'

    var displayData = parseFloat(this.props.contracts[this.props.contract][this.props.method][this.dataKey].value);

    return(
      <span>{displayData + Math.round(this.state.elapsed/1000)}{pendingSpinner}</span>
    )
  }
}

ContractDataTimer.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(ContractDataTimer, mapStateToProps)