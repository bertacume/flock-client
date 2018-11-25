import React, { Component } from 'react';
import Navigation from '../../components/container/Navigation';
import MyTripsDashboard from '../../components/container/MyTripsDashboard';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class MyTrips_page extends Component {

  render() {
    const MyTripsApollo = () => (
      <Query
      query={gql`
        {
          User (id:1)
          {
            avatarURL
          }
          tripsByUserID (userID:1) {
            id,
            name,
            participants {
              firstName
            },
            destination {
              chosenDestination {
                name
              }
            },
            budget {
              chosenBudget {
                value
              }
            },
            timeFrame {
              chosenTimeFrame {
                startDate,
                endDate
              }
            }
          }
        }
      `}
      errorPolicy="all"
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        return (
          <div>
            <Navigation textContent="My trips" avatarURL={data.User.avatarURL} />
            <MyTripsDashboard history={this.props.routerMethods.history} info={data.tripsByUserID} />
          </div>
        );
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