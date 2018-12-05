import gql from "graphql-tag";

const ADD_GENERAL_MESSAGE = gql`mutation addGeneralMessage($tripID: ID!, $message: String!) {
  addGeneralMessage(tripID: $tripID, message: $message) {
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

export default ADD_GENERAL_MESSAGE;