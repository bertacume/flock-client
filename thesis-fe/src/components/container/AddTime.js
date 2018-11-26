import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';
import { WizardMode } from './WizardMode';
import { List } from './List';


export class AddTime extends Component {
  state = {
    start: '',
    end: '',
    dictator: false,
  }

  componentDidMount() {
    const chosenTime = this.props.time.chosenOne;
    if (chosenTime) return this.setState({ start: chosenTime[0], end: chosenTime[1], dictator: true });

  }

  handleStartDate = async (event) => {
    await this.setState({ start: event.target.value });
    this.setDates();
  }

  handleEndDate = async (event) => {
    await this.setState({ end: event.target.value });
    this.setDates();
  }

  handleAddClick = async () => {
    const parentSuggestions = this.props.time.suggestions;
    const datesArr = this.datesInputToArray();
    if (!datesArr) return; //TODO: throw error
    let suggestions;

    //check if we already have some suggestions
    if (parentSuggestions) {
      if (parentSuggestions.includes(datesArr)) return;
      suggestions = parentSuggestions.slice();
    } else suggestions = [];

    suggestions.push(datesArr);
    await this.props.setDates({ suggestions, chosenOne: null });

    this.setState({ start: '', end: '' });
  }


  setDates = () => {
    if (!this.state.dictator) return;
    const datesArr = this.datesInputToArray();
    this.props.setDates({ suggestions: [], chosenOne: datesArr });
  }

  datesInputToArray = () => {
    const start = this.state.start;
    const end = this.state.end;
    if (!start.length || !end.length) return null;
    return [start, end];
  }

  setMode = (flag) => {
    this.setState({ dictator: flag });
  }

  renderDatesSuggestions = () => {
    return this.props.time.suggestions.map(el => `From: ${el[0]} To: ${el[1]}`);
  }

  deleteItem = (item) => {
    const suggestions = this.props.time.suggestions.filter(el => `From: ${el[0]} To: ${el[1]}` !== item);
    this.props.setDates({ suggestions, chosenOne: null });
  }

  renderDemocracy = () => {
    return (<Container>
      <Title>Add multiple dates:</Title>
      <Input type='date' value={this.state.start} onChange={this.handleStartDate} />
      <Input type='date' value={this.state.end} onChange={this.handleEndDate} />
      <Button onClick={this.handleAddClick}>Add</Button>
      {this.props.time.suggestions &&
        <List items={this.renderDatesSuggestions()} deleteItem={(item) => this.deleteItem(item)} />}
    </Container>
    );
  }

  renderDictator = () => {
    return (<Container>
      <Title>Add Dates:</Title>
      <Input type='date' value={this.state.start} onChange={this.handleStartDate} />
      <Input type='date' value={this.state.end} onChange={this.handleEndDate} />
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
const Input = styled('input')`
  text-align: center;
  width: 70vw;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  border-width: 0 0 2px 0;
  border-color: #f3f3f3;
  background-color: transparent;
`
const Button = styled('button')`
  width: 20vw;
  height: 5vh;
  border-width: 2px;
  border-color: #afafaf;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  font-family: ${fontFamily};
`