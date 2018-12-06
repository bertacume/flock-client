import React, { Component } from 'react';
import { Query } from "react-apollo";
import GET_CALENDAR_DETAILS from '../apollo/queries/get_calendar_details';
import GET_TRIP_DETAILS_CALENDAR_SUB from '../apollo/subscriptions/get_trip_details_calendar_sub';
import CalendarDashboard from '../container/CalendarDashboard';
import { Loading } from '../presentational/Loading';

class TripDetailsCalendar_page extends Component {
  tripID = this.props.match.params.id;

  render() {
    const CalendarDetailsApollo = () => (
      <Query
      query={GET_CALENDAR_DETAILS}
      errorPolicy="all"
      variables ={{tripID: this.tripID}}
      fetchPolicy= 'network-only'
    >
      {({ subscribeToMore,  loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) {
          console.log(error);
          window.location.replace('/auth');
        }
        if (data.trip) {
          return (
            <div>
              <CalendarDashboard info={data} tripID={this.tripID} location={this.props.location} history={this.props.history} match={this.props.match}
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

