import gql from "graphql-tag";

const GET_MY_TRIPS = gql` query GET_USER_ID ($id: ID!)
  {
    User (id:$id)
    {
      avatarURL
    }
    tripsByUserID (userID:1) {
      id,
      name,
      participants {
        firstName
      },
      destination {
        chosenDestination {
          name
        }
      }
    }
  }
`;

export default GET_MY_TRIPS;
