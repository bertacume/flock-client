import gql from "graphql-tag";

const REMOVE_VOTE_FOR_BUDGET = gql`mutation removeVoteForBudget($tripID: ID!, $suggestionID: ID!) {
  removeVoteForBudget(tripID: $tripID, suggestionID: $suggestionID) {
    name,
    budget {
      suggestions {
        value,
        voters {
          email
        }
      }
    }
  }
}
`;

export default REMOVE_VOTE_FOR_BUDGET;