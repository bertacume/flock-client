import gql from "graphql-tag";

const GET_PARTICIPANTS_DETAILS = gql` query GET_PARTICIPANT_DETAILS ($tripID: ID!)
  {
    trip (id: $tripID) {
      id,
      participants {
        avatarURL,
        firstName,
        lastName,
        email
      }
    }
  }
`;

export default GET_PARTICIPANTS_DETAILS;
