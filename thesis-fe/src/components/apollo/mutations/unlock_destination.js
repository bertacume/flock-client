import gql from "graphql-tag";

const UNLOCK_DESTINATION = gql`mutation unlockDestination($tripID: ID!) {
  unlockDestination(tripID: $tripID) {
    name
  }
}
`;

export default UNLOCK_DESTINATION;