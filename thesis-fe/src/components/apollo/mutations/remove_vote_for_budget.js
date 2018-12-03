import gql from "graphql-tag";

const REMOVE_VOTE_FOR_BUDGET = gql`mutation removeVoteForBudget($tripID: ID!, $budgetID: ID!) {
  removeVoteForBudget(tripID: $tripID, budgetID: $budgetID) {
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