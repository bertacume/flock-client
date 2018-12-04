import gql from "graphql-tag";

const GET_CALENDAR_DETAILS = gql` query GET_CALENDAR_DETAILS ($tripID: ID!)
  {
    self {
      email,
      firstName
    }
    trip (id:$tripID) {
      id,
      creator {
        email
      },
      timeFrame{
        isLocked,
        isDictated,
        chosenSuggestion{
          id,
          startDate,
          endDate,
          voters{
            firstName
          },
        },
        suggestions{
          id,
          startDate,
          endDate,
          voters{
            email,
            firstName
          },
        },
        isDictated
      }
    }
  }
`;

export default GET_CALENDAR_DETAILS;
