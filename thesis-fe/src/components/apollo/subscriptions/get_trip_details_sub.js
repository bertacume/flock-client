import gql from "graphql-tag";

const GET_TRIP_DETAILS_SUB = gql` subscription tripInfoChanged($tripID: ID)
  {
    tripInfoChanged(tripID: $tripID) {
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

export default GET_TRIP_DETAILS_SUB;
