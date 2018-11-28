import React, { Component } from 'react';
import { css } from 'emotion';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';


export class WizardMode extends Component {
  handleClick = (type) => {
    const flag = this.props.mode;
    if (type === 'dictator' && flag) return;
    if (type === 'democracy' && !flag) return;
    this.props.setMode(!flag);
  }

  render() {
    return (
      <Container>
        <Button className={!this.props.mode ? pressed : null} onClick={() => this.handleClick('democracy')}>Democracy</Button>
        <Button className={this.props.mode ? pressed : null} onClick={() => this.handleClick('dictator')}>Dictator</Button>
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 90%;
  display: flex;
  flex-direction row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 0 10px 0;
`
const Button = styled('button')`
  margin: 0 5px;
  width: 100%;
  height: 7vh;
  border-width: 0;
  border-radius: 2rem;
  color: #e38163;
  background-color: rgba( 255, 255, 255, .6);
  font-family: ${fontFamily};
`
const pressed = css`
  color: white; 
  background-color: #e38163;
`