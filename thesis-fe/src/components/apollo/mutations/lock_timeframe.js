import gql from "graphql-tag";

const LOCK_BUDGET = gql`mutation lockTimeFrame($tripID: ID!, $suggestionID: ID!) {
  lockTimeFrame (tripID: $tripID, suggestionID: $suggestionID) {
    name
  }
}
`;

export default LOCK_BUDGET;