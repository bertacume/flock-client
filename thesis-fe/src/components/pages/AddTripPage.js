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
    currentView: 2,
    tripData: {
      name: null,
      destination: {
        suggestions: null,
        chosenOne: null,
      },
      time: {
        suggestions: null,
        chosenOne: null,
      },
      budget: null,
      members: null,
    },
    isNextAviable: false,
  }

  relation = ['name', 'destination', 'time', 'budget', 'members'];

  setName = input => {
    this.setState({ tripData: { ...this.state.tripData, name: input }, isNextAviable: false });
  }

  setDestination =  destinationObj => {
    this.setState({ tripData: { ...this.state.tripData, destination: { ...destinationObj } } });
  }

  setDates = datesObj => {
    this.setState({ tripData: { ...this.state.tripData, time: { ...datesObj } } });
  }

  setBudget = budget => {
    this.setState({ tripData: { ...this.state.tripData, budget } });
  }

  setMembers = members => {
    this.setState({ tripData: { ...this.state.tripData, members } });
  }

  handleBackClick = () => {
    this.setState({ currentView: this.state.currentView - 1 });
  }

  handleNextClick = async () => {
    //TODO: refactor views 3
    if (this.state.currentView > 1) return; 
    
    if (this.state.currentView === 0 && !this.state.tripData.name) {
      await this.setState({ isNextAviable: true });
      return;
    }
    this.setState({ currentView: this.state.currentView + 1 });
  }

  handleCreateTripClick = () => {
  }

  getNextBtnTxt = () => {
    const next = <span role="img" aria-label="arrow">➡️</span>;
    if (this.state.currentView === 0) return next;
    const current = this.relation[this.state.currentView]
    return (this.state.tripData[current].chosenOne ||
      (this.state.tripData[current].suggestions && 
      this.state.tripData[current].suggestions.length)) ?
       next : 'SKIP';
  }

  render() {
    const tripData = this.state.tripData;
    return (
      <Container>
        {(this.state.currentView === 0) && <AddName
          name={tripData.name} setName={input => this.setName(input)}
          nameRequired={this.state.isNextAviable} />}

        {(this.state.currentView === 1) && <AddDestination
          destination={tripData.destination} setDestination={input => this.setDestination(input)} />}

        {(this.state.currentView === 2) && <AddTime
          time={tripData.time} setDates={dates => this.setDates(dates)} />}

        {(this.state.currentView === 3) && <AddBudget
          budget={tripData.budget} setBudget={budget => this.setBudget(budget)} />}

        {(this.state.currentView === 4) && <AddMembers
          members={tripData.members} setMembers={members => this.setMembers(members)} />}

        <ButtonContainer>
          {!(this.state.currentView === 0) && <Button onClick={this.handleBackClick}><span role="img" aria-label="arrow">⬅️</span></Button>}
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
  font-family: ${fontFamily}
`
