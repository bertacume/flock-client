import gql from "graphql-tag";

const ADD_TIMEFRAME_MESSAGE = gql`mutation addTimeFrameMessage($tripID: ID!, $message: String!) {
  addTimeFrameMessage(tripID: $tripID, message: $message) {
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

export default ADD_TIMEFRAME_MESSAGE;