import React, { Component } from 'react';
import { css } from 'emotion';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';


export class WizardMode extends Component {
  state = {
    dictator: true,
  }

  handleClick = async (type) => {
    const flag = this.state.dictator;
    if (type === 'dictator' && flag) return;
    if (type === 'democracy' && !flag) return;
    await this.setState({dictator: !flag});
    this.props.setMode(this.state.dictator);
  }

  render() {
    return (
      <Container>
        <Button className={this.state.dictator ? pressed : null} onClick={() => this.handleClick('dictator')}>Dictator</Button>
        <Button className={!this.state.dictator ? pressed : null} onClick={() => this.handleClick('democracy')}>Democracy</Button>
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