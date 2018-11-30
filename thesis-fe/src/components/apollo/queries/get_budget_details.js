import gql from "graphql-tag";

const GET_BUDGET_DETAILS = gql` query GET_BUDGET_DETAILS ($tripID: ID!)
  {
    trip (id: $tripID) {
      budget {
        isDictated,
        chosenBudget {
          value,
          id,
          voters {
            firstName
          }
          creator {
            firstName
          }
        }
        suggestions {
          value,
          voters {
            firstName
          }
        }
      }
    }
  }
`;

export default GET_BUDGET_DETAILS;
