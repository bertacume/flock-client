import gql from "graphql-tag";

const LOCK_BUDGET = gql`mutation lockBudget($tripID: ID!, $suggestionID: ID!) {
  lockBudget(tripID: $tripID, suggestionID: $suggestionID) {
    name
  }
}
`;

export default LOCK_BUDGET;