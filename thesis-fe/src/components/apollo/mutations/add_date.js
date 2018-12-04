import gql from "graphql-tag";

const ADD_DATE = gql` mutation addOrVoteForTimeFrame ($tripID:ID!, $timeFrames: [TimeFrameInput!]! )
  {
    addOrVoteForTimeFrame (tripID: $tripID, timeFrames: $timeFrames ) {
      name
    }
  }
`;

export default ADD_DATE;
