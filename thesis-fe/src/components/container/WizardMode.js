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
const pressed = css`
  background-color: grey;
`