import gql from "graphql-tag";

const GET_MY_TRIPS = gql` query GET_TRIP_DETAILS ($tripID: ID!)
  {
    trip (tripID: $tripID) {
      name,
      participants{
        id,
        firstName,
        lastName,
        avatarURL
      },
      destination{
        chosenDestination{
          name
        },
        suggestions {
          name
        },
        isDictated
      },
      budget{
        chosenBudget{value}
      },
      timeFrame{
        isDictated,
        chosenTimeFrame{
          startDate,
          endDate
        },
        suggestions {
          startDate,
          endDate,
          creator
        }
      }
    }
  }
`;

export default GET_MY_TRIPS;
