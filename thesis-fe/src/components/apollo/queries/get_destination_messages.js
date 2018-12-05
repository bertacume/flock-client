import gql from "graphql-tag";

const GET_DESTINATION_MESSAGES = gql`query GET_DESTINATION_MESSAGES($tripID: ID!)
  {
    self {
      email,
      firstName,
      lastName
    }
    trip (id: $tripID) {
      id,
      name,
      messages {
        createdAt,
        creator {
          email,
      firstName,
          lastName,
        },
        message,
        type
      }
    }
  }
`;

export default GET_DESTINATION_MESSAGES;
