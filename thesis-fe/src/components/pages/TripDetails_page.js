import React, { Component } from 'react';
import Navigation from '../container/Navigation';
import styled from 'react-emotion'
import { Query } from "react-apollo";
import GET_TRIP_DETAILS from '../apollo/get_trip_details';
import TripParticipants from '../presentational/TripParticipants';
import TripDestination from '../presentational/TripDestination';
import TripCalendar from '../presentational/TripCalendar';
import TripBudget from '../presentational/TripBudget';

const GeneralInfo = styled('div')`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
`;

class TripDetails_page extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      tripID : this.props.location.pathname.split('/')[2]
    })
  }

  redirectParent = (str) => {
    return () => {
      this.props.history.push('/tripdetails/' + this.state.tripID + '/' + str)
    }
  }
  render() {
    const TripDetailsApollo = () => (
      <Query
      query={GET_TRIP_DETAILS}
      errorPolicy="all"
      variables ={{tripID : this.state.tripID }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) console.log(error);
        if (data.trip) {
          return (
            <div>
            <Navigation textContent={data.trip.name}/>
            <GeneralInfo>
              <TripParticipants info={data.trip.participants} redirectParent={this.redirectParent('participants')} />
              <TripDestination info={data.trip.destination} redirectParent={this.redirectParent('destination')}/>
              <TripCalendar info={data.trip.timeFrame} redirectParent={this.redirectParent('calendar')}/>
              <TripBudget redirectParent={this.redirectParent('budget')}/>
            </GeneralInfo>
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
      <TripDetailsApollo />
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