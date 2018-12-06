import React, { Component } from 'react';
import styled from 'react-emotion';
import { Mutation } from "react-apollo";
import unlock from '../../assets/svg/unlock.svg'
import moment from 'moment';
import { backGradient } from '../../helpers/styleConstants';


class DictatorList extends Component {

  render () {
    const context  = this.props.info.trip[this.props.ctx]
    const creator = context.chosenSuggestion.creator.firstName;
    const votes = context.chosenSuggestion.voters;
    let chosen;
    let type;
     if (context.chosenSuggestion.name) {
       chosen = context.chosenSuggestion.name;
       type = 'Destination'
     }
     else if (context.chosenSuggestion.value) {
       chosen = context.chosenSuggestion.value;
       type = 'Budget'
     }
     else {
      chosen = context.chosenSuggestion;
      chosen= moment(chosen.startDate).format('DD-MM-YYYY') + ' - ' + moment(chosen.endDate).format('DD-MM-YYYY');
      type = 'Timeframe'
     }
    return (<ContainerDictator key='1'>
      {(type === 'Timeframe') ?
        <div>
          <HD>Chosen { type }:</HD> <HD> {chosen}</HD>
        </div>
      :
        <HD>Chosen { type }: {chosen}</HD>
      }

      <Votes>
        <HD>Votes: {votes.length}</HD>
        {votes.map(obj => (
          <H2 key={obj.firstName + obj.lastName}>Name: {obj.firstName}</H2>
        ))}
      </Votes>
      <HD>Creator: {creator}</HD>
      {(this.props.info.self.email === this.props.info.trip.creator.email) ?
        <Mutation
          mutation={this.props.unlock}
          variables={{ tripID : this.props.tripID }}
        >
        { add => <img src={unlock} alt="confirm" height="40" width="40" onClick={add} /> }
        </Mutation>
      :
        null
      }
    </ContainerDictator>);
  }


}

const Votes = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


const ContainerDictator = styled('div')`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${backGradient};
  border-radius: 25px;
  padding-bottom: 1rem;
  margin-tiop: 2rem;
`
const HD = styled('p')`
  font-size: 2rem;
  margin-left: 1rem;
  color: white;
`
const H2 = styled('p')`
  font-size: 1.5rem;
  margin-left: 2rem;
  color: white;
`


export default DictatorList;
