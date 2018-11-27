import React, { Component } from 'react';
import styled from 'react-emotion'
import plus from '../../assets/svg/plus.svg';


class BudgetDashboard extends Component {

  redirectToTripDetails = (id) => {
    return () => {
      this.props.history.push('/tripdetails/' + id)
    }

  }
  render() {
    console.log(this.props);
    return (
      <h1>
        helo
      </h1>
    );
  }
}

export default BudgetDashboard;