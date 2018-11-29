import React from 'react';
import { Mutation } from "react-apollo";
<<<<<<< HEAD
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
=======
import CREATE_TRIP from '../apollo/mutations/add_trip'
>>>>>>> first mutation mock data

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
<<<<<<< HEAD
    
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
=======
            <button onClick={ () =>{
              createTrip({ variables: {trip: trip}});
              console.log(trip);
            }
>>>>>>> first mutation mock data
            } >Create Trip</button>
        </div>
    )}
    </Mutation>
  );
}