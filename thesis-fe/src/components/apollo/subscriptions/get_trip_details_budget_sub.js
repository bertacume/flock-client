import gql from "graphql-tag";

const GET_TRIP_DETAILS_BUDGET_SUB = gql` subscription tripInfoChanged
  {
    tripInfoChanged {
      id,
      budget {
        suggestions {
          id,
          value,
          voters {
            email,
            firstName,
            lastName
          },
          creator {
            email,
            firstName,
            lastName
          }
        },
        chosenSuggestion {
          id,
          value,
          voters {
            firstName,
            lastName,
            email
          }
          value
        },
        isDictated,
        isLocked
      }
    }
  }
`;

export default GET_TRIP_DETAILS_BUDGET_SUB;
