import React from 'react';
import { Mutation } from "react-apollo";
import CREATE_TRIP from '../apollo/mutations/add_trip'

export const CreateTrip = () => {
  const trip = {
      name: "JAPAN REUNION",
      participants: ["christopher@travelnuts.io"],
      destination: {
        isDictated: true,
        suggestions:["KYOTO"]
      },
      budget: {
        isDictated: false,
        suggestions:  [500]
      },
      timeFrame: {
          isDictated: false,
        suggestions: [{startDate: "2008-12-18", endDate: "2018-12-24"}]
      }
    }

  return (
    <Mutation 
    mutation={CREATE_TRIP}>
      {(createTrip, { data }) => (
        <div>
            <button onClick={ () =>{
              createTrip({ variables: {trip: trip}});
              console.log(trip);
            }
            } >Create Trip</button>
        </div>
    )}
    </Mutation>
  );
}