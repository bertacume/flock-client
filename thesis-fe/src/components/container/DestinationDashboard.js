import React, { Component } from 'react';
import styled from 'react-emotion';
import star from '../../assets/svg/star.svg';
import { Input } from '../styledComponents/styledComponents';
import { Navbar } from '../presentational/Navbar';
import locationImg from '../../assets/location.png';
import { Mutation } from "react-apollo";
import { PollList } from '../presentational/PollList';
import ADD_OR_VOTE_FOR_DESTINATION from '../apollo/mutations/add_or_vote_for_destination';
import REMOVE_VOTE_FOR_DESTINATION from '../apollo/mutations/remove_vote_for_destination';


class DestinationDashboard extends Component {
  state = {
    input: '',
  }

  handleInput = (event) => {
    this.setState({ input: event.target.value });
  }

  handleAddClick = (mutation) => {
    this.addVote(mutation, this.state.input);
    this.setState({ input: '' });
  }

  addVote = (mutation, name) => {
    const variables = { tripID: this.props.tripID, destinations: [{ name }] };
    mutation({ variables });
  }

  removeVote = (mutation, id) => {
    const variables = { tripID: this.props.tripID, destinationID: id };
    mutation({ variables });
  }

  deleteItem = (item) => {
    //TODO: mutation that check and deletes item 
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
        <Input type="text" placeholder={'Add suggestons'} value={this.state.input} onChange={this.handleInput} />
        <Mutation
          mutation={ADD_OR_VOTE_FOR_DESTINATION}
        >
          {(mutation, { data }) => (
            <ButtonAdd onClick={() => this.handleAddClick(mutation)}><ImgBtn src={require('../../assets/plus.png')} /></ButtonAdd>
          )}
        </Mutation>
      </SubContainer>
      <List>
        <PollList
          mutations={{ addVote: ADD_OR_VOTE_FOR_DESTINATION, removeVote: REMOVE_VOTE_FOR_DESTINATION }}
          items={destination.suggestions}
          self={self}
          type={'destination'}
          addVote={this.addVote}
          removeVote={this.removeVote}
          deleteItem={this.deleteItem}
        />
      </List>
    </Container>
    );
  }

  render() {
    const { destination } = this.props.info.trip;
    return (
      <Container>
        <Navbar 
        path={`/tripdetails/${this.props.tripID}`}
        title={'destination'}
        icon={locationImg}
        history={this.props.history}
        />
        {destination.isDictated ? this.renderDictated() : this.renderDemocracy()}
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
`
const ContainerDestination = styled('div')`
  width: 80vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const H1 = styled('h1')`
  font-size: 1.5rem;
  margin-left: 1rem;
  color: #e48264;
`
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
export default DestinationDashboard;