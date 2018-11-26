import gql from "graphql-tag";

const GET_MY_TRIPS = gql` query GET_TRIP_DETAILS ($tripID: ID!)
  {
    trip (tripID: $tripID) {
      name,
      participants{
        id,
        firstName,
        lastName
      },
      destination{
        chosenDestination{
          name
        }
      },
      budget{
        chosenBudget{value}
      },
      timeFrame{
        chosenTimeFrame{
          startDate
        }
      }
    }
  }
`;

export default GET_MY_TRIPS;
