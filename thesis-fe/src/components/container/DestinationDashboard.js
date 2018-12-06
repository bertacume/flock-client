import React, { Component } from 'react';
import styled from 'react-emotion';
import { Input } from '../styledComponents/styledComponents';
import { Navbar } from '../presentational/Navbar';
import chat from '../../assets/chat.png';
import { Mutation } from "react-apollo";
import { PollList } from '../presentational/PollList';
import ADD_OR_VOTE_FOR_DESTINATION from '../apollo/mutations/add_or_vote_for_destination';
import REMOVE_VOTE_FOR_DESTINATION from '../apollo/mutations/remove_vote_for_destination';
import LOCK_DESTINATION from '../apollo/mutations/lock_destination';
import UNLOCK_DESTINATION from '../apollo/mutations/unlock_destination';
import DictatorList from './DictatorList';


class DestinationDashboard extends Component {
  state = {
    input: '',
  }

  componentDidMount () {
    this.props.sub();
  }

  handleInput = (event) => {
    this.setState({ input: event.target.value });
  }

  handleAddClick = (mutation) => {
    if (this.state.input.length > 0) {
      this.addVote(mutation, this.state.input);
      this.setState({ input: '' });
    }
  }

  addVote = (mutation, name) => {
    const variables = { tripID: this.props.tripID, destinations: [{ name }] };
    mutation({ variables });
  }

  removeVote = (mutation, id) => {
    const variables = { tripID: this.props.tripID, suggestionID: id };
    mutation({ variables });
  }

  lock = (mutation, id) => {
    const variables = { tripID: this.props.tripID, suggestionID: id };
    mutation({ variables });
  }

  unlock = (mutation, id) => {
    const variables = { tripID: this.props.tripID, suggestionID: id };
    mutation({ variables });
  }

  deleteItem = (item) => {
    //TODO: mutation that check and deletes item
  }

  renderDictated = () => (
    <DictatorList unlock={UNLOCK_DESTINATION} lock={LOCK_DESTINATION} info={this.props.info} tripID={this.props.match.params.id} ctx='destination' />
  )

  renderDemocracy = () => {
    const { self } = this.props.info;
    const { destination } = this.props.info.trip;
    return (<Container>
      <SubContainer>
        <Input type="text" placeholder={'Add suggestions'} value={this.state.input} onChange={this.handleInput} />
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
          mutations={{ addVote: ADD_OR_VOTE_FOR_DESTINATION, removeVote: REMOVE_VOTE_FOR_DESTINATION, lock: LOCK_DESTINATION, unlock: UNLOCK_DESTINATION }}
          items={destination.suggestions}
          self={self}
          type={'destination'}
          addVote={this.addVote}
          removeVote={this.removeVote}
          deleteItem={this.deleteItem}
          lock={this.lock}
          unlock={this.unlock}
          creator={this.props.info.trip.creator}
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
        pathLeft={`/tripdetails/${this.props.tripID}`}
        pathRight={`/tripdetails/${this.props.tripID}/chat/destination`}
        title={'destination'}
        iconRight={chat}
        history={this.props.history}
        />
        {destination.isDictated || destination.isLocked ? this.renderDictated() : this.renderDemocracy()}
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
  background: #d8d8d8;
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
