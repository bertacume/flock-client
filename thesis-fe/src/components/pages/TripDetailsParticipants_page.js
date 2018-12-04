import React, { Component } from 'react';
import { Query } from "react-apollo";
import GET_PARTICIPANTS_DETAILS from '../apollo/queries/get_participants_details';
import ParticipantsDashboard from '../container/ParticipantsDashboard';


class TripDetails_page extends Component {


  render() {
    const ParticipantsDetailsApollo = () => (
      <Query
      query={GET_PARTICIPANTS_DETAILS}
      errorPolicy="all"
      variables ={{tripID : this.props.match.params.id}}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) console.error(error);
        if (data.trip) {
          return (
            <div>
              <ParticipantsDashboard info={data} location={this.props.location} history={this.props.history} match={this.props.match}/>
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