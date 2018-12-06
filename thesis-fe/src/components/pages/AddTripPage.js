import React, { Component } from 'react';
import styled from 'react-emotion'
import { AddName } from '../container/AddName';
import { AddDestination } from '../container/AddDestination';
import { AddTime } from '../container/AddTime';
import { AddBudget } from '../container/AddBudget';
import { AddParticipants } from '../container/AddParticipants';
import { backGradient } from '../../helpers/styleConstants';
import posed, { PoseGroup } from 'react-pose';
import { Mutation } from "react-apollo";
import CREATE_TRIP from '../apollo/mutations/create_trip';

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
      timeFrame: {
        isDictated: false,
        suggestions: [],
      },
      budget: {
        isDictated: false,
        suggestions: [],
      },
      participants: [],
    },
    isNextAviable: false,
  }

  relation = ['name', 'destination', 'timeFrame', 'budget', 'participants'];

  setName = input => {
    this.setState({ tripData: { ...this.state.tripData, name: input }, isNextAviable: false });
  }

  setDestination = destinationObj => {
    this.setState({ tripData: { ...this.state.tripData, destination: { ...destinationObj } } });
  }

  setDates = datesObj => {
    this.setState({ tripData: { ...this.state.tripData, timeFrame: { ...datesObj } } });
  }

  setBudget = budgetObj => {
    this.setState({ tripData: { ...this.state.tripData, budget: { ...budgetObj } } });
  }

  setParticipants = participants => {
    this.setState({ tripData: { ...this.state.tripData, participants } });
  }

  resetCurrentState = current => {
    const { tripData } = this.state;
    this.setState({ tripData: { ...tripData, [current]: { suggestions: [], isDictated: false } } });
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

  handleSkipTripClick = current => {
    const { tripData } = this.state;
    if (tripData[current].isDictated) this.resetCurrentState(current);
    this.handleNextClick();
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
            timeFrame={tripData.timeFrame} setDates={dates => this.setDates(dates)} />
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
          <AddParticipants
            participants={tripData.participants} setParticipants={participants => this.setParticipants(participants)} />
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
      <Button onClick={(res) => this.props.history.push(`/mytrips`)}><ImgBtn src={require('../../assets/before.png')} /></Button>);
  }

  renderNavigateRightBtns = () => {
    const { currentView, tripData } = this.state;
    if (currentView === 4) return this.renderCreateTripbtn();
    const current = this.relation[currentView]
    if (currentView === 0 ||
      (tripData[current].suggestions && tripData[current].suggestions.length)) {
      return <Button onClick={this.handleNextClick}><ImgBtn src={require('../../assets/next.png')} /></Button>;
    }
    return <Button onClick={() => this.handleSkipTripClick(current)}><ImgBtn src={require('../../assets/skip.png')} /></Button>;
  }

  renderCreateTripbtn = () => {
    const { tripData } = this.state;
    return (
      <Mutation
        mutation={CREATE_TRIP}
        onCompleted={(res) => this.props.history.push(`/tripdetails/${res.createTrip.id}`)}>
        {(createTrip, { data }) => (
          <div>
            <Button onClick={() => createTrip({ variables: { trip: tripData } })}>CREATE TRIP</Button>
          </div>
        )}
      </Mutation>
    );

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
  background: ${backGradient};
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
  color: #ffffff;
  border-width: 0;
  border-color: #afafaf;
  border-radius: 10px;
  background-color: transparent;
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