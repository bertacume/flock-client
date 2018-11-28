import gql from "graphql-tag";

const ADD_SUGGESTED_DESTINATION_LIKES = gql` mutation add_destination_likes ($input: updateTripInput!)
  {
    addDestinationLikes (input: $input) {
      destination {
        suggestions {
          name,
          voters {
            firstName
          }
        }
      }
    }
  }
`;

export default ADD_SUGGESTED_DESTINATION_LIKES;