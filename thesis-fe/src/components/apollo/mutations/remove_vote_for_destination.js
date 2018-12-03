import gql from "graphql-tag";

const REMOVE_VOTE_FOR_DESTINATION = gql`mutation removeVoteForDestination($tripID: ID!, $destinationID: ID!) {
  removeVoteForDestination(tripID: $tripID, destinationID: $destinationID) {
    name,
    destination {
      suggestions {
        name,
        voters {
          email
        }
      }
    }
  }
}
`;

export default REMOVE_VOTE_FOR_DESTINATION;