import React, { Component } from 'react';
import Navigation from './Navigation';
import MyTripsDashboard from './MyTripsDashboard';
import UserApollo from '../apollo/User';

class MyTrips_page extends Component {

  render() {
    const K = UserApollo;

    return (
      <div>
        <Navigation textContent="My trips" />
        <MyTripsDashboard history={this.props.routerMethods.history}/>
        <K />
      </div>
    );
  }
}

export default MyTrips_page;

/*
  Here is the first page the user should naturally join. We should receive from this page the user ID and will fetch:
  on schema :
    email
    firstName
    lastName
  not on schema:
    profile image
    information about subscribed trips
*/