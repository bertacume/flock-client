import React, { Component } from 'react';
import { Query } from "react-apollo";
import GET_CALENDAR_DETAILS from '../apollo/queries/get_calendar_details';
import GET_TRIP_DETAILS_CALENDAR_SUB from '../apollo/subscriptions/get_trip_details_calendar_sub';
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
      {({ subscribeToMore,  loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log(error);
        }
        if (data.trip) {
          return (
            <div>
              <CalendarDashboard info={data} location={this.props.location} history={this.props.history} match={this.props.match}
              sub={ () => subscribeToMore({
                document: GET_TRIP_DETAILS_CALENDAR_SUB,
                variables: {tripID : this.tripID },
                updateQuery: (prev, {subscriptionData}) => {
                  if (!subscriptionData.data || subscriptionData.data.tripInfoChanged.id !== this.tripID) return prev;
                  const newData = {
                    ...prev,
                    trip: {
                      ...prev.trip,
                      timeFrame: subscriptionData.data.tripInfoChanged.timeFrame
                    }
                  }
                  return newData;
                }
            })
          }
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
      <CalendarDetailsApollo />
    );
  }
}

export default TripDetailsCalendar_page

