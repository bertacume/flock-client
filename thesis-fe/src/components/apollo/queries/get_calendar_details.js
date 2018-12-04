import gql from "graphql-tag";

const GET_CALENDAR_DETAILS = gql` query GET_CALENDAR_DETAILS ($tripID: ID!)
  {
    self {
      email,
      firstName
    }
    trip (id:$tripID) {
      timeFrame{
        chosenSuggestion{
          startDate,
          endDate,
          voters{
            firstName
          },
        },
        suggestions{
          startDate,
          endDate,
          voters{
            firstName
          },
        },
        isDictated
      }
    }
  }
`;

export default GET_CALENDAR_DETAILS;
