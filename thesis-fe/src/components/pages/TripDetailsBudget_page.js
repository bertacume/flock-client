import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Container } from '../styledComponents/styledComponents';
import GET_BUDGET_DETAILS from '../apollo/queries/get_budget_details';
import BudgetDashboard from '../container/BudgetDashboard';
import GET_TRIP_DETAILS_BUDGET_SUB from '../apollo/subscriptions/get_trip_details_budget_sub';
import { Loading } from '../presentational/Loading';


class TripDetailsBudget_page extends Component {
  tripID = this.props.match.params.id;

  render() {
    const BudgetDetailsApollo = () => (
      <Query
        query={GET_BUDGET_DETAILS}
        errorPolicy="all"
        variables={{ tripID: this.tripID }}
      >
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) {
            console.error(error);
            window.location.replace('/auth')
          }
          if (data.trip) {
            return (
              <Container>
                <BudgetDashboard
                info={data}
                tripID={this.tripID}
                location={this.props.location}
                history={this.props.history}
                sub={() => subscribeToMore({
                  document: GET_TRIP_DETAILS_BUDGET_SUB,
                  variables: {tripID : this.tripID },
                  updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data || subscriptionData.data.tripInfoChanged.id !== this.tripID) return prev;
                    const newData = {
                      ...prev,
                      trip: {
                        ...prev.trip,
                        budget: subscriptionData.data.tripInfoChanged.budget
                      }
                    }
                    return newData;
                  }
                })}
                />
              </Container>
            );
          }
          else if (!data.trip) {
            return (
              <h1>
                Sorry, trip not found
              </h1>
            )
          }
        }}
      </Query>
    );
    return (
      <BudgetDetailsApollo />
    );
  }
}


export default TripDetailsBudget_page;