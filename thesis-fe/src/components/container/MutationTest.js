import React from 'react';
import { Mutation } from "react-apollo";
import ADD_TRIP from '../apollo/mutations/add_trip'

const AddTrip = () => {
  let mockdata;

  return (
    <Mutation 
    mutation={ADD_TRIP}>
      {(addTrip, { data }) => (
        <div>
    
            <button onClick={ () =>
              addTrip({
                variables: {
                  name: mockdata.name,
                  destination: mockdata.destination,
                  time: mockdata.time,
                  budget: mockdata.budget,
                  members: mockdata.members
                }
              })
            } >Create Trip</button>
        </div>
    )}
    </Mutation>
  );
}