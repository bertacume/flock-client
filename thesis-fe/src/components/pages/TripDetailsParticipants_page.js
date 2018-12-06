import React, { Component } from 'react';
import { Query } from "react-apollo";
import GET_PARTICIPANTS_DETAILS from '../apollo/queries/get_participants_details';
import GET_TRIP_DETAILS_PARTICIPANTS_SUB from '../apollo/subscriptions/get_trip_details_participants_sub'
import ParticipantsDashboard from '../container/ParticipantsDashboard';
import { Loading } from '../presentational/Loading';


class TripDetails_page extends Component {


  render() {
    const ParticipantsDetailsApollo = () => (
      <Query
      query={GET_PARTICIPANTS_DETAILS}
      errorPolicy="all"
      fetchPolicy="network-only"
      variables ={{tripID : this.props.match.params.id}}
    >
      {({ subscribeToMore, loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) {
          console.error(error);
          window.location.replace('/auth');
        }
        if (data.trip) {
          return (
            <div>
              <ParticipantsDashboard info={data} location={this.props.location} history={this.props.history} match={this.props.match}
              sub={ () => subscribeToMore({
                document: GET_TRIP_DETAILS_PARTICIPANTS_SUB,
                variables: {tripID : this.tripID },
                updateQuery: (prev, {subscriptionData}) => {
                  if (!subscriptionData.data || subscriptionData.data.tripInfoChanged.id !== this.tripID) return prev;
                  return {trip: subscriptionData.data.tripInfoChanged}
                }
              })}
              />
            </div>
          );
        }
        else if (!data.trip) {
          return (
            <h1>
              Sorry, trip not found
            </h1>
          )
        }
      }
    }
    </Query>
    );
    return (
      <ParticipantsDetailsApollo />
    );
  }
}

export default TripDetails_page

/*
  Here we should go knowing both the user id and the trip id. We will get from the db:
  on schema:
    - name,
    - participants,
    - destination.
    - budget,
    - timeFrame

  should the id it will try to fetch from graphql should come from the url -> allow for direct access to the url and
  independence
*/