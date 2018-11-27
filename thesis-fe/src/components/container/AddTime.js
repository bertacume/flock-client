import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';
import { WizardMode } from './WizardMode';
import { List } from './List';
import { DateRange } from 'react-date-range';

export class AddTime extends Component {
  state = {
    dictator: false,
  }

  componentDidMount() {
    const chosenTime = this.props.time.chosenOne;
    if (chosenTime) return this.setState({ dictator: true });
  }

  setMode = (flag) => {
    this.setState({ dictator: flag });
  }

  renderDatesSuggestions = () => {
    return this.props.time.suggestions.map(el => `${el[0]} -- ${el[1]}`);
  }

  deleteItem = (item) => {
    const suggestions = this.props.time.suggestions.filter(el => `${el[0]} -- ${el[1]}` !== item);
    this.props.setDates({ suggestions, chosenOne: null });
  }

  checkExistingDates = (arr, range) => {
    const filtered = arr.filter(subarr => subarr.join('') === range.join(''));
    return !filtered.length;
  }

  onCalendarChange = (date) => {
    const start = date.startDate.format("DD-MM-YYYY");
    const end = date.endDate.format("DD-MM-YYYY");
    const range = [start, end];
    if (!start || !end) return;
    if (this.state.dictator) return this.props.setDates({ suggestions: [], chosenOne: range });
    const oldSuggestions = this.props.time.suggestions;
    let suggestions;
    if (oldSuggestions) {
      if (!this.checkExistingDates(oldSuggestions, range)) return; //TODO: throw alert
      suggestions = oldSuggestions.slice();
    } else suggestions = [];
    suggestions.push(range);
    this.props.setDates({ suggestions, chosenOne: null });
  }

  renderDemocracy = () => {
    return (<Container>
      <Title>Add multiple dates:</Title>
        <DateRange
          onInit={null}
          startDate={null}
          endDate={null}
          onChange={this.onCalendarChange}
          calendars={1}
          twoStepChange={true}
          theme={{
            DayInRange: {
              background: '#bcd9d7',
              color: '#ffffff'
            }, 
            DaySelected: {
              background: '#7ba9a9',
              color: '#ffffff'
            },
          }}
        />
      {this.props.time.suggestions &&
        <List items={this.renderDatesSuggestions()} deleteItem={(item) => this.deleteItem(item)} />}
    </Container>
    );
  }

  renderDictator = () => {
    return (<Container>
      <Title>Dates:</Title>
      <DateRange
        startDate={this.props.time.chosenOne ? this.props.time.chosenOne[0] : null}
        endDate={this.props.time.chosenOne ? this.props.time.chosenOne[1] : null}
        onChange={this.onCalendarChange}
        twoStepChange={true}
        calendars={1}
      />
    </Container>
    );
  }

  render() {
    return (
      <Container>
        <WizardMode mode={this.state.dictator} setMode={(flag) => this.setMode(flag)} />
        {!this.state.dictator ? this.renderDemocracy() : this.renderDictator()}
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;

  Input:focus{
    outline: none;
  }
`
const Title = styled('p')`
  color: #afafaf;
  font-family: ${fontFamily};
  font-size: 1.5rem;
`