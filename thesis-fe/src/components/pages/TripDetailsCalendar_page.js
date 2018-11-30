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

  constructor(props) {
    super(props);
    this.state = {
      tripID : this.props.location.pathname.split('/')[2]
    }
  }

  render() {
    const CalendarDetailsApollo = () => (
      <Query
      query={GET_CALENDAR_DETAILS}
      errorPolicy="all"
      variables ={{tripID: this.state.tripID}}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log('aaa')
          console.log(error);
          window.location.replace('/auth');
        }
        if (data.trip) {
          return (
            <div>
              <CalendarDashboard info={data} location={this.props.location} history={this.props.history}/>
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