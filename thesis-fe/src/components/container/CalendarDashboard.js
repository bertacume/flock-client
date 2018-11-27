import React, { Component } from 'react';
import styled from 'react-emotion'
import plus from '../../assets/svg/plus.svg';


class MyTripsDashboard extends Component {

  redirectToTrip = (id) => {
    return () => {
      this.props.history.push('/tripdetails/' + id)
    }

  }
  render() {

    console.log(this.props);

    return (
      <h1>
        cALL
      </h1>
    );
  }
}

export default MyTripsDashboard;