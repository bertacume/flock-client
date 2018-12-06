import React, { Component } from 'react';
import { Query } from "react-apollo";
import ChatContainer from "../container/ChatContainer"
import GET_DESTINATION_MESSAGES from '../apollo/queries/get_destination_messages';
import { Container } from '../styledComponents/styledComponents';
import ADD_DESTINATION_MESSAGE from '../apollo/mutations/add_destination_message';
import GET_TRIP_DETAILS_SUB from '../apollo/subscriptions/get_trip_details_sub';
import ADD_BUDGET_MESSAGE from '../apollo/mutations/add_budget_message';
import ADD_TIMEFRAME_MESSAGE from '../apollo/mutations/add_timeFrame_message';
import ADD_GENERAL_MESSAGE from '../apollo/mutations/add_general_message';
import { Loading } from '../presentational/Loading';

class ChatPage extends Component {
  tripID = this.props.match.params.id;
  type = this.props.match.params.type.toUpperCase()

  render() {
    return (
      <Query
        query={GET_DESTINATION_MESSAGES}
        errorPolicy="all"
        fetchPolicy="cache-first"
        variables={{ tripID: this.tripID }}
      >
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) console.error(error);
          if (data.trip) {
            return (
              <Container>
                <ChatContainer
                  messages={data.trip.messages}
                  self={data.self}
                  history={this.props.history}
                  match={this.props.match}
                  mutation={{ DESTINATION: ADD_DESTINATION_MESSAGE, BUDGET: ADD_BUDGET_MESSAGE, CALENDAR: ADD_TIMEFRAME_MESSAGE, GENERAL: ADD_GENERAL_MESSAGE }}
                  tripID={this.tripID}
                  type={this.type}
                  sub={() => subscribeToMore({
                    document: GET_TRIP_DETAILS_SUB,
                    variables: { tripID: this.tripID },
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      return {
                        ...prev,
                        trip: {
                          ...prev.trip,
                          messages: subscriptionData.data.tripInfoChanged.messages
                        }
                      };
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
    )
  }
}

export default ChatPage;