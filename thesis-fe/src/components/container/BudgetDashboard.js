import React, { Component } from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';
import chat from '../../assets/chat.png';
import { Navbar } from '../presentational/Navbar';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { fontFamily, basicColors } from '../../helpers/styleConstants';
import ADD_OR_VOTE_FOR_BUDGET from '../apollo/mutations/add_or_vote_for_budget';
import REMOVE_VOTE_FOR_BUDGET from '../apollo/mutations/remove_vote_for_budget';
import LOCK_BUDGET from '../apollo/mutations/lock_budget';
import UNLOCK_BUDGET from '../apollo/mutations/unlock_budget';
import { PollList } from '../presentational/PollList';
import { Mutation } from 'react-apollo';
import DictatorList from './DictatorList';

const minDefault = 0;
const maxDefault = 1000;
const valueDefault = (maxDefault - minDefault) / 2;

class BudgetDashboard extends Component {
  state = {
    min: minDefault,
    max: maxDefault,
    value: valueDefault,
    adding: false,
  }

  componentDidMount () {
    this.props.sub();
  }

  handleInput = (value, mutation) => {
    this.addVote(mutation, value);
    this.clearBudget();
  }

  handleIntervalBtnsClick = (type) => {
    if (type === 'plus') this.setState({ max: this.state.max * 2 })
    else this.setState({ max: this.state.max / 2 })
  }

  clearBudget = () => {
    this.setState({
      min: minDefault,
      max: maxDefault,
      value: (maxDefault - minDefault) / 2,
      adding: false,
    })
  }

  addVote = (mutation, value, userVoted) => {
    const variables = { tripID: this.props.tripID, budget: { value } };
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

  renderSlider = () => {
    const { min, max, value } = this.state;

    return (<SliderContainer>
      <SubTitleContainer>
        {this.state.adding ?
          <SubTitle>{value}</SubTitle> :
          <Title>Drag to set the price</Title>}
      </SubTitleContainer>
      <SliderWrapper>
        <Mutation
          mutation={ADD_OR_VOTE_FOR_BUDGET}
        >
          {(mutation, { data }) => (
            <InputRange
              formatLabel={() => ``}
              maxValue={max}
              minValue={min}
              step={10}
              value={value}
              onChange={value => this.setState({ value, adding: true })}
              onChangeComplete={(value) => this.handleInput(value, mutation)} />
          )}
        </Mutation>
      </SliderWrapper>
      <SliderLblsContainer>
        <BtnContainer>
          <Label className={minClass}>{min}</Label>
          {(value * 2 < max) &&
            <ButtonInterval onClick={() => this.handleIntervalBtnsClick('minus')}>
              <ImgBtn src={require('../../assets/minus_orange.png')} />
            </ButtonInterval>
          }
        </BtnContainer>
        <BtnContainer>
          <Label>{max}</Label>
          <ButtonInterval onClick={() => this.handleIntervalBtnsClick('plus')}>
            <ImgBtn src={require('../../assets/plus_orange.png')} />
          </ButtonInterval>
        </BtnContainer>
      </SliderLblsContainer>
    </SliderContainer>);
  }

  renderDemocracy = () => {
    const { self } = this.props.info;
    const { budget } = this.props.info.trip;
    return (<Container>
      <SubContainer>
        {this.renderSlider()}
      </SubContainer>
      <List>
        <PollList
          mutations={{ addVote: ADD_OR_VOTE_FOR_BUDGET, removeVote: REMOVE_VOTE_FOR_BUDGET, lock: LOCK_BUDGET, unlock: UNLOCK_BUDGET }}
          items={budget.suggestions}
          self={self}
          type={'budget'}
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
  renderDictated = () => (
    <DictatorList unlock={UNLOCK_BUDGET} info={this.props.info} tripID={this.props.tripID} ctx='budget' />
  )

  render() {
    const { budget } = this.props.info.trip;
    return (
      <Container>
        <Navbar
          pathLeft={`/tripdetails/${this.props.tripID}`}
          pathRight={`/tripdetails/${this.props.tripID}/chat/budget`}
          title={'budget'}
          iconRight={chat}
          history={this.props.history}
        />
        {budget.isDictated || budget.isLocked ? this.renderDictated() : this.renderDemocracy()}
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
  height: 30%;
  margin: 5px 0;
  padding: 10px 0;
  display: flex;
  flex-direction column;
  justify-content: space-evenly;
  align-items: center;
  background: #d8d8d8;
`
export const SliderContainer = styled('div')`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction column;
  justify-content: center;
  align-items: center;
`
export const SliderWrapper = styled('div')`
  width: 75%;
  touch-action: none;
  display: inline-block;

  .input-range__slider {
    background: ${basicColors.lightColor};
    border: 1px solid ${basicColors.lightColor};
  }

  .input-range__track {
    background: #ffffff;
  }

  .input-range__track--active {
    background: ${basicColors.lightColor};
  }
`
export const Label = styled('p')`
  color: ${basicColors.lightColor};
  font-weight: 600;
  margin: 2px;
`
export const SliderLblsContainer = styled('div')`
  width: 80%;
  margin: 0;
  display: flex;
  flex-direction row;
  justify-content: space-between;
`
export const SubTitleContainer = styled('div')`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction row;
  justify-content: center;
  align-items: center;
`
export const SubTitle = styled('p')`
  color: ${basicColors.lightColor};
  font-family: ${fontFamily};
  font-size: 3rem;
`
const Title = styled('p')`
  color: ${basicColors.lightColor};
  font-size: 1.5rem;
`
const BtnContainer = styled('div')`
  height: 100%;
  margin: 5px 0 10px 0;
  display: flex;
  flex-direction column;
  align-items: center;
`
const ButtonInterval = styled('button')`
  align-self: center;
  border-width: 0;
  background-color: transparent;
  width: 10vw;
`
const ImgBtn = styled('img')`
  width: 100%;
`
const minClass = css`
  padding: 0 6px;
`
export default BudgetDashboard;