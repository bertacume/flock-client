import React, { Component } from 'react';
import { cx, css } from 'emotion';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/styleConstants';

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
    name = this.state.input.length ? this.state.input : null;
    this.props.setName(name);
  }

  render() {
    const inputClasses = cx(
      standarInput,
      {[errorInput]: this.props.nameRequired},
    );
    return (
      <Container>
        <Title>Welcome</Title>
        <SubTitle>Add trip's name:</SubTitle>
        <input className={inputClasses} type="text" placeholder="" value={this.state.input} onChange={this.handleInput} />
      </Container>
    );
  }
}

const standarInput = css`
  width: 70%;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  border-width: 0 0 2px 0;
  border-color: white;
  color: white;
  background-color: transparent;
`
const errorInput = css`
  border-color: #ff7151;
`
const Container = styled('div')`
  width: 100%;
  height: 60%;
  padding: 10%;
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
  font-size: 1.7rem;
  font-weight: 300;
  letter-spacing: .5rem;
  text-transform: uppercase;
  color: #ffffff;
`
const SubTitle = styled('p')`
  font-family: ${fontFamily};
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: .2rem;
  color: #ffffff;
`