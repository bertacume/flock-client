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
    currentView: 1,
    tripData: {
      name: null,
      destination: null,
      time: null,
      budget: null,
      members: null,
    },
  }

  relation = ['name', 'destination', 'time', 'budget', 'members'];

  setName = input => {
    this.setState({tripData: { ...this.state.tripData, name: input }});
  }

  setDestination = input => {
    this.setState({tripData: { ...this.state.tripData, destination: input }});
  }

  handleBackClick = () => {
    this.setState({currentView: this.state.currentView - 1});
  }
  
  handleNextClick = () => {
    this.setState({currentView: this.state.currentView + 1});
  }
  
  handleCreateTripClick = () => {
  }

  getNextBtnTxt = () => {
    const index = this.state.currentView;
    return this.state.tripData[this.relation[index]] ? '➡️' : 'SKIP';
  }

  render() {
    const tripData = this.state.tripData;
    return (
      <Container>
        {(this.state.currentView === 0) &&  <AddName name={tripData.name} setName={input => this.setName(input)}/>}
        {(this.state.currentView === 1) &&  <AddDestination destination={tripData.destination} setDestination={input => this.setDestination(input)}/>}
        {(this.state.currentView === 2) &&  <AddTime />}
        {(this.state.currentView === 3) &&  <AddBudget />}
        {(this.state.currentView === 4) &&  <AddMembers />}
        <ButtonContainer>
        {!(this.state.currentView === 0) && <Button onClick={this.handleBackClick}>⬅️</Button>}
        {!(this.state.currentView === 4) ? 
          <Button onClick={this.handleNextClick}>{this.getNextBtnTxt()}</Button> :
          <Button onClick={this.handleCreateTripClick}>CREATE TRIP</Button>}
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
