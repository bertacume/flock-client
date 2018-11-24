import React, { Component } from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import { fontFamily } from '../../helpers/constants';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const minDefault = 0;
const maxDefault = 1000;

export class AddBudget extends Component {
  state = {
    min: minDefault,
    max: maxDefault,
    value: (maxDefault - minDefault) / 2,
    isAdded: false,
  }

  async componentDidMount() {
    if (this.props.budget) {
      await this.setState({ value: this.props.budget });
      this.setState({ isAdded: true });
      if (this.state.max < this.state.value) {
        const newMax = Math.ceil(this.state.value / maxDefault) * maxDefault;
        this.setState({ max: newMax });
      }
    }
  }

  handleInput = async (value) => {
    await this.setState({ value });
    this.props.setBudget(this.state.value);
  }

  handleAddClick = async () => {
    await this.setState({ isAdded: !this.state.isAdded });
    this.state.isAdded ?
      this.props.setBudget(this.state.value) :
      this.clearBudget();
  }

  clearBudget = () => {
    this.props.setBudget(null);
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
            <p className={minClass}>{min}</p>
            {(value * 2 < max) &&
              <ButtonInterval onClick={() => this.handleIntervalBtnsClick('minus')}>-</ButtonInterval>
            }
          </BtnContainer>
          <BtnContainer>
            <p>{max}</p>
            <ButtonInterval onClick={() => this.handleIntervalBtnsClick('plus')}>+</ButtonInterval>
          </BtnContainer>
        </SliderLblsContainer>
      </SliderContainer>
    );
  }

  render() {
    const { isAdded } = this.state;
    return (
      <Container>
        <Title>Budget:</Title>
        <Button onClick={this.handleAddClick}>{isAdded ? 'X' : 'Add'}</Button>
        {isAdded && this.renderSlider()}
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
  Input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #4CAF50;
    cursor: pointer;
    border-radius: 50%;
  }
`
const SliderContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction column;
  align-items: center;
`

const SliderWrapper = styled('div')`
  width: 75%;
  height: 100%;
  touch-action: none;
`

const SliderLblsContainer = styled('div')`
  width: 80%;
  margin: 0;
  display: flex;
  flex-direction row;
  justify-content: space-between;
  // align-items: center;
`

const Title = styled('p')`
  color: #afafaf;
  font-family: ${fontFamily};
  font-size: 1.5rem;
`

const SubTitle = styled('p')`
  color: #8db5f4;
  font-family: ${fontFamily};
  font-size: 3rem;
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
const BtnContainer = styled('div')`
  display: flex;
  flex-direction column;
  align-items: center;
`

const ButtonInterval = styled('button')`
  border-width: 2px;
  border-color: #afafaf;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  font-family: ${fontFamily};
  align-self: center;
`
const minClass = css`
  padding: 0 6px;
`