import React, { Component } from 'react';
import Navigation from '../../components/container/Navigation';
import MyTripsDashboard from '../../components/container/MyTripsDashboard';
import { Query } from "react-apollo";
import GET_MY_TRIPS from '../apollo/queries/get_my_trips';


class MyTrips_page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userID : localStorage.getItem('id')
    }
  }


  render() {
    console.log(this.props)
    const MyTripsApollo = () => (
      <Query
        query={GET_MY_TRIPS}
        variables={{ id: this.state.userID }}
        errorPolicy="all"
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            console.log('error')
            window.location.replace('/auth');
          }
          if (data) {
            return (
              <div>
                <Navigation textContent="My trips" avatarURL={data.self.avatarURL} />
                <MyTripsDashboard history={this.props.history} info={data.allTrips} />
              </div>
            );
          }
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