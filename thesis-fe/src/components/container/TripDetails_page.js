import React, { Component } from 'react';
import Navigation from './Navigation';
import styled from 'react-emotion'

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
    const mockTrip = {
      id: 25,
      name: 'Fiesta',
      destination: 'Barcelona',
      start_date: '20/06/2019',
      end_date: '25/06/2019',
      budget: '1500 Euros',
      participants: ['Melanie', 'Priscila', 'Oliver'],

    }
    return (
      <div>
        <Navigation textContent="name from the router" />
        <GeneralInfo>
          <h1>
            {mockTrip.name}
          </h1>
          <h2>
            {mockTrip.destination}
          </h2>

        </GeneralInfo>
      </div>
    );
  }
}

export default TripDetails_page