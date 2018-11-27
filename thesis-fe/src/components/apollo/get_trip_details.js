import gql from "graphql-tag";

const GET_MY_TRIPS = gql` query GET_TRIP_DETAILS ($tripID: ID!)
  {
    trip (tripID: $tripID) {
      name,
      participants {
        id,
        firstName,
        lastName,
        avatarURL
      },
      destination {
        isDictated
        chosenDestination {
          name
        },
        suggestions {
          name
        }
      },
      budget {
        isDictated,
        chosenBudget {
          value
        },
        suggestions {
          value
        }
      },
      timeFrame {
        isDictated,
        chosenTimeFrame {
          startDate,
          endDate
        },
        suggestions {
          startDate,
          endDate,
          creator {
            firstName
          }
        }
      }
    }
  }
`;

export default GET_MY_TRIPS;
