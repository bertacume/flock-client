import React from 'react';
import styled from 'react-emotion';
import back from '../../assets/back.png';
import NavProfile from '../presentational/NavProfile';
import { NavBar } from '../styledComponents/styledComponents';

export const Navbar = (props) => {
  const redirectToTrip = () => {
    props.history.push(props.path)
  }
  return (<NavBar>
    <Button onClick={redirectToTrip}>
      <Icon src={back} />
    </Button>
    <Title>{props.title}</Title>
    <Button>
      {props.icon ?
        <Icon src={props.icon} /> :
        <NavProfile avatarURL={props.profile}/>}
    </Button>
  </NavBar>);
  }
  
  
  const Button = styled('button')`
    height: 90%;
    width: 10%;
    padding: 0;
    border-width: 0;
    background-color: transparent;
  `
  const Icon = styled('img')`
    height: 80%;
  `
  const Title = styled('p')`
    margin: 0;
    text-transform: uppercase;
    background: #ff7e5f;
    background: -webkit-linear-gradient(315deg, #feb47b, #ff7e5f);
    background: linear-gradient(315deg, #feb47b, #ff7e5f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
    text-align: center
`