import gql from "graphql-tag";

const LOCK_DESTINATION = gql`mutation lockDestination($tripID: ID!, $suggestionID: ID!) {
  lockDestination(tripID: $tripID, suggestionID: $suggestionID) {
    name
  }
}
`;

export default LOCK_DESTINATION;