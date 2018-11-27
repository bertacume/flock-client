import gql from "graphql-tag";

<<<<<<< HEAD
// const CREATE_TRIP = gql` mutation CreateTrip($trip: TripInput!){
//   createTrip(trip: $trip, userId: "5bffbe8ff59a127f1afadf18"){
//     name,
//     participants
//   }
// }
// `;
const CREATE_TRIP = gql`mutation createTrip($trip: TripInput!) {
  createTrip(trip: $trip, userID: "5bffbe8ff59a127f1afadf18") {
    creator {
      email
    }
    name
    participants {
      email
    }
  }
}
`;

export default CREATE_TRIP;
=======
const ADD_TRIP = gql` mutation AddTrip(
  $name: String!, 
  $destination: ----, 
  $time: ----,
  $budget: ----, 
  $members: ----) {
    addTrip(name: $name, destination: $destination, time: $time, budget: $budget, members: $members){
      name,
      members
    }
  }
`;

export default ADD_TRIP;
>>>>>>> first attemp mutation
