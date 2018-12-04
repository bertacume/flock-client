import gql from "graphql-tag";

const GET_BUDGET_DETAILS = gql` query GET_BUDGET_DETAILS ($tripID: ID!)
  {
    self {
      email,
      firstName
    }
    trip (id: $tripID) {
      budget {
        isDictated,
        chosenBudget {
          id,
          value,
          voters {
            firstName,
            lastName,
            email
          }
          creator {
            firstName,
            lastName
            email
          }
        }
        suggestions {
          id,
          value,
          voters {
            firstName,
            lastName,
            email
          }
        }
      }
    }
  }
`;

export default GET_BUDGET_DETAILS;
