import gql from "graphql-tag";

const ADD_OR_VOTE_FOR_BUDGET = gql`mutation addOrVoteForBudget($tripID: ID!, $budget: BudgetInput!) {
  addOrVoteForBudget(tripID: $tripID, budget: $budget) {
    name,
    budget {
      suggestions {
        value,
        voters {
          email
        },
        creator {
          email
        }
      }
    }
  }
}
`;

export default ADD_OR_VOTE_FOR_BUDGET;