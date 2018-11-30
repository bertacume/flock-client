import gql from "graphql-tag";

const GET_MY_TRIPS = gql` query GET_MY_TRIPS
  {
    self
    {
      email,
      avatarURL
    }
    allTrips {
      id,
      name,
      creator {
        firstName
      }
    }


  }
`;

export default GET_MY_TRIPS;
