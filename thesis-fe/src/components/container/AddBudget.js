import React, { Component } from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import { fontFamily, addTrip } from '../../helpers/styleConstants';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { WizardMode } from './WizardMode';
import { List } from './List';

const minDefault = 0;
const maxDefault = 1000;
const valueDefault = (maxDefault - minDefault) / 2;

export class AddBudget extends Component {
  state = {
    min: minDefault,
    max: maxDefault,
    value: valueDefault,
    isAdded: false,
    dictator: false,
  }

  componentDidMount() {
    if (this.props.budget.chosenOne) {
      this.setState({ value: this.props.budget.chosenOne, isAdded: true, dictator: true }, () => {
        if (this.state.max < this.state.value) {
          const newMax = Math.ceil(this.state.value / maxDefault) * maxDefault;
          this.setState({ max: newMax });
        }
      });
    }
  }

  handleInput = async (value) => {
    await this.setState({ value });
    this.dictator &&
      this.props.setBudget({ suggestions: [], chosenOne: this.state.value });
  }

  handleSetClick = async () => {
    await this.setState({ isAdded: !this.state.isAdded });
    this.state.isAdded ?
      this.props.setBudget({ suggestions: [], chosenOne: this.state.value }) :
      this.clearBudget();
  }

  handleAddClick = () => {
    const parentSuggestions = this.props.budget.suggestions;
    const value = this.state.value;
    let suggestions;

    //check if we already have some suggestions
    if (parentSuggestions) {
      if (parentSuggestions.includes(value)) return; //TODO: throw err
      suggestions = parentSuggestions.slice();
    } else suggestions = [];

    suggestions.push(value);
    this.props.setBudget({ suggestions, chosenOne: null });

    this.setState({ value: valueDefault });
  }

  clearBudget = () => {
    this.props.setBudget({ suggestions: [], chosenOne: null });
    this.setState({
      min: minDefault,
      max: maxDefault,
      value: (maxDefault - minDefault) / 2,
    })
  }

  handleIntervalBtnsClick = async (type) => {
    if (type === 'plus') this.setState({ max: this.state.max * 2 })
    else this.setState({ max: this.state.max / 2 })
  }

  setMode = async (flag) => {
    await this.setState({ dictator: flag });
  }

  renderSlider = () => {
    const { min, max, value } = this.state;
    return (
      <SliderContainer>
        <SubTitle>{value}</SubTitle>
        <SliderWrapper>
          <InputRange
            formatLabel={value => ``}
            maxValue={max}
            minValue={min}
            step={10}
            value={value}
            onChange={this.handleInput} />
        </SliderWrapper>
        <SliderLblsContainer>
          <BtnContainer>
            <Label className={minClass}>{min}</Label>
            {(value * 2 < max) &&
              <ButtonInterval onClick={() => this.handleIntervalBtnsClick('minus')}>
                <ImgBtn src={require('../../assets/minus.png')} />
              </ButtonInterval>
            }
          </BtnContainer>
          <BtnContainer>
            <Label>{max}</Label>
            <ButtonInterval onClick={() => this.handleIntervalBtnsClick('plus')}>
              <ImgBtn src={require('../../assets/plus.png')} />
            </ButtonInterval>
          </BtnContainer>
        </SliderLblsContainer>
      </SliderContainer>
    );
  }

  deleteItem = (item) => {
    const suggestions = this.props.budget.suggestions.filter(el => el !== item);
    this.props.setBudget({ suggestions, chosenOne: null });
  }

  renderSuggestions = () => {
    return this.props.budget.suggestions.sort((a, b) => a - b);
  }

  renderDemocracy = () => {
    const { suggestions } = this.props.budget;
    return (<SubContainer>
      <Title>Budget suggestions:</Title>
      {this.renderSlider()}
      <Button onClick={this.handleAddClick}>Add</Button>
      {suggestions && <List items={this.renderSuggestions()} deleteItem={(item) => this.deleteItem(item)} />}
    </SubContainer>
    );
  }

  renderDictator = () => {
    const { isAdded } = this.state;
    return (<Container>
      <Title>Budget:</Title>
      <Button onClick={this.handleSetClick}>{isAdded ? 'X' : 'Set'}</Button>
      {isAdded && this.renderSlider()}
    </Container>
    );
  }

  render() {
    return (
      <Container>
        <WizardMode mode={this.state.dictator} setMode={(flag) => this.setMode(flag)} />
        {!this.state.dictator ?
          this.renderDemocracy() :
          this.renderDictator()}
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
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${addTrip.containerBackground};
  border-radius: 3rem;
`
const SliderContainer = styled('div')`
  width: 100%;
  display: flex;
  height: 80%;
  flex-direction column;
  align-items: center;
`
const SliderWrapper = styled('div')`
  width: 75%;
  touch-action: none;
  display: inline-block;

  .input-range__slider {
    background: #ffffff;
    border: 1px solid #ffffff;
  }

  .input-range__track {
    background: #e5815f;
  }

  .input-range__track--active {
    background: #ffffff;
  }
`
const Label = styled('p')`
  color: white;
`
const SliderLblsContainer = styled('div')`
width: 80%;
margin: 0;
display: flex;
flex-direction row;
justify-content: space-between;
`
const Title = styled('p')`
color: #b75537;
font-family: ${fontFamily};
font-size: 1.5rem;
`
const SubTitle = styled('p')`
color: #ffffff;
font-family: ${fontFamily};
font-size: 3rem;
`
const Button = styled('button')`
width: 20vw;
height: 5vh;

`
const BtnContainer = styled('div')`
display: flex;
flex-direction column;
align-items: center;
`
const ButtonInterval = styled('button')`
font-family: ${fontFamily};
align-self: center;
border-width: 0;
font-family: ${fontFamily};
background-color: transparent;
width: 10vw;
`
const ImgBtn = styled('img')`
  width: 100%;
`
const minClass = css`
  padding: 0 6px;
`