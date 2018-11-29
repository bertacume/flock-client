import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/styleConstants';
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
    currentView: 0,
    tripData: {
      name: null,
      destination: {
        isDictated: false,
        suggestions: [],
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

  setDates = datesObj => {
    this.setState({ tripData: { ...this.state.tripData, time: { ...datesObj } } });
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

  handleNextClick = () => {
    if (this.state.currentView === 0 && !this.state.tripData.name) {
      this.setState({ isNextAviable: true });
      return;
    }
    this.setState({ currentView: this.state.currentView + 1 });
  }

  handleSkipTripClick = (current) => {
    const { tripData } = this.state;
    if (tripData[current].isDictated) this.setDestination({ ...tripData.destination, isDictated: false });
    this.handleNextClick();
  }

  handleCreateTripClick = () => {
  }

  renderViews = () => {
    const { currentView, tripData } = this.state;
    switch (currentView) {
      case 1:
        return (<WizardPage key={1} flipMove={false}>
          <PointsImg src={require('../../assets/1.png')} />
          <AddDestination destination={tripData.destination} setDestination={input => this.setDestination(input)} />
        </WizardPage>);

      case 2:
        return (<WizardPage key={2} flipMove={false}>
          <PointsImg src={require('../../assets/2.png')} />
          <AddTime
            time={tripData.time} setDates={dates => this.setDates(dates)} />
        </WizardPage>);

      case 3:
        return (<WizardPage key={3} flipMove={false}>
          <PointsImg src={require('../../assets/3.png')} />
          <AddBudget
            budget={tripData.budget} setBudget={budget => this.setBudget(budget)} />
        </WizardPage>);

      case 4:
        return (<WizardPage key={4} flipMove={false}>
          <PointsImg src={require('../../assets/4.png')} />
          <AddMembers
            members={tripData.members} setMembers={members => this.setMembers(members)} />
        </WizardPage>);

      default:
        return (
          <WizardPage key={0} flipMove={false}>
            <PointsImg src={require('../../assets/0.png')} />
            <AddName
              name={tripData.name} setName={input => this.setName(input)}
              nameRequired={this.state.isNextAviable} />
          </WizardPage>
        );
    }
  }

  renderNavigateLeftBtns = () => {
    return (this.state.currentView !== 0 ?
      <Button onClick={this.handleBackClick}><ImgBtn src={require('../../assets/before.png')} /></Button> :
      <FakeBtn></FakeBtn>);
  }

  renderNavigateRightBtns = () => {
    const { currentView, tripData } = this.state;
    if (currentView === 4) return <Button onClick={this.handleCreateTripClick}>CREATE TRIP</Button>;
    const current = this.relation[currentView]
    if (currentView === 0 ||
      (tripData[current].suggestions && tripData[current].suggestions.length)) {
      return <Button onClick={this.handleNextClick}><ImgBtn src={require('../../assets/next.png')} /></Button>;
    }
    return <Button onClick={() => this.handleSkipTripClick(current)}><ImgBtn src={require('../../assets/skip.png')} /></Button>;
  }


  render() {
    return (
      <Container>
        <PoseGroup>
          {this.renderViews()}
        </PoseGroup>
        <ButtonContainer>
          {this.renderNavigateLeftBtns()}
          {this.renderNavigateRightBtns()}
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
  height: 95%;
  display: flex;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0;
  @media (min-width: 600px) {
    width: 80%;
  }
  @media (min-width: 800px) {
    width: 50%;
  }
`
const ButtonContainer = styled('div')`
  width: 100%;
  height: 5%;
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
    width: 70%;
  }
  @media (min-width: 800px) {
    width: 60%;
  }
`
const ImgBtn = styled('img')`
  height: 100%;
`