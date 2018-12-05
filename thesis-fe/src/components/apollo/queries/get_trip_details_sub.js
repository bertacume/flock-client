import gql from "graphql-tag";

const GET_TRIP_DETAILS_PARTICIPANTS_SUB = gql` subscription tripInfoChanged
  {
    tripInfoChanged {
      id,
      budget {
        isDictated,
        isLocked,
        chosenSuggestion {
          id,
          value
        }
      }
      participants {
        email
        lastName
      }
      destination {
        isDictated,
        isLocked,
        chosenSuggestion {
          id,
          name
        }
      }
      timeFrame {
        isDictated,
        isLocked,
        chosenSuggestion {
          startDate,
          endDate
        }
      }
    }
  }
`;

export default GET_TRIP_DETAILS_PARTICIPANTS_SUB;
