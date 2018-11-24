import React, { Component } from 'react';
import styled from 'react-emotion'
import plus from '../../assets/svg/plus.svg';

const Container = styled('div')`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
`;

const ContainerButton = styled('div')`
  height: 10vh;
  width:10vh;
  margin-bottom: 2rem;
`;

const ContainerTrip = styled('div')`
  padding: 1.5rem;
  background-color: green;
  height: 15vh;
  width:80vw;
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
`;

const ContainerDates = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const AddTripButton = styled('button')`
  position: relative;
  height: 100%;
  width: 100%;
  font-size: 4rem;
  background-color: yellow;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
`;


class MyTripsDashboard extends Component {

  redirectToTrip = (id) => {
    return () => {
      this.props.history.push('/tripdetails/' + id)
    }

  }
  render() {
    const mockTrip = [
      {
        id: 25,
        name: 'Fiesta',
        destination: 'Barcelona',
        start_date: '20/06/2019',
        end_date: '25/06/2019'
      },
      {
        id: 90,
        name: 'super',
        destination: 'berlin',
        start_date: '20/12/2018',
        end_date: '15/01/2019'
      },
      {
        id: 121,
        name: 'super',
        destination: 'berlin',
        start_date: '20/12/2018',
        end_date: '15/01/2019'
      }
    ]
    const listTrips = mockTrip.map( obj => {
      return (
        <ContainerTrip onClick={this.redirectToTrip(obj.id)} key={obj.id}>
          <h1>{obj.name}</h1>
          <h2>{obj.destination}</h2>
          <ContainerDates>
          <h2>{obj.start_date}</h2>
          <h2>{obj.end_date}</h2>
          </ContainerDates>
        </ContainerTrip>
      )
    })
    return (
      <Container>
        <ContainerButton>
          <AddTripButton>
            <img src={plus} alt="e" />
          </AddTripButton>
        </ContainerButton>
        {listTrips}
      </Container>
    );
  }
}

export default MyTripsDashboard;