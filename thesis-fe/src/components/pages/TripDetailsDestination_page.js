import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Container } from '../styledComponents/styledComponents';
import GET_DESTINATION_DETAILS from '../apollo/queries/get_destination_details';
import DestinationDashboard from '../container/DestinationDashboard';
import GET_TRIP_DETAILS_DESTINATION_SUB from '../apollo/subscriptions/get_trip_details_destination_sub';

class TripDetailsDestination_page extends Component {
  tripID = this.props.match.params.id;

  render() {
    const DestinationDetailsApollo = () => (
      <Query
        query={GET_DESTINATION_DETAILS}
        errorPolicy="all"
        fetchPolicy="network-only"
        variables={{ tripID: this.tripID }}
      >
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) console.error(error);
          if (data.trip) {
            return (
              <Container>
                <DestinationDashboard
                info={data}
                tripID={this.tripID}
                match={this.props.match}
                location={this.props.location}
                history={this.props.history}
                sub={() => subscribeToMore({
                  document: GET_TRIP_DETAILS_DESTINATION_SUB,
                  variables: {tripID : this.tripID },
                  updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data || subscriptionData.data.tripInfoChanged.id !== this.tripID) return prev;
                    const newData = {
                      ...prev,
                      trip: {
                        ...prev.trip,
                        destination: subscriptionData.data.tripInfoChanged.destination
                      }
                    }
                    return newData;
                  }
                })}
                />
              </Container>
            );
          }
          else {
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
      <DestinationDetailsApollo />
    );
  }
}

export default TripDetailsDestination_page

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