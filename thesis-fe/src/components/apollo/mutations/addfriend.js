import gql from "graphql-tag";

const ADD_FRIEND = gql` mutation addParticipants ($tripID:ID!, $participants: [String!]! )
  {
    addParticipants (tripID: $tripID, participants: $participants ) {
      name,
      participants {
        email,
        firstName
      }
    }
  }
`;

export default ADD_FRIEND;
