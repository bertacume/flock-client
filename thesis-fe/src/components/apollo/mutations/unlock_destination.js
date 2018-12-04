import gql from "graphql-tag";

const UNLOCK_DESTINATION = gql`mutation unlockDestination($tripID: ID!, $suggestionID: ID!) {
  unlockDestination(tripID: $tripID, suggestionID: $suggestionID) {
    name
  }
}
`;

export default UNLOCK_DESTINATION;