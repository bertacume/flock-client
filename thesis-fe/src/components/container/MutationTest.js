import React from 'react';
import { Mutation } from "react-apollo";
<<<<<<< HEAD
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
=======
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
>>>>>>> first attemp mutation
            } >Create Trip</button>
        </div>
    )}
    </Mutation>
  );
}