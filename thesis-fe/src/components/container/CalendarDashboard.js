import React, { Component } from 'react';
import styled from 'react-emotion'
import back from '../../assets/svg/back.svg';
import { Link } from "react-router-dom";
import plus from '../../assets/plus-gradient.png';
import { fontFamily } from '../../helpers/styleConstants';
import { Navbar } from '../presentational/Navbar';
import calendarImg from '../../assets/svg/calendar2.svg';
import { PollList } from '../presentational/PollList';
import ADD_OR_VOTE_FOR_TIMEFRAME from '../apollo/mutations/add_or_vote_for_timeframe';
import REMOVE_VOTE_FOR_TIMEFRAME from '../apollo/mutations/remove_vote_for_timeframe';
import LOCK_TIMEFRAME from '../apollo/mutations/lock_timeframe';
import UNLOCK_TIMEFRAME from '../apollo/mutations/unlock_timeframe';
import moment from 'moment';
import DictatorList from './DictatorList';

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

const BIG = styled('h1')`
  font-size: 3rem;
  color: white;
`;

const Button = styled('button')`
width: 20vw;
height: 10vh;
margin: 10px 0 20px 0;
border-width: 0;
border-color: #afafaf;
border-radius: 10px;
background-color: white;
font-family: ${fontFamily};
`

const ImgBtn = styled('img')`
  height: 100%;
`




class MyTripsDashboard extends Component {

  redirectToTrip = () => {
    console.log(this.props.match.params.id);
    this.props.history.push('/tripdetails/' + this.props.match.params.id)
  }

  addVote = (mutation, dates) => {
    const datesFix = dates.split(' - ')
    let datesFixStart = datesFix[0].split('-')
    datesFixStart = datesFixStart[1] + '-' +  datesFixStart[0] + '-' + datesFixStart[2];
    let datesFixEnd = datesFix[1].split('-')
    datesFixEnd = datesFixEnd[1] + '-' +  datesFixEnd[0] + '-' + datesFixEnd[2];
    console.log(datesFixEnd);
    console.log(datesFixStart);
    const variables = { tripID: this.props.match.params.id, timeFrames: {
      startDate : datesFixStart,
      endDate : datesFixEnd
      }
    };
    console.log(variables);
    mutation({ variables });
  }

  removeVote = (mutation, id) => {
    console.log(this.props)
    const variables = { tripID: this.props.match.params.id, suggestionID: id };
    mutation({ variables });
  }

  lock = (mutation, id) => {
    const variables = { tripID: this.props.match.params.id, suggestionID: id };
    console.log(variables);
    mutation({ variables });
  }

  unlock = (mutation, id) => {
    console.log(mutation, id)
    console.log('aaaa')
    const variables = { tripID: this.props.match.params.id, suggestionID: id };
    mutation({ variables });
  }

  renderDemocracy = () => (
    <Container>
    <Link to={'/tripdetails/' + this.props.match.params.id + '/calendar/add'}>
      <Button ><ImgBtn src={plus} /></Button>
    </Link>
    <List>
      <PollList
        mutations={{ addVote: ADD_OR_VOTE_FOR_TIMEFRAME, removeVote: REMOVE_VOTE_FOR_TIMEFRAME, lock: LOCK_TIMEFRAME, unlock: UNLOCK_TIMEFRAME }}
        items={this.props.info.trip.timeFrame.suggestions}
        self={this.props.info.self}
        type={'calendar'}
        addVote={this.addVote}
        removeVote={this.removeVote}
        deleteItem={this.deleteItem}
        lock={this.lock}
        unlock={this.unlock}
        creator={this.props.info.trip.creator}
      />
    </List>
  </Container>
  )

  renderDictator = () => (
    <DictatorList unlock={UNLOCK_TIMEFRAME} info={this.props.info} tripID={this.props.match.params.id} ctx='timeFrame' />
  )

  render() {
    console.log(this.props);
    return (
      <Container>
    <Navbar
    path={`/tripdetails/${this.props.match.params.id}`}
    title={'calendar'}
    icon={calendarImg}
    history={this.props.history}
    />
      { !this.props.info.trip.timeFrame.isLocked && !this.props.info.trip.isDictated ?
        this.renderDemocracy()
        :
        this.renderDictator()
      }
      </Container>
    );
  }
}

export default MyTripsDashboard;