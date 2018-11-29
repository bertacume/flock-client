import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily, addTrip } from '../../helpers/styleConstants';
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
    return (<SubContainer>
      <Title>Add multiple dates:</Title>
        <DateRange
          onInit={null}
          startDate={null}
          endDate={null}
          onChange={this.onCalendarChange}
          calendars={1}
          twoStepChange={true}
          theme={CalendarTheme}
        />
      {this.props.time.suggestions &&
        <List 
        items={this.renderDatesSuggestions()} 
        deleteItem={this.deleteItem} 
        styles={{
          itemTitle : ['color: #b75537', 'margin: 0', 'font-size: 1.4rem'], 
          listContainer : ['max-height: 9.6rem;'],
          listItem : ['background-color: rgba(255, 255, 255, .3)', 
          'padding: 0 35px',
          'height: 2.8rem', 
          'margin: .2rem 0'],
        }}
        />}
    </SubContainer>
    );
  }

  renderDictator = () => {
    return (<SubContainer>
      <Title>Dates:</Title>
      <DateRange
        startDate={this.props.time.chosenOne ? this.props.time.chosenOne[0] : null}
        endDate={this.props.time.chosenOne ? this.props.time.chosenOne[1] : null}
        onChange={this.onCalendarChange}
        twoStepChange={true}
        calendars={1}
      />
    </SubContainer>
    );
  }

  render() {
    return (
      <Container>
        <WizardMode mode={this.state.dictator} setMode={this.setMode} />
        {this.state.dictator ? this.renderDictator() : this.renderDemocracy()}
      </Container>
    );
  }
}

//STYLES

const CalendarTheme = {
  DayInRange: {
    background: 'rgba(255, 255, 255, .6)',
    color: '#b75537'
  }, 
  DaySelected: {
    background: '#ffffff',
    color: '#b75537'
  },
  Calendar: {
    width: 240,
    padding: 0,
    background: 'transparent',
    borderRadius: '3rem',
    display: 'inline-block',
    boxSizing: 'border-box',
    letterSpacing: 0,
    color: '#b75537'
  },
  DateRange: {
    display: 'block',
    boxSizing: 'border-box',
    background: 'transparent',
    borderRadius: '2px'
  },
  MonthButton: {
    display: 'block',
    boxSizing: 'border-box',
    height: 25,
    width: 25,
    padding: 0,
    margin: '0 10px',
    border: 'none',
    background: 'rgba(255, 255, 255, .4)',
    boxShadow: 'none',
    outline: 'none',
    borderRadius: '50%'
  },
  MonthArrowPrev: {
    borderRightWidth: '6px',
    borderRightColor: '#b75537',
    marginLeft: 4
  },
  MonthArrowNext: {
    borderLeftWidth: '6px',
    borderLeftColor: '#b75537',
    marginLeft: 10
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
  color: #b75537;
  font-family: ${fontFamily};
  font-size: 1.5rem;
  margin: 2px;
`

const SubContainer = styled('div')`
  width: 90%;
  display: flex;
  padding: 10px 0 30px 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${addTrip.containerBackground};
  border-radius: 3rem;
`