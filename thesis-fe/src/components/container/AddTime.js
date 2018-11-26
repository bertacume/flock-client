import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';
import { WizardMode } from './WizardMode';
import { List } from './List';


export class AddTime extends Component {
  state = {
    start: '',
    end: '',
    dates: [],
    dictator: false,
  }

  componentDidMount() {
    const range = this.props.time.chosenOne;
    if (range) this.setState({ start: range[0], end: range[1], dates: range.slice() });
  }

  handleStartDate = (event) => {
    this.setState({ start: event.target.value });
    if (!this.state.end.length) return;
    // this.setDates();
  }

  handleEndDate = async (event) => {
    await this.setState({ end: event.target.value });
    if (!this.state.start.length) return;
    // this.setDates();
  }

  handleAddClick = async () => {
    const parentSuggestions = this.props.time.suggestions;
    const start = this.state.start;
    const end = this.state.end;
    if (!start.length || !end.length) return;
    const datesInput = `From: ${start} To: ${end}`;
    let suggestions;
    if (parentSuggestions){
      if (parentSuggestions.includes(datesInput)) return;
      suggestions = parentSuggestions.slice();
    } else suggestions = [];
    suggestions.push(datesInput);
    await this.setState({ start: '', end: '' });
    this.props.setDates({ suggestions, chosenOne: null});
  }

  setDates = async () => {
    await this.setState({ dates: [this.state.start, this.state.end] });
    this.props.setDates({ suggestions: null, chosenOne: this.state.dates.slice() });
  }

  setMode = async (flag) => {
    await this.setState({ dictator: flag });
  }

  setSuggestions = (suggestions) => {
    this.props.setDates({ suggestions, chosenOne: null});
  }

  renderDemocracy = () => {
    return (<Container>
      <Title>Add multiple dates:</Title>
      <Input type='date' value={this.state.start} onChange={this.handleStartDate} />
      <Input type='date' value={this.state.end} onChange={this.handleEndDate} />
      <Button onClick={this.handleAddClick}>Add</Button>
        {this.props.time.suggestions &&
        <List items={this.props.time.suggestions} setItems={(items) => this.setSuggestions(items)} />}
    </Container>
    );
  }

  renderDictator = () => {
    return (<Container>
      {/* <Title>Add Dates:</Title>
      <Input type='date' value={this.state.start} onChange={this.handleStartDate} />
      <Input type='date' value={this.state.end} onChange={this.handleEndDate} /> */}
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