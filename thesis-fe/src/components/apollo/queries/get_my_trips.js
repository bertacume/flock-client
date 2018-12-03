import gql from "graphql-tag";

const GET_MY_TRIPS = gql` query GET_MY_TRIPS
  {
    self
    {
      avatarURL,
      email,
      trips {
        name,
        id
      }
    }
  }
`;

export default GET_MY_TRIPS;
