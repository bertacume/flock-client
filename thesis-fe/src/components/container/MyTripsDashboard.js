import React from 'react';
import styled from 'react-emotion'
import plus from '../../assets/svg/plus.svg';
import { Link } from "react-router-dom";

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
  min-height: 15vh;
  width:80vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem 0;
`;


const ContainerFriends = styled('div')`
  display: flex;
  width: 80vw;
  flex-direction: row;

`;

const ContainerFriendsInner = styled('div')`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: .5rem;
`;

const H1 = styled('h1')`
  font-size: 2rem;

`;

const H2 = styled('h2')`
  font-size: 1.25rem;
  margin: 0 0.2rem;
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
      <H1>{obj.name}</H1>
      { (obj.destination.chosenDestination.name) ?
        <H2>{obj.destination.chosenDestination.name}</H2> :
        (<H2>Destinations to be decided</H2>)
      }
      { (obj.participants.length >0) ?
        (<ContainerFriends><H2>Attending:</H2><ContainerFriendsInner>{obj.participants.map( obj => <H2 key={obj.firstName}>{obj.firstName}</H2>)}</ContainerFriendsInner></ContainerFriends>) :
        (<ContainerFriends>No friends subscribing</ContainerFriends>)
      }
    </ContainerTrip>
  )
  )
  return (
    <Container>
      <ContainerButton>
        <Link to='/addtrip'>
          <AddTripButton>
            <img src={plus} alt="add trip" />
          </AddTripButton>
        </Link>
      </ContainerButton>
      {listTrips}
    </Container>
  );
}

export default MyTripsDashboard;