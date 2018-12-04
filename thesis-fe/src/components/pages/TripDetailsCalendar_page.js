import React, { Component } from 'react';
import { Query } from "react-apollo";
import GET_CALENDAR_DETAILS from '../apollo/queries/get_calendar_details';
import CalendarDashboard from '../container/CalendarDashboard';


// const GeneralInfo = styled('div')`
//   width: 100vw;
//   height: 90vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 5vh;
// `;

class TripDetailsCalendar_page extends Component {


  render() {
    const CalendarDetailsApollo = () => (
      <Query
      query={GET_CALENDAR_DETAILS}
      errorPolicy="all"
      variables ={{tripID: this.props.match.params.id}}
      fetchPolicy= 'network-only'
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log('aaa')
          console.log(error);
        }
        if (data.trip) {
          return (
            <div>
              <CalendarDashboard info={data} location={this.props.location} history={this.props.history} match={this.props.match} />
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
      <CalendarDetailsApollo />
    );
  }
}

export default TripDetailsCalendar_page

