import gql from "graphql-tag";

const GET_TRIP_DETAILS_DESTINATION_SUB = gql` subscription tripInfoChanged
  {
    tripInfoChanged {
      name,
      id
    }
  }
`;

export default GET_TRIP_DETAILS_DESTINATION_SUB;
