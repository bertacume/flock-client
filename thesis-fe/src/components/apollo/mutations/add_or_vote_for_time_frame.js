import gql from "graphql-tag";

const ADD_OR_VOTE_FOR_TIME_FRAME = gql`mutation addOrVoteForTimeFrame($tripID: ID!, $timeFrames: [TimeFrameInput!]!) {
  addOrVoteForTimeFrame(tripID: $tripID, timeFrames: $timeFrames) {
    name,
    timeFrame {
      suggestions {
        startDate,
        endDate,
        voters {
          email
        },
        creator {
          email
        }
      }
    }
  }
}
`;

export default ADD_OR_VOTE_FOR_TIME_FRAME;