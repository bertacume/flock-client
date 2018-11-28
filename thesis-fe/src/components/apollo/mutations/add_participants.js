import gql from "graphql-tag";

const ADD_PARTICIPANTS = gql` mutation add_participants ($input: updateTripInput!)
  {
    addParticipants (input: $input) {

    }
  }
`;

export default ADD_PARTICIPANTS;