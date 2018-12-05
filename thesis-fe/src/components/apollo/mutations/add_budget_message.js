import gql from "graphql-tag";

const ADD_BUDGET_MESSAGE = gql`mutation addBudgetMessage($tripID: ID!, $message: String!) {
  addBudgetMessage(tripID: $tripID, message: $message) {
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

export default ADD_BUDGET_MESSAGE;