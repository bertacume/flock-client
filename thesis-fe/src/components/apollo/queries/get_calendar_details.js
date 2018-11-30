import gql from "graphql-tag";

const GET_CALENDAR_DETAILS = gql` query GET_CALENDAR_DETAILS ($tripID: ID!)
  {
    trip (id:$tripID) {
      timeFrame{
        chosenTimeFrame{
          startDate,
          endDate,
          voters{
            firstName
          },
          creator{
            firstName
          }
        },
        suggestions{
          startDate,
          endDate,
          voters{
            firstName
          },
          creator{
            firstName
          }
        },
        isDictated
      }
    }
  }
`;

export default GET_CALENDAR_DETAILS;
