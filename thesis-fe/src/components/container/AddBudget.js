import React, { Component } from 'react';
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
  }
  handleInput = (value) => {
    this.setState({ value });
  }
  render() {
    const { min, max, value } = this.state;
    return (
      <Container>
        <ButtonContainer>
          <Button>Dictator</Button>
          <Button>Democracy</Button>
        </ButtonContainer>
        <Title>Budget:</Title>
        <SubTitle>{value}</SubTitle>
        <SliderContainer>
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
            <p>{min}</p>
            <p>{max}</p>
          </SliderLblsContainer>
        </SliderContainer>
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
const ButtonContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction row;
  justify-content: space-evenly;
  align-items: center;
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