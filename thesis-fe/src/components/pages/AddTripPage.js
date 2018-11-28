import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';
import { AddName } from '../container/AddName';
import { AddDestination } from '../container/AddDestination';
import { AddTime } from '../container/AddTime';
import { AddBudget } from '../container/AddBudget';
import { AddMembers } from '../container/AddMembers';
import posed, { PoseGroup } from 'react-pose';

const Page = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 300,
    },
  },
  exit: {
    x: 0,
    opacity: 0,
    transition: {
      duration: 300,
    },
  },
})

export class AddTripPage extends Component {
  state = {
    currentView: 1,
    tripData: {
      name: null,
      destination: {
        suggestions: [],
        chosenOne: null,
      },
      time: {
        suggestions: [],
        chosenOne: null,
      },
      budget: {
        suggestions: [],
        chosenOne: null,
      },
      members: [],
    },
    isNextAviable: false,
  }

  relation = ['name', 'destination', 'time', 'budget', 'members'];

  setName = input => {
    this.setState({ tripData: { ...this.state.tripData, name: input }, isNextAviable: false });
  }

  setDestination = destinationObj => {
    this.setState({ tripData: { ...this.state.tripData, destination: { ...destinationObj } } });
  }

  setDates = async datesObj => {
    await this.setState({ tripData: { ...this.state.tripData, time: { ...datesObj } } });
    console.log(this.state.tripData)
  }

  setBudget = budgetObj => {
    this.setState({ tripData: { ...this.state.tripData, budget: { ...budgetObj } } });
  }

  setMembers = members => {
    this.setState({ tripData: { ...this.state.tripData, members } });
  }

  handleBackClick = () => {
    this.setState({ currentView: this.state.currentView - 1 });
  }

  handleNextClick = async () => {
    if (this.state.currentView === 0 && !this.state.tripData.name) {
      await this.setState({ isNextAviable: true });
      return;
    }
    this.setState({ currentView: this.state.currentView + 1 });
  }

  handleCreateTripClick = () => {
  }

  getNextBtnTxt = () => {
    const next = <ImgBtn src={require('../../assets/next.png')} />;
    if (this.state.currentView === 0) return next;
    const current = this.relation[this.state.currentView]
    return (this.state.tripData[current].chosenOne ||
      (this.state.tripData[current].suggestions &&
        this.state.tripData[current].suggestions.length)) ?
      next : <ImgBtn src={require('../../assets/skip.png')} />;
  }

  render() {
    const tripData = this.state.tripData;
    return (
      <Container>
        <PoseGroup>
          {(this.state.currentView === 0) &&
            <WizardPage key={0} flipMove={false}>
              <PointsImg src={require('../../assets/0.png')} />
              <AddName
                name={tripData.name} setName={input => this.setName(input)}
                nameRequired={this.state.isNextAviable} />
            </WizardPage>
          }

          {(this.state.currentView === 1) &&
            <WizardPage key={1} flipMove={false}>
              <PointsImg src={require('../../assets/1.png')} />
              <AddDestination destination={tripData.destination} setDestination={input => this.setDestination(input)} />
            </WizardPage>}

          {(this.state.currentView === 2) &&
            <WizardPage key={2} flipMove={false}>
              <PointsImg src={require('../../assets/2.png')} />
              <AddTime
                time={tripData.time} setDates={dates => this.setDates(dates)} />
            </WizardPage>
          }

          {(this.state.currentView === 3) &&
            <WizardPage key={3} flipMove={false}>
              <PointsImg src={require('../../assets/3.png')} />
              <AddBudget
                budget={tripData.budget} setBudget={budget => this.setBudget(budget)} />
            </WizardPage>
          }
          {(this.state.currentView === 4) &&
            <WizardPage key={4} flipMove={false}>
              <PointsImg src={require('../../assets/4.png')} />
              <AddMembers
                members={tripData.members} setMembers={members => this.setMembers(members)} />
            </WizardPage>
          }

        </PoseGroup>
        <ButtonContainer>
          {!(this.state.currentView === 0) ? 
          <Button onClick={this.handleBackClick}><ImgBtn src={require('../../assets/before.png')} /></Button> :
          <FakeBtn></FakeBtn>}
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
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  button:active {
  border-width: 0;
}
`
const WizardPage = styled(Page)`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0;
`
const ButtonContainer = styled('div')`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction row;
  justify-content: space-around;
  align-items: center;
  margin: 0 0 4vh 0;
`
const Button = styled('button')`
  width: 20vw;
  height: 5vh;
  border-width: 0;
  border-color: #afafaf;
  border-radius: 10px;
  background-color: transparent;
  font-family: ${fontFamily}
`
const FakeBtn = styled('div')`
  width: 20vw;
  height: 5vh;
`
const PointsImg = styled('img')`
  width: 78%;

  @media (min-width: 600px) {
    width: 60%;
  }
  @media (min-width: 800px) {
    width: 40%;
  }
`
const ImgBtn = styled('img')`
  height: 100%;
`