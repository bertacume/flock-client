import React from 'react';
import styled from 'react-emotion';
import back from '../../assets/back.png';
import { softGradient } from '../../helpers/styleConstants';

import { NavBar } from '../styledComponents/styledComponents';

export const Navbar = (props) => {
  const redirectToTrip = (path) => {
    props.history.push(path)
  }
  return (<NavBar>
    <Button onClick={() => redirectToTrip(props.pathLeft)}>
      <Icon src={props.iconLeft ? props.iconLeft : back} />
    </Button>
    <Title>{props.title}</Title>
    <Button onClick={() => redirectToTrip(props.pathRight)}>
        <Icon src={props.iconRight} />
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
    background: ${softGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
    text-align: center
`