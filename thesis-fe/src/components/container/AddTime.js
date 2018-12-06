import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily, addTrip, basicColors } from '../../helpers/styleConstants';
import { WizardMode } from './WizardMode';
import { List } from './List';
import { DateRange } from 'react-date-range';
import moment from 'moment'

export class AddTime extends Component {
  setMode = (isDictated) => {
    this.props.setDates({ suggestions: [], isDictated });
  }

  deleteItem = (item) => {
    const suggestions = this.props.timeFrame.suggestions.filter(obj => `${obj.startDate} -- ${obj.endDate}` !== item);
    this.props.setDates({ ...this.props.timeFrame, suggestions });
  }

  checkExistingDates = (arr, range) => {
    const filtered = arr.filter(obj => range.startDate === obj.startDate && range.endDate === obj.endDate);
    return !filtered.length;
  }

  onCalendarChange = (date) => {
    const { timeFrame } = this.props;
    const startDate = date.startDate.format("YYYY-MM-DD");
    const endDate = date.endDate.format("YYYY-MM-DD");
    if (!startDate || !endDate) return;
    const range = { startDate, endDate };
    if (timeFrame.isDictated) return this.props.setDates({ ...this.props.timeFrame, suggestions: [range] });
    if (!this.checkExistingDates(timeFrame.suggestions, range)) return; //TODO: throw alert
    const suggestions = timeFrame.suggestions.slice();
    suggestions.push(range);
    this.props.setDates({ ...this.props.timeFrame, suggestions});
  }

  renderDemocracy = () => {
    const { timeFrame } = this.props;
    return (<SubContainer>
      <Title>Add multiple dates:</Title>
      <DateRange
       startDate={this.getDateInit('startDate')}
       endDate={this.getDateInit('endDate')}
        onChange={this.onCalendarChange}
        calendars={1}
        twoStepChange={true}
        theme={CalendarTheme}
      />
      {!!timeFrame.suggestions &&
        <List
          items={timeFrame.suggestions.map(obj => `${obj.startDate} -- ${obj.endDate}`)}
          handleClick={this.deleteItem}
          buttonResponse = 'delete'
          styles={{
            itemTitle: [`color: ${basicColors.darkerColor}`, 'margin: 0', 'font-size: 1.4rem'],
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

  getDateInit = (key) => {
    const { timeFrame } = this.props;
    if (timeFrame.suggestions.length && timeFrame.suggestions[0]) {
      return moment(timeFrame.suggestions[0][key]);
    }
    return moment();
  }

  renderDictator = () => {
    return (<SubContainer>
      <Title>Dates:</Title>
      <DateRange
        startDate={this.getDateInit('startDate')}
        endDate={this.getDateInit('endDate')}
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
        <WizardMode mode={this.props.timeFrame.isDictated} setMode={this.setMode} />
        {this.props.timeFrame.isDictated ? this.renderDictator() : this.renderDemocracy()}
      </Container>
    );
  }
}

//STYLES

const CalendarTheme = {
  DayInRange: {
    background: 'rgba(255, 255, 255, .6)',
    color: `${basicColors.darkerColor}`
  },
  DaySelected: {
    background: '#ffffff',
    color: `${basicColors.darkerColor}`
  },
  Calendar: {
    width: 240,
    padding: 0,
    background: 'transparent',
    borderRadius: '3rem',
    display: 'inline-block',
    boxSizing: 'border-box',
    letterSpacing: 0,
    color: `${basicColors.darkerColor}`
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
    borderRightColor: `${basicColors.darkerColor}`,
    marginLeft: 4
  },
  MonthArrowNext: {
    borderLeftWidth: '6px',
    borderLeftColor: `${basicColors.darkerColor}`,
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
  color: ${basicColors.darkerColor};
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