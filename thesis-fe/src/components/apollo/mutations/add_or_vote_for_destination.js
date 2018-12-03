import gql from "graphql-tag";

const ADD_OR_VOTE_FOR_DESTINATION = gql`mutation addOrVoteForDestination($tripID: ID!, $destinations: [DestinationInput!]!) {
  addOrVoteForDestination(tripID: $tripID, destinations: $destinations) {
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

export default ADD_OR_VOTE_FOR_DESTINATION;