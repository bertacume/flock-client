import gql from "graphql-tag";

const GET_BUDGET_DETAILS = gql` query GET_TRIP_DETAILS ($tripID: ID!)
  {
    trip (tripID: $tripID) {
      destination {
        isDictated,
        chosenDestination {
          key,
          name,
          voters {
            firstName
          }
          creator {
            firstName
          }
        }
        suggestions {
          name,
          voters {
            firstName
          }
        }
      }
    }
  }
`;

export default GET_BUDGET_DETAILS;
