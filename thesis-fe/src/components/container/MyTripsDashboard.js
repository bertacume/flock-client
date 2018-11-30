import React from 'react';
import styled from 'react-emotion'
import plus from '../../assets/plus-gradient.png';
import confirm from '../../assets/svg/confirm.svg';
import { Link } from "react-router-dom";
import { fontFamily } from '../../helpers/styleConstants';

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
  min-height: 15vh;
  width:80vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0;
  background: #ff7e5f;
  border-radius: 20px;
  color: white;
`;
const ContainerConfirmation = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

`;
const H1 = styled('h1')`
  font-size: 2rem;

`;

const H2 = styled('h2')`
  font-size: 1.25rem;
  margin: 0 1rem;
`;

const Button = styled('button')`
width: 20vw;
height: 10vh;
margin: 10px 0 20px 0;
border-width: 0;
border-color: #afafaf;
border-radius: 10px;
background-color: transparent;
font-family: ${fontFamily};
`

const ImgBtn = styled('img')`
  height: 100%;
`

const MyTripsDashboard = (props) => {
  console.log(props);
  const redirectToTrip = (id) => {
    return () => {
      props.history.push('/tripdetails/' + id)
    }
  }
  const listTrips = props.info.map( obj => (
    <ContainerTrip onClick={redirectToTrip(obj.id)} key={obj.id}>
      <H1>{obj.name}</H1>
      <ContainerConfirmation>
      <img src={confirm} alt="confirm" height="20" width="20"/>
      <H2>Confirmed</H2>
      </ContainerConfirmation>
    </ContainerTrip>
  )
  )
  return (
    <Container>
      <ContainerButton>
        <Link to='/addtrip'>
        <Button ><ImgBtn src={plus} /></Button>
        </Link>
      </ContainerButton>
      {listTrips}
    </Container>
  );
}

export default MyTripsDashboard;