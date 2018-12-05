import gql from "graphql-tag";

const UNLOCK_TIMEFRAME = gql`mutation unlockTimeFrame($tripID: ID!) {
  unlockTimeFrame(tripID: $tripID) {
    name
  }
}
`;

export default UNLOCK_TIMEFRAME;