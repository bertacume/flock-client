import gql from "graphql-tag";

const REMOVE_VOTE_FOR_TIMEFRAME = gql`mutation removeVoteForTimeFrame($tripID: ID!, $suggestionID: ID!) {
  removeVoteForTimeFrame(tripID: $tripID, suggestionID: $suggestionID) {
    id,

  }
}
`;

export default REMOVE_VOTE_FOR_TIMEFRAME;