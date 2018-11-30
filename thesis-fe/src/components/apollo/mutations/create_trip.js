import gql from "graphql-tag";

const CREATE_TRIP = gql`mutation createTrip($trip: TripInput!) {
  createTrip(trip: $trip, userID: "5bffbe8ff59a127f1afadf18") {
    id
  }
}
`;

export default CREATE_TRIP;