import gql from "graphql-tag";

const GET_PARTICIPANTS_DETAILS = gql` query GET_TRIP_DETAILS ($tripID: ID!)
  {
    trip (tripID: $tripID) {
      participants {
        avatarURL,
        firstName,
        lastName
      }
    }
  }
`;

export default GET_PARTICIPANTS_DETAILS;
