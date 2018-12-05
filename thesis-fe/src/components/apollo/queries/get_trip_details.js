import gql from "graphql-tag";

const GET_MY_TRIPS = gql` query GET_TRIP_DETAILS ($tripID: ID!)
  {
    trip (id: $tripID) {
      id,
      name,
      participants {
        email,
        lastName,
      },
      destination {
        isDictated,
        isLocked,
        chosenSuggestion {
          id,
          name
        },
      },
      budget {
        isDictated,
        isLocked,
        chosenSuggestion {
          id,
          value
        },
      }
    }
  }
`;

export default GET_MY_TRIPS;
