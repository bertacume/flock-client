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
          creator {
            firstName
          }
          voters{
            firstName,
            lastName
          },
        },
        suggestions{
          id,
          startDate,
          endDate,
          voters{
            email,
            firstName,
            lastName
          },
        },
        isDictated
      }
    }
  }
`;

export default GET_CALENDAR_DETAILS;
