import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Container } from '../styledComponents/styledComponents';
import GET_BUDGET_DETAILS from '../apollo/queries/get_budget_details';
import BudgetDashboard from '../container/BudgetDashboard';

class TripDetailsBudget_page extends Component {
  tripID = this.props.match.params.id

  render() {
    const BudgetDetailsApollo = () => (
      <Query
        query={GET_BUDGET_DETAILS}
        errorPolicy="all"
        variables={{ tripID: this.tripID }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) console.error(error);
          if (data.trip) {
            return (
              <Container>
                <BudgetDashboard info={data} tripID={this.tripID} location={this.props.location} history={this.props.history} />
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