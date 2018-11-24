import React, { Component } from 'react';
import Navigation from './Navigation';
import MyTripsDashboard from './MyTripsDashboard';


class MyTrips_page extends Component {

  render() {
    return (
      <div>
        <Navigation textContent="My trips" />
        <MyTripsDashboard history={this.props.routerMethods.history}/>
      </div>
    );
  }
}

export default MyTrips_page;