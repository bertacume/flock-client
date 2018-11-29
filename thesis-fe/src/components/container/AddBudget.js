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
  }
  
  componentDidMount() {
    const { budget } = this.props;
    console.log(budget);
    if (budget.suggestions.length) this.setState({ value: budget.suggestions[0], isAdded: true }, () => {
      console.log(budget, this.state);
      if (this.state.max < this.state.value) {
        const newMax = Math.ceil(this.state.value / maxDefault) * maxDefault;
        this.setState({ max: newMax });
      }
    });
  }
  
  setMode = isDictated => {
    this.props.setBudget({ suggestions: [], isDictated });
    this.clearBudget();
  }

  handleInput = value => {
    this.setState({ value, isAdded: true });
    this.props.setBudget({ ...this.props.budget, suggestions: [value] });
  }

  clearBudget = () => {
    this.setState({
      min: minDefault,
      max: maxDefault,
      value: (maxDefault - minDefault) / 2,
      isAdded: false,
    })
  }

  handleIntervalBtnsClick = async (type) => {
    if (type === 'plus') this.setState({ max: this.state.max * 2 })
    else this.setState({ max: this.state.max / 2 })
  }


  renderSlider = () => {
    const { min, max, value } = this.state;
    return (
      <SliderContainer>
        <SubTitleContainer>
        {this.state.isAdded ?
        <SubTitle>{value}</SubTitle>:
        <Title>Drag to set the price</Title>}
        </SubTitleContainer>
        <SliderWrapper>
          <InputRange
            formatLabel={() => ``}
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

  renderDemocracy = () => {
    return (<SubContainer>
      <Title>Budget suggestion:</Title>
      {this.renderSlider()}
    </SubContainer>
    );
  }

  renderDictator = () => {
    return (<Container>
      <Title>Budget:</Title>
      {this.renderSlider()}
    </Container>
    );
  }

  render() {
    return (
      <Container>
        <WizardMode mode={this.props.budget.isDictated} setMode={this.setMode} />
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
const SubTitleContainer = styled('div')`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction row;
  justify-content: center;
  align-items: center;
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