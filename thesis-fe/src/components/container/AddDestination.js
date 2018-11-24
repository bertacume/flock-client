import React, { Component } from 'react';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';


export class AddDestination extends Component {
  state = {
    input: '',
  }

  componentDidMount() {
    if (this.props.destination) this.setState({input: this.props.destination});
  }
  
  handleInput = async (event) => {
    let destination;
    await this.setState({input: event.target.value});
    this.state.input.length ? destination = this.state.input : destination = null;
    this.props.setDestination(destination);
  }

  render() {
    return (
      <Container>
        <ButtonContainer>
        <Button>Dictator</Button>
        <Button>Democracy</Button>
        </ButtonContainer>
        <Title>Add Destination:</Title>
        <Input type="text" placeholder="" value={this.state.input} onChange={this.handleInput}></Input>
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
`

const Title = styled('p')`
  color: #afafaf;
  font-family: ${fontFamily};
  font-size: 1.5rem;
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

const Input = styled('input')`
  width: 70vw;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  border-width: 0 0 2px 0;
`