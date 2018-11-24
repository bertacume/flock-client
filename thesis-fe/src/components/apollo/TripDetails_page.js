import React, { Component } from 'react';
import Navigation from '../container/Navigation';
import styled from 'react-emotion'
import { Query } from "react-apollo";
import gql from "graphql-tag";


const GeneralInfo = styled('button')`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
`;



class TripDetails_page extends Component {

  render() {
    const TripDetailsApollo = () => (
      <Query
      query={gql`
        {
          Trip (id:0) {
            name,
            participants{
              firstName,
              lastName
            },
            destination{
              chosenDestination{
                name
              }
            },
            budget{
              chosenBudget{value}
            },
            timeFrame{
              chosenTimeFrame{
                startDate
              }
            }
          }
        }
      `}
      errorPolicy="all"
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        return (
          <div>
          <Navigation textContent={data.Trip.name}/>
          <GeneralInfo>
            <h1>
              ops
            </h1>
            <h2>
              aloha
            </h2>
          </GeneralInfo>
        </div>
        );
      }}
    </Query>
    );
    return (
      <TripDetailsApollo />
    );
  }
}

export default TripDetails_page

/*
  Here we should go knowing both the user id and the trip id. We will get from the db:
  on schema:
    - name,
    - participants,
    - destination.
    - budget,
    - timeFrame


      const mockTrip = {
      id: 25,
      name: 'Fiesta',
      destination: 'Barcelona',
      start_date: '20/06/2019',
      end_date: '25/06/2019',
      budget: '1500 Euros',
      participants: ['Melanie', 'Priscila', 'Oliver'],

    }

*/