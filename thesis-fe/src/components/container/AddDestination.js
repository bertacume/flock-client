import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily, addTrip, basicColors } from '../../helpers/styleConstants';
import { Input } from '../styledComponents/styledComponents';
import { WizardMode } from './WizardMode';
import { List } from './List';


export class AddDestination extends Component {
  state = {
    input: '',
  }

  componentDidMount() {
    this.props.destination.isDictated &&
      this.setState({ input: this.props.destination.suggestions[0] });
  }

  setMode = (isDictated) => {
    this.props.setDestination({ ...this.props.destination, isDictated });
  }

  handleInput = event => {
    this.setState({ input: event.target.value }, () => {
      if (this.props.destination.isDictated) {
        this.state.input.length ?
          this.props.setDestination({
            ...this.props.destination,
            suggestions: [{name: this.state.input}]
          }) :
          this.props.setDestination({
            ...this.props.destination,
            suggestions: []
          });
      }
    });
  }

  handleAddClick = () => {
    if (!this.state.input.length) return;
    const oldSuggestions = this.props.destination.suggestions;
    const destinationInput = this.state.input;
    if (oldSuggestions.includes(destinationInput)) return; //TODO: alert already exists
    const suggestions = oldSuggestions.slice();
    suggestions.push({ name: destinationInput });
    this.setState({ input: '' }, () => {
      this.props.setDestination({ ...this.props.destination, suggestions });
    });
  }

  deleteItem = (item) => {
    const suggestionsArr = this.props.destination.suggestions.map(obj => obj.name);
    const suggestions = suggestionsArr.filter(el => el !== item).map(el => ({ name: el }));
    this.props.setDestination({ ...this.props.destination, suggestions });
  }

  renderDemocracy = () => {
    const { suggestions } = this.props.destination;
    return (
      <SubContainer>
        <Title>Add your destination suggestions:</Title>
        <Input type="text" placeholder="" value={this.state.input} onChange={this.handleInput}></Input>
        <Button onClick={this.handleAddClick}><ImgBtn src={require('../../assets/plus.png')} /></Button>
        {!!suggestions.length &&
          <List
            items={suggestions.map(obj => obj.name)}
            handleClick={this.deleteItem}
            buttonResponse='delete'
            styles={{
              itemTitle: [`color: ${basicColors.darkerColor}`, 'margin: 0', 'font-size: 1.5rem'],
              listContainer: ['max-height: 21rem'],
              listItem: ['background-color: rgba(255, 255, 255, .3)',
                'padding: 0 35px',
                'height: 4rem',
                'margin: .2rem 0'],
            }}
          />}
      </SubContainer>
    );
  }

  renderDictator = () => {
    return (<SubContainer>
      <Title>Add Final Destination:</Title>
      <Input type="text" placeholder="" value={this.state.input} onChange={this.handleInput}></Input>
    </SubContainer>);
  }

  render() {
    return (
      <Container>
        <WizardMode mode={this.props.destination.isDictated} setMode={this.setMode} />
        {this.props.destination.isDictated ?
          this.renderDictator() :
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
  background-color: ${addTrip.containerBackground};
  border-radius: 3rem;

  Input:focus{
    outline: none;
  }

`
const Title = styled('p')`
  color: ${basicColors.darkerColor};
  font-family: ${fontFamily};
  font-size: 1.5rem;
  font-weight: 400;
  margin: 2px;
`
const Button = styled('button')`
  width: 20vw;
  height: 5vh;
  margin: 10px 0 20px 0;
  border-width: 0;
  background-color: transparent;
  font-family: ${fontFamily};
`
const ImgBtn = styled('img')`
  height: 100%;
`