import gql from "graphql-tag";

const ADD_FRIEND = gql` mutation addParticipant ($tripID:ID!, $participants: [String]! )
  {
    addParticipant (tripID: $tripID, participants: $participants ) {
      name,
      participants {
        email,
        firstName
      }
    }
  }
`;

export default ADD_FRIEND;
