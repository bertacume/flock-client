import React, { Component } from 'react';
import { Navbar } from '../presentational/Navbar';
import chat from '../../assets/chat.png';
import styled from 'react-emotion'
import { Query } from "react-apollo";
import GET_TRIP_DETAILS from '../apollo/queries/get_trip_details';
import GET_TRIP_DETAILS_SUB from '../apollo/subscriptions/get_trip_details_sub';
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
          variables={{ tripID: this.props.match.params.id }}
        >
          {({ subscribeToMore, loading, error, data }) => {
            if (loading) return <h1>Loading</h1>;
            if (error) console.log(error);
            return (
              (data.trip) ?
                <div>
                  <Navbar
                    pathLeft={`/mytrips`}
                    pathRight={`/tripdetails/${data.trip.id}/chat/general`}
                    title={data.trip.name}
                    history={this.props.history}
                    iconRight={chat}
                  />
                  <GeneralInfoDashboard history={this.props.history} match={this.props.match} info={data.trip} redirectParent={this.redirectParent()} sub={
                    () => subscribeToMore({
                      document: GET_TRIP_DETAILS_SUB,
                      variables: { tripID: this.props.match.params.id },
                      updateQuery: (prev, { subscriptionData }) => {
                        return prev;
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
      // box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    `
