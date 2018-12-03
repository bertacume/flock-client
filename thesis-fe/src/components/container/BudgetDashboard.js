import React, { Component } from 'react';
import styled from 'react-emotion';
import budgetImg from '../../assets/location.png';
import { Navbar } from '../presentational/Navbar';
import ADD_OR_VOTE_FOR_BUDGET from '../apollo/mutations/add_or_vote_for_budget';
import REMOVE_VOTE_FOR_BUDGET from '../apollo/mutations/remove_vote_for_budget';
import { PollList } from '../presentational/PollList';

class BudgetDashboard extends Component {
  addVote = (mutation, value) => {
    const variables = { tripID: this.props.tripID, budget: { value } };
    mutation({ variables });
  }

  removeVote = (mutation, id) => {
    const variables = { tripID: this.props.tripID, budgetID: id };
    mutation({ variables });
  }

  renderDemocracy = () => {
    const { self } = this.props.info;
    const { budget } = this.props.info.trip;
    return (<Container>
      <SubContainer>
        <p>Slider goes here</p>
      </SubContainer>
      <List>
        <PollList
          mutations={{ addVote: ADD_OR_VOTE_FOR_BUDGET, removeVote: REMOVE_VOTE_FOR_BUDGET }}
          items={budget.suggestions}
          self={self}
          type={'budget'}
          addVote={this.addVote}
          removeVote={this.removeVote}
          deleteItem={this.deleteItem}
        />
      </List>
    </Container>
    );
  }
  render() {
    const { budget } = this.props.info.trip;
    return (
      <Container>
        <Navbar
        tripID={this.props.tripID}
        title={'budget'}
        icon={budgetImg}
        history={this.props.history}
        />
        {budget.isDictated ? this.renderDictated() : this.renderDemocracy()}
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
export default BudgetDashboard;