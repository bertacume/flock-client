import gql from "graphql-tag";

const REMOVE_VOTE_FOR_DESTINATION = gql`mutation removeVoteForDestination($tripID: ID!, $suggestionID: ID!) {
  removeVoteForDestination(tripID: $tripID, suggestionID: $suggestionID) {
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