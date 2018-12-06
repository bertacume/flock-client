import gql from "graphql-tag";

const GET_TRIP_DETAILS_PARTICIPANTS_SUB = gql` subscription tripInfoChanged
  {
    tripInfoChanged {
      id,
      name,
      participants {
        email,
        firstName,
        avatarURL,
        lastName,
      }
    }
  }
`;

export default GET_TRIP_DETAILS_PARTICIPANTS_SUB;
