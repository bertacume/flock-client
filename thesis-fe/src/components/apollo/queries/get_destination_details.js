import gql from "graphql-tag";

const GET_DESTINATION_DETAILS = gql` query GET_DESTINATION_DETAILS ($tripID: ID!)
  {
    self {
      email,
      firstName
    }
    trip (id: $tripID) {
      destination {
        isDictated,
        chosenDestination {
          id,
          name,
          voters {
            firstName,
            lastName,
            email
          }
          creator {
            firstName,
            lastName,
            email
          }
        }
        suggestions {
          id,
          name,
          voters {
            firstName,
            lastName,
            email
          }
        }
      }
    }
  }
`;

export default GET_DESTINATION_DETAILS;
