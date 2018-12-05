import gql from "graphql-tag";

const ADD_DESTINATION_MESSAGE = gql`mutation addDestinationMessage($tripID: ID!, $message: String!) {
  addDestinationMessage(tripID: $tripID, message: $message) {
    id,
    name,
    messages {
      createdAt,
      creator {
        email,
    firstName,
        lastName,
      },
      message,
      type
    }
  }
}
`;

export default ADD_DESTINATION_MESSAGE;