import React, { Component } from 'react';
import { Navbar } from '../presentational/Navbar';
import ballon from '../../assets/trip.png';
import styled from 'react-emotion'
import { Query } from "react-apollo";
import GET_TRIP_DETAILS from '../apollo/queries/get_trip_details';
import GET_TRIP_DETAILS_SUB from '../apollo/queries/get_trip_details_sub';
import GeneralInfoDashboard from '../container/GeneralInfoDashboard'

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
      {({ subscribeToMore, loading, error, data}) => {
        if (loading) return <h1>Loading</h1>;
        if (error) {
          console.log(error);
        }
        return (
          (data.trip) ?
          <div>
            <Navbar
                    path={`/mytrips`}
                    title={data.trip.name}
                    history={this.props.history}
                    icon={ballon}
                  />
            <GeneralInfoDashboard history={this.props.history} match={this.props.match} info={data.trip} redirectParent={this.redirectParent()} sub={
                () => subscribeToMore({
                  document: GET_TRIP_DETAILS_SUB,
                  variables: {tripID : this.props.match.params.id },
                  updateQuery: (prev, {subscriptionData}) => {
                    console.log(subscriptionData);
                    console.log(prev);
                    if (!subscriptionData.data || !subscriptionData.data.tripInfoChanged) return prev;
                    let type;
                    if (subscriptionData.data.tripInfoChanged.participants && subscriptionData.data.tripInfoChanged.participants.length !== prev.trip.participants.length) type = 'participants';
                    else if (subscriptionData.data.tripInfoChanged.destination.chosenSuggestion ){
                      type = 'destination'
                      console.log(type);
                    }
                    else if (subscriptionData.data.tripInfoChanged.budget.chosenSuggestion ){
                      type = 'budget'
                      console.log(type);
                    }

                    if (type && subscriptionData.data.tripInfoChanged[type].chosenSuggestion && subscriptionData.data.tripInfoChanged[type].chosenSuggestion.id && subscriptionData.data.tripInfoChanged.id === this.state.tripID) {
                      const newObject = {
                        ...prev,
                        trip: {
                          ...prev.trip,
                          [type] : subscriptionData.data.tripInfoChanged[type]
                        }
                      }
                      console.log(prev);
                      console.log(newObject);
                      return newObject;
                    }
                    else return prev;
                  }
                }
              )
            }
            />
          </div>
          :
          <h1>Sorry, trip not found</h1>
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
