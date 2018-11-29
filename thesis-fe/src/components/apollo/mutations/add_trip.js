import gql from "graphql-tag";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> first mutation mock data
// const CREATE_TRIP = gql` mutation CreateTrip($trip: TripInput!){
//   createTrip(trip: $trip, userId: "5bffbe8ff59a127f1afadf18"){
//     name,
//     participants
//   }
// }
// `;
=======
>>>>>>> add mutation in AddTripPage
const CREATE_TRIP = gql`mutation createTrip($trip: TripInput!) {
  createTrip(trip: $trip, userID: "5bffbe8ff59a127f1afadf18") {
    creator {
      email
    }
    name
    participants {
      email
<<<<<<< HEAD
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
=======
>>>>>>> first mutation mock data
    }
  }
}
`;

<<<<<<< HEAD
export default ADD_TRIP;
>>>>>>> first attemp mutation
=======
export default CREATE_TRIP;
>>>>>>> first mutation mock data
