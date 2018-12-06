import React, { Component } from 'react';
import TripParticipants from '../presentational/TripParticipants';
import TripDestination from '../presentational/TripDestination';
import TripCalendar from '../presentational/TripCalendar';
import TripBudget from '../presentational/TripBudget';
import styled from 'react-emotion';


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
      <Container>
        <TripParticipants info={this.props.info.participants} redirectParent={this.redirectParent('participants')} />
        <TripDestination info={this.props.info.destination} redirectParent={this.redirectParent('destination')} />
        <TripBudget info={this.props.info.budget} redirectParent={this.redirectParent('budget')} />
        <TripCalendar info={this.props.info.calendar} redirectParent={this.redirectParent('calendar')} />
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`


export default GeneralInfoDashboard;