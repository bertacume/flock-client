import gql from "graphql-tag";

const GET_TRIP_DETAILS_PARTICIPANTS_SUB = gql` subscription tripInfoChanged
  {
    tripInfoChanged {
      budget {
        chosenBudget {
          value
        }
      }
    }
  }
`;

export default GET_TRIP_DETAILS_PARTICIPANTS_SUB;
