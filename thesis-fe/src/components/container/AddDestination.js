import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';
import { WizardMode } from './WizardMode';
import { List } from './List';


export class AddDestination extends Component {
  state = {
    input: '',
    dictator: true,
    suggestions: [],
  }

  componentDidMount() {
    if (!this.props.destination.chosenOne) this.setState({ dictator: false});
    this.props.destination.chosenOne &&
    this.setState({ input: this.props.destination.chosenOne });
  }

  handleInput = async (event) => {
    let chosenOne;
    await this.setState({ input: event.target.value });
    if (this.state.dictator) {
      this.state.input.length ? chosenOne = this.state.input : chosenOne = null;
      this.props.setDestination({ suggestions: null, chosenOne });
    }
  }

  handleAddClick = async () => {
    const parentSuggestions = this.props.destination.suggestions;
    const destination = this.state.input;
    let suggestions;
    if (parentSuggestions){
      if (parentSuggestions.includes(destination)) return;
      suggestions = parentSuggestions.slice();
    } else suggestions = [];
    suggestions.push(destination);
    await this.setState({ input: '' });
    this.props.setDestination({ suggestions, chosenOne: null});
  }

  setMode = async (flag) => {
    await this.setState({ dictator: flag });
  }

  setSuggestions = (suggestions) => {
    this.props.setDestination({ suggestions, chosenOne: null});
  }


  renderDemocracy = () => {
    return (
      <Container>
        <Input type="text" placeholder="" value={this.state.input} onChange={this.handleInput}></Input>
        <Button onClick={this.handleAddClick}>Add</Button>
        {this.props.destination.suggestions &&
        <List items={this.props.destination.suggestions} setItems={(items) => this.setSuggestions(items)} />}
      </Container>
    );
  }

  render() {
    return (
      <Container>
        <WizardMode mode={this.state.dictator} setMode={(flag) => this.setMode(flag)} />
        <Title>Add Destination:</Title>
        {this.state.dictator ?
          <Input type="text" placeholder="" value={this.state.input} onChange={this.handleInput}></Input> : this.renderDemocracy()}
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
const Button = styled('button')`
width: 20vw;
height: 5vh;
border-width: 2px;
border-color: #afafaf;
border-radius: 10px;
background-color: rgb(255, 255, 255);
font-family: ${fontFamily};
`
const Input = styled('input')`
  width: 70vw;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  border-width: 0 0 2px 0;
`