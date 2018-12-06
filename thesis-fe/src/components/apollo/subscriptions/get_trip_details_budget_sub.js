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
        value
        id
        creator {
          email,
          firstName,
          lastName
        },
        voters {
          email,
          firstName,
          lastName
        }
      },
      isDictated,
      isLocked
    }
  }
}
`;

export default GET_TRIP_DETAILS_BUDGET_SUB;
