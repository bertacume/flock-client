import React, { Component } from 'react';
import { cx, css } from 'emotion';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';


export class AddName extends Component {
  state = {
    input: '',
  }

  componentDidMount() {
    if (this.props.name) this.setState({ input: this.props.name });
  }

  handleInput = async (event) => {
    let name;
    await this.setState({ input: event.target.value });
    this.state.input.length ? name = this.state.input : name = null;
    this.props.setName(name);
  }

  render() {
    let inputClasses = cx(
      standarInput,
      {[errorInput]: this.props.nameRequired},
    );
    return (
      <Container>
        <Title>Trip's name:</Title>
        <input className={inputClasses} type="text" placeholder="" value={this.state.input} onChange={this.handleInput} />
      </Container>
    );
  }
}

const standarInput = css`
  width: 80%;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  border-width: 0 0 2px 0;
  border-color: white;
  color: white;
  background-color: transparent;
`
const errorInput = css`
  border-color: #ab573f;
`
const Container = styled('div')`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction column;
  justify-content: center;
  align-items: center;
  color: white;
  Input:focus{
    outline: none;
  }
`
const Title = styled('p')`
  font-family: ${fontFamily};
  font-size: 1.5rem;
`