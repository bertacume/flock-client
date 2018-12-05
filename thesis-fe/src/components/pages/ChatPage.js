import React, { Component } from 'react';
import { Query } from "react-apollo";
import ChatContainer from "../container/ChatContainer"
import GET_DESTINATION_MESSAGES from '../apollo/queries/get_destination_messages';
import { Container } from '../styledComponents/styledComponents';
import ADD_DESTINATION_MESSAGE from '../apollo/mutations/add_destination_message';
import GET_TRIP_DETAILS_SUB from '../apollo/subscriptions/get_trip_details_sub';

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
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) console.error(error);
          if (data.trip) {
            const messages = data.trip.messages.filter(mssg => mssg.type === this.type);
            return (
              <Container>
                <ChatContainer
                  messages={messages}
                  history={this.props.history}
                  match={this.props.match}
                  mutation={{ DESTINATION: ADD_DESTINATION_MESSAGE }}
                  tripID={this.tripID}
                  type={this.type}
                  sub={() => subscribeToMore({
                    document: GET_TRIP_DETAILS_SUB,
                    variables: { tripID: this.tripID },
                    updateQuery: (prev, { subscriptionData }) => {
                      console.log('hhh')
                      if (!subscriptionData.data) return prev;
                      return subscriptionData.data.tripInfoChanged.messages.filter(mssg => mssg.type === this.type);
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