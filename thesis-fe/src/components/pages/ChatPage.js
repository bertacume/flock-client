import React, { Component } from 'react';
import { Query } from "react-apollo";
import ChatContainer from "../container/ChatContainer"
import GET_DESTINATION_MESSAGES from '../apollo/queries/get_destination_messages';
import { Container } from '../styledComponents/styledComponents';
import ADD_DESTINATION_MESSAGE from '../apollo/mutations/add_destination_message';

class ChatPage extends Component {
  tripID = this.props.match.params.id;
  type = this.props.match.params.type.toUpperCase()

  render() {
    console.log(this.tripID);
    console.log(this.type);
    return (
      <Query
        query={GET_DESTINATION_MESSAGES}
        errorPolicy="all"
        variables={{ tripID: this.tripID }}
        onCompleted={res => console.log(res)}
      >
        {({ /*subscribeToMore,*/ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) console.error(error);
          if (data.trip) {
            const messages = data.trip.messages.filter(mssg => mssg.type === this.type);
            return (
              <Container>
                {/* <BudgetDashboard
                  info={data}
                  tripID={this.tripID}
                  location={this.props.location}
                  history={this.props.history}
                  sub={() => subscribeToMore({
                    document: GET_TRIP_DETAILS_BUDGET_SUB,
                    variables: { tripID: this.tripID },
                    updateQuery: (prev, { subscriptionData }) => {
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
                /> */}
                <ChatContainer
                  messages={messages}
                  history={this.props.history}
                  match={this.props.match}
                  mutation={{ DESTINATION: ADD_DESTINATION_MESSAGE }}
                  tripID={this.tripID}
                  type={this.type}
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