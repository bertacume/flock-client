import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';
import { AddName } from '../container/AddName';
import { AddDestination } from '../container/AddDestination';
import { AddTime } from '../container/AddTime';
import { AddBudget } from '../container/AddBudget';
import { AddMembers } from '../container/AddMembers';

export class AddTripPage extends Component {
  state = {
    currentView: 'AddName',
    tripData: {
      name: null,
      destination: null,
      time: null,
      budget: null,
      members: null,
    },
  }
  render() {
    return (
      <Container>
        {(this.state.currentView === 'AddName') &&  <AddName />}
        {(this.state.currentView === 'AddDestination') &&  <AddDestination />}
        {(this.state.currentView === 'AddTime') &&  <AddTime />}
        {(this.state.currentView === 'AddBudget') &&  <AddBudget />}
        {(this.state.currentView === 'AddMembers') &&  <AddMembers />}
        <ButtonContainer>
        <Button>⬅️</Button>
        <Button>➡️</Button>
        </ButtonContainer>
      </Container>
    );
  }
}
  const Container = styled('div')`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction column;
    justify-content: space-evenly;
    align-items: center;
  
    Button {
      outline: none;
    }
    Button:active {
      color: red;
      border-width: 2px;
      border-color: #afafaf;
    }
  `
  const ButtonContainer = styled('div')`
    width: 100%;
    display: flex;
    flex-direction row;
    justify-content: space-around;
    align-items: center;
  `
  
  const Button = styled('button')`
    width: 20vw;
    height: 5vh;
    border-width: 2px;
    border-color: #afafaf;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    font-family: ${fontFamily};
  `
