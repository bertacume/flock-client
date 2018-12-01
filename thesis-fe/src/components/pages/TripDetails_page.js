import React, { Component } from 'react';
import { Navbar } from '../presentational/Navbar';
import ballon from '../../assets/trip.png';
import styled from 'react-emotion'
import { Query } from "react-apollo";
import GET_TRIP_DETAILS from '../apollo/queries/get_trip_details';
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
          variables={{ tripID: this.state.tripID }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) console.log(error);
            if (data.trip) {
              return (
                <div>
                  <Navbar
                    path={`/mytrips`}
                    title={data.trip.name}
                    history={this.props.history}
                    icon={ballon}
                  />
                  <GeneralInfo>
                    <TripParticipants info={data.trip.participants} redirectParent={this.redirectParent('participants')} />
                    <TripDestination info={data.trip.destination} redirectParent={this.redirectParent('destination')} />
                    <TripBudget redirectParent={this.redirectParent('budget')} info={data.trip.budget} />
                    <TripCalendar info={data.trip.timeFrame} redirectParent={this.redirectParent('calendar')} />
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