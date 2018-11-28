import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';
import { WizardMode } from './WizardMode';
import { List } from './List';


export class AddDestination extends Component {
  state = {
    input: '',
    dictator: false,
  }

  componentDidMount() {
    if (this.props.destination.chosenOne) this.setState({ dictator: true});
    this.props.destination.chosenOne &&
    this.setState({ input: this.props.destination.chosenOne });
  }

  handleInput = async (event) => {
    let chosenOne;
    await this.setState({ input: event.target.value });
    if (this.state.dictator) {
      this.state.input.length ? chosenOne = this.state.input : chosenOne = null;
      this.props.setDestination({ suggestions: [], chosenOne });
    }
  }

  handleAddClick = async () => {
    const parentSuggestions = this.props.destination.suggestions;
    const destinationInput = this.state.input;
    let suggestions;
    if (parentSuggestions){
      if (parentSuggestions.includes(destinationInput)) return;
      suggestions = parentSuggestions.slice();
    } else suggestions = [];
    suggestions.push(destinationInput);
    await this.setState({ input: '' });
    this.props.setDestination({ suggestions, chosenOne: null});
  }

  setMode = async (flag) => {
    await this.setState({ dictator: flag });
  }

  deleteItem = (item) => {
    const suggestions = this.props.destination.suggestions.filter(el => el !== item);
    this.props.setDestination({ suggestions, chosenOne: null });
  }

  renderDemocracy = () => {
    return (
      <SubContainer>
        <Title>Add Final Destination:</Title>
        <Input type="text" placeholder="" value={this.state.input} onChange={this.handleInput}></Input>
        <Button onClick={this.handleAddClick}><ImgBtn src={require('../../assets/plus.png')} /></Button>
        {this.props.destination.suggestions &&
        <List 
        items={this.props.destination.suggestions} 
        deleteItem={(item) => this.deleteItem(item)} 
        styles={{
          itemTitle : ['color: #b75537', 'margin: 0', 'font-size: 1.5rem'] ,
          listContainer : ['max-height: 21rem'],
          listItem : ['background-color: rgba(255, 255, 255, .3)', 
          'padding: 0 35px',
          'height: 4rem', 
          'margin: .2rem 0'],
        }}
        />}
      </SubContainer>
    );
  }

  render() {
    return (
      <Container>
        <WizardMode mode={this.state.dictator} setMode={(flag) => this.setMode(flag)} />
        {this.state.dictator ?
        <SubContainer>
        <Title>Add Final Destination:</Title>
          <Input type="text" placeholder="" value={this.state.input} onChange={this.handleInput}></Input> 
        </SubContainer> :
        this.renderDemocracy()}
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

`
const SubContainer = styled('div')`
  width: 90%;
  display: flex;
  padding: 20px 0 30px 0;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba( 255, 255, 255, .6);
  border-radius: 3rem;

  Input:focus{
    outline: none;
  }

`
const Title = styled('p')`
  color: #b75537;
  font-family: ${fontFamily};
  font-size: 1.5rem;
  font-weight: 500;
  margin: 2px;
`
const Button = styled('button')`
width: 20vw;
height: 5vh;
margin: 10px 0 20px 0;
border-width: 0;
border-color: #afafaf;
border-radius: 10px;
background-color: transparent;
font-family: ${fontFamily};
`
const Input = styled('input')`
  width: 80%;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  border-width: 0 0 2px 0;
  color: #b75537;
  border-color: white;
  background-color: transparent;
  font-size: 1.5rem;
`
const ImgBtn = styled('img')`
  height: 100%;
`