import React, { Component } from 'react';
import styled from 'react-emotion'
// import GET_TRIP_DETAILS from '../apollo/queries/get_trip_details';
// import GET_TRIP_DETAILS_PARTICIPANTS_SUB from '../apollo/queries/get_trip_details_participants_sub';
// import GET_TRIP_DETAILS_DESTINATION_SUB from '../apollo/queries/get_trip_details_destination_sub';
// import GET_TRIP_DETAILS_BUDGET_SUB from '../apollo/queries/get_trip_details_budget_sub';
// import GET_TRIP_DETAILS_CALENDAR_SUB from '../apollo/queries/get_trip_details_calendar_sub';
import TripParticipants from '../presentational/TripParticipants';
import TripDestination from '../presentational/TripDestination';
import TripCalendar from '../presentational/TripCalendar';
import TripBudget from '../presentational/TripBudget';

const Container = styled('div')`
width: 100vw;
height: 90vh;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
`


class GeneralInfoDashboard extends Component {
  redirectParent = (str) => {
    return () => {
      this.props.history.push('/tripdetails/' + this.props.match.params.id + '/' + str)
    }
  }

  componentDidMount () {
    this.props.sub();
  }

  render() {
    return (
      <div>
        <TripParticipants info={this.props.info.participants} redirectParent={this.redirectParent('participants')} />
        <TripDestination info={this.props.info.destination} redirectParent={this.redirectParent('destination')} />
        <TripBudget info={this.props.info.budget} redirectParent={this.redirectParent('budget')} />
        <TripCalendar info={this.props.info.calendar} redirectParent={this.redirectParent('calendar')} />
      </div>
    );
  }
}

export default GeneralInfoDashboard;