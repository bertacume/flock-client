import gql from "graphql-tag";

const ADD_DESTINATION = gql` mutation addDestination ($tripID:ID!, $destination: DestinationObjectInput! )
  {
    addDestination (tripID: $tripID, destination: $destination ) {
      name
    }
  }
`;

export default ADD_DESTINATION;
