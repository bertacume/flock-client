import gql from "graphql-tag";

const CREATE_TRIP = gql`mutation createTrip($trip: TripInput!) {
  createTrip(trip: $trip) {
    id,
    name,
    creator {
      firstName
    }
  }
}
`;

export default CREATE_TRIP;