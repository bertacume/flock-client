import gql from "graphql-tag";

const GET_TRIP_DETAILS_DESTINATION_SUB = gql` subscription tripInfoChanged
  {
    tripInfoChanged {
      id,
      destination {
        suggestions {
          id,
          name,
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
          name
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

export default GET_TRIP_DETAILS_DESTINATION_SUB;
