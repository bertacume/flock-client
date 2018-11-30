import gql from "graphql-tag";

const REGISTER = gql` mutation addParticipant ($tripID:ID!, $participants: [String]! )
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

export default REGISTER;
