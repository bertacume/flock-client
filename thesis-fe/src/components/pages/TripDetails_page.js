import React, { Component } from 'react';
import { Navbar } from '../presentational/Navbar';
import ballon from '../../assets/trip.png';
import styled from 'react-emotion'
import { Query } from "react-apollo";
import GET_TRIP_DETAILS from '../apollo/queries/get_trip_details';
import GET_TRIP_DETAILS_PARTICIPANTS_SUB from '../apollo/queries/get_trip_details_participants_sub';
import GET_TRIP_DETAILS_DESTINATION_SUB from '../apollo/queries/get_trip_details_destination_sub';
import GET_TRIP_DETAILS_BUDGET_SUB from '../apollo/queries/get_trip_details_budget_sub';
import GET_TRIP_DETAILS_CALENDAR_SUB from '../apollo/queries/get_trip_details_calendar_sub';
import TripParticipants from '../presentational/TripParticipants';
import TripDestination from '../presentational/TripDestination';
import TripCalendar from '../presentational/TripCalendar';
import TripBudget from '../presentational/TripBudget';

class TripDetails_page extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      tripID: this.props.location.pathname.split('/')[2]
    })
  }

  redirectParent = (str) => {
    return () => {
      this.props.history.push('/tripdetails/' + this.props.match.params.id + '/' + str)
    }
  }
  render() {
    const TripDetailsApollo = () => (
<Container>
      <Query
      query={GET_TRIP_DETAILS}
      errorPolicy="all"
      variables ={{tripID : this.props.match.params.id }}
    >
      {({ subscribeToMore, ...result}) => {
        return (
          (result.data.trip) ?
          <div>
            <Navbar
                    path={`/mytrips`}
                    title={result.data.trip.name}
                    history={this.props.history}
                    icon={ballon}
                  />
            <GeneralInfo>
              <TripParticipants info={result.data.trip.participants} redirectParent={this.redirectParent('participants')} sub={
                () => subscribeToMore({
                  document: GET_TRIP_DETAILS_PARTICIPANTS_SUB,
                  variables: {tripID : this.props.match.params.id },
                  updateQuery: (prev, {subscriptionData}) => {
                    console.log(subscriptionData);
                    if (!subscriptionData.data) return prev;
                    const newObject = {
                      ...prev,
                      trip: {
                        ...prev.trip,
                        participants: subscriptionData.data.tripInfoChanged.participants
                      }
                    }
                    return newObject;
                  }
                })
              } />
              <TripDestination info={result.data.trip.destination} redirectParent={this.redirectParent('destination')} sub={
                () => ({
                  document: GET_TRIP_DETAILS_DESTINATION_SUB,
                  variables: {tripID : this.props.match.params.id },
                  updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    const newObject = {
                      ...prev,
                      trip: {
                        ...prev.trip,
                        participants: subscriptionData.data.tripInfoChanged.destination
                      }
                    }
                    return newObject;
                  }
                })
              } />
              <TripBudget redirectParent={this.redirectParent('budget')} info={result.data.trip.budget} sub={
                () => ({
                  document: GET_TRIP_DETAILS_BUDGET_SUB,
                  variables: {tripID : this.props.match.params.id },
                  updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    const newObject = {
                      ...prev,
                      trip: {
                        ...prev.trip,
                        participants: subscriptionData.data.tripInfoChanged.budget
                      }
                    }
                    return newObject;
                  }
                })
              } />
              <TripCalendar info={result.data.trip.timeFrame} redirectParent={this.redirectParent('calendar')} sub={
                () => ({
                  document: GET_TRIP_DETAILS_CALENDAR_SUB,
                  variables: {tripID : this.props.match.params.id },
                  updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    const newObject = {
                      ...prev,
                      trip: {
                        ...prev.trip,
                        participants: subscriptionData.data.tripInfoChanged.timeFrame
                      }
                    }
                    return newObject;
                  }
                })
              }/>
            </GeneralInfo>
          </div>
          :
          <h1>Loading</h1>
        )
      }
    }
    </Query>
    </Container>
    );
    return (
      <TripDetailsApollo />
    );
  }
}

export default TripDetails_page

const Container = styled('div')`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const GeneralInfo = styled('div')`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
