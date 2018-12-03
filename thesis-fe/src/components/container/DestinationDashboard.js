import React, { Component } from 'react';
import styled from 'react-emotion';
import star from '../../assets/svg/star.svg';
import back from '../../assets/back.png';
import { NavBar, Input } from '../styledComponents/styledComponents';
import locationImg from '../../assets/location.png';
import { Mutation } from "react-apollo";
import { PollList } from './PollList';
import ADD_OR_VOTE_FOR_DESTINATION from '../apollo/mutations/add_or_vote_for_destination';


class DestinationDashboard extends Component {

  redirectToTrip = () => {
    this.props.history.push('/tripdetails/' + this.props.location.pathname.split('/')[2])
  }

  handleItem = (mutation, item) => {
    const variable = { tripID: this.props.tripID, destinations: [{ name: item.name }] };
    mutation({ variables: variable });
  }

  deleteItem = (item) => {
    //TODO: mutation that check and deletes item 
  }

  renderNavBar = () => {
    return (<NavBar>
      <Button onClick={this.redirectToTrip}>
        <Icon src={back} />
      </Button>
      <Title>destination</Title>
      <Button onClick={this.redirectToTrip}>
        <Icon src={locationImg} />
      </Button>
    </NavBar>);
  }

  renderDictated = () => {
    const { destination } = this.props.info.trip;
    return (<ContainerDestination key='1'>
      <img src={star} alt="winner" height="25" width="25" />
      <H1>{destination.chosenDestination.name}</H1>
      <H1>votes: {destination.chosenDestination.voters.length}</H1>
      <H1>creator: {destination.chosenDestination.creator.firstName}</H1>
    </ContainerDestination>);
  }

  renderDemocracy = () => {
    const { self } = this.props.info;
    const { destination } = this.props.info.trip;
    return (<Container>
      <SubContainer>
        <Input placeholder={'Add suggestons'} />
        <ButtonAdd onClick={this.handleAddClick}><ImgBtn src={require('../../assets/plus.png')} /></ButtonAdd>
      </SubContainer>
      <List>
      <PollList
        mutations={{ addVote: ADD_OR_VOTE_FOR_DESTINATION, removeVote: ADD_OR_VOTE_FOR_DESTINATION }}
        items={destination.suggestions}
        deleteItem={this.deleteItem}
        handleItem={this.handleItem}
        tripId={this.props.tripId}
        self={self}
      />
      </List>
    </Container>

    );
  }

  render() {
    const { destination } = this.props.info.trip;
    return (
      <Container>
        {this.renderNavBar()}
        {/* <ContainerDestinations> */}
        {destination.isDictated ? this.renderDictated() : this.renderDemocracy()}
        {/* </ContainerDestinations> */}
      </Container>
    );
  }
}

const Container = styled('div')`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
  Input:focus{
    outline: none;
  }
  Input {
    color: #ffffff;
    border-color: #ffffff;
    height: 50%;
  }
  Input::placeholder {
    color: #ffffff;
  }
  button:active {
    border-width: 0;
  }
`
const List = styled('div')`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`
const SubContainer = styled('div')`
  width: 100%;
  height: 18%;
  margin: 5px 0;
  padding: 10px 0;
  display: flex;
  flex-direction column;
  justify-content: space-evenly;
  align-items: center;
  background: #e9e9e9;
  // background: #ff7e5f;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(315deg, #feb47b, #ff8e62);  /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(315deg, #feb47b, #ff8e62);
  // border-radius: 2rem;
`
const Button = styled('button')`
  height: 90%;
  width: 10%;
  padding: 0;
  border-width: 0;
  background-color: transparent;
`
const Icon = styled('img')`
  height: 80%;
`;
const Title = styled('p')`
  margin: 0;
  // font-family: Kathen;
  text-transform: uppercase;
  // color: #e88d6f;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(315deg, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(315deg, #feb47b, #ff7e5f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  text-align: center
`
const ContainerDestination = styled('div')`
  width: 80vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ContainerDestinations = styled('div')`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const H1 = styled('h1')`
  font-size: 1.5rem;
  margin-left: 1rem;
  color: #e48264;
`;

const ImgBtn = styled('img')`
  height: 100%;
`
const ButtonAdd = styled('button')`
  width: 20vw;
  height: 5vh;
  border-width: 0;
  border-color: #afafaf;
  border-radius: 10px;
  background-color: transparent;
`
// const H2 = styled('h1')`
//   font-size: 1.25rem;
//   margin: 0 1rem;
//   color: #e48264;
// `;
// const GoBackButton = styled('button')`
//   position: absolute;
//   right: 40vw;
//   margin-top: 2rem;
//   margin-right: .25rem;
//   position: relative;
//   font-size: 2rem;
// `;
export default DestinationDashboard;