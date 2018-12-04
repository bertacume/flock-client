import gql from "graphql-tag";

const UNLOCK_BUDGET = gql`mutation unlockBudget($tripID: ID!) {
  unlockBudget(tripID: $tripID) {
    name
  }
}
`;

export default UNLOCK_BUDGET;