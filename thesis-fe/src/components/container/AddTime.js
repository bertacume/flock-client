import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily, addTrip } from '../../helpers/styleConstants';
import { WizardMode } from './WizardMode';
import { List } from './List';
import { DateRange } from 'react-date-range';
import moment from 'moment'

export class AddTime extends Component {
  setMode = (isDictated) => {
    this.props.setDates({ suggestions: [], isDictated });
  }

  deleteItem = (item) => {
    const suggestions = this.props.time.suggestions.filter(el => `${el[0]} -- ${el[1]}` !== item);
    this.props.setDates({ ...this.props.time, suggestions });
  }

  checkExistingDates = (arr, range) => {
    const filtered = arr.filter(subarr => subarr.join('') === range.join(''));
    return !filtered.length;
  }

  onCalendarChange = (date) => {
    const { time } = this.props;
    const start = date.startDate.format("DD-MM-YYYY");
    const end = date.endDate.format("DD-MM-YYYY");
    if (!start || !end) return;
    const range = [start, end];
    if (this.props.time.isDictated) return this.props.setDates({ ...this.props.time, suggestions: [range] });
    if (!this.checkExistingDates(time.suggestions, range)) return; //TODO: throw alert
    const suggestions = time.suggestions.slice();
    suggestions.push(range);
    this.props.setDates({ ...this.props.time, suggestions});
  }

  renderDemocracy = () => {
    const { time } = this.props;
    return (<SubContainer>
      <Title>Add multiple dates:</Title>
      <DateRange
       startDate={this.getDateInit(0)}
       endDate={this.getDateInit(1)}
        onChange={this.onCalendarChange}
        calendars={1}
        twoStepChange={true}
        theme={CalendarTheme}
      />
      {!!time.suggestions &&
        <List
          items={time.suggestions.map(el => `${el[0]} -- ${el[1]}`)}
          deleteItem={this.deleteItem}
          styles={{
            itemTitle: ['color: #b75537', 'margin: 0', 'font-size: 1.4rem'],
            listContainer: ['max-height: 9.6rem;'],
            listItem: ['background-color: rgba(255, 255, 255, .3)',
              'padding: 0 35px',
              'height: 2.8rem',
              'margin: .2rem 0'],
          }}
        />}
    </SubContainer>
    );
  }

  getDateInit = (index) => {
    if (this.props.time.suggestions.length && this.props.time.suggestions[0]) {
      return this.props.time.suggestions[0][index];
    }
    return moment();
  }

  renderDictator = () => {
    return (<SubContainer>
      <Title>Dates:</Title>
      <DateRange
        startDate={this.getDateInit(0)}
        endDate={this.getDateInit(1)}
        onChange={this.onCalendarChange}
        twoStepChange={true}
        theme={CalendarTheme}
        calendars={1}
      />
    </SubContainer>
    );
  }

  render() {
    return (
      <Container>
        <WizardMode mode={this.props.time.isDictated} setMode={this.setMode} />
        {this.props.time.isDictated ? this.renderDictator() : this.renderDemocracy()}
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