import React, { Component } from 'react';
import Navigation from '../../components/container/Navigation';
import MyTripsDashboard from '../../components/container/MyTripsDashboard';
import { Query } from "react-apollo";
import GET_MY_TRIPS from '../apollo/queries/get_my_trips';
import GET_MY_TRIPS_SUB from '../apollo/queries/get_my_trips_sub';

class MyTrips_page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID : localStorage.getItem('id')
    }
  }


  render() {
    const MyTripsApollo = () => (
      <Query
        query={GET_MY_TRIPS}
        variables={{ id: this.state.userID }}
        errorPolicy="all"
        fetchPolicy='cache-and-network'
      >
        {({ subscribeToMore, loading, ...result}) => {
          return (
            (!loading) ?
              <div>
                <Navigation textContent="My trips" avatarURL={result.data.self.avatarURL} />
                <MyTripsDashboard history={this.props.history} info={result.data.self.trips}
                sub={
                  () => subscribeToMore({
                    document: GET_MY_TRIPS_SUB,
                    variables: {},
                    updateQuery: (prev, {subscriptionData}) => {
                      if (!subscriptionData.data) return prev;
                      const newObject = prev;
                      // newObject.self.trips.push(subscriptionData.data.tripInfoChanged)
                      return newObject;
                    }
                  })
                }
                />
              </div>
            :
              <h1>Loading</h1>
          )

        }}
      </Query>
    );
    return (
      <MyTripsApollo />
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