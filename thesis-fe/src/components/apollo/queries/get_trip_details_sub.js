import gql from "graphql-tag";

const GET_MY_TRIPS_SUB = gql` subscription tripInfoChanged
  {
    tripInfoChanged {
      participants {
        firstName,
      }
    }
  }
`;

export default GET_MY_TRIPS_SUB;
