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


const ContainerFriends = styled('div')`
  display: flex;
  width: 80vw;
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


const MyTripsDashboard = (props) => {
  const redirectToTrip = (id) => {
    return () => {
      props.history.push('/tripdetails/' + id)
    }
  }
  const listTrips = props.info.map( obj => (
    <ContainerTrip onClick={redirectToTrip(obj.id)} key={obj.id}>
      <h1>{obj.name}</h1>
      { (obj.destination.chosenDestination.name) ?
        <h2>{obj.destination.chosenDestination.name}</h2> :
        (<h2>Destinations to be decided</h2>)
      }
      {/* { (obj.timeFrame.chosenTimeframe) ?
        (<h2>obj.timeFrame.chosenTimeframe</h2>) :
        (<h2>Timeframe to be decided</h2>)
      } */}
      { (obj.participants.length >0) ?
        (<ContainerFriends><h2>Friends attending: </h2>{obj.participants.map( obj => <h2 key={obj.firstName}>{obj.firstName}</h2>)}</ContainerFriends>) :
        (<ContainerFriends>No friends subscribing</ContainerFriends>)
      }
    </ContainerTrip>
  )
  )
  return (
    <Container>
      <ContainerButton>
        <AddTripButton>
          <img src={plus} alt="add trip" />
        </AddTripButton>
      </ContainerButton>
      {listTrips}
    </Container>
  );
}

export default MyTripsDashboard;