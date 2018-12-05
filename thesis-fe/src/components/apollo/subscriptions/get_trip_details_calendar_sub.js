import gql from "graphql-tag";

const GET_TRIP_DETAILS_PARTICIPANTS_SUB = gql` subscription tripInfoChanged
  {
    tripInfoChanged {
      id,
      timeFrame {
        chosenSuggestion {
          startDate,
          endDate,
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
        suggestions {
          id,
          startDate,
          endDate,
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
        isLocked,
        isDictated
      }
    }
  }
`;

export default GET_TRIP_DETAILS_PARTICIPANTS_SUB;
