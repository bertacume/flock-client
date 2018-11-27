import gql from "graphql-tag";

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
