import React, { Component } from 'react';
import { cx, css } from 'emotion';
import styled from 'react-emotion'
import { fontFamily } from '../../helpers/constants';


export class AddMembers extends Component {
  state = {
    error: '',
    input: '',
    members: [],
  }

  handleInput = (event) => {
    this.setState({ input: event.target.value, error: '' });
  }

  handleAddClick = async () => {
    const member = this.state.input;
    //TODO: check if its a valid input aka mail
    if (this.state.members.includes(member)) return this.setState({ error: 'Already added' });
    if (!this.validateEmail(member)) return this.setState({ error: 'Not an email' });
    const members = this.state.members.slice();
    members.push(member);
    await this.setState({ input: '', members });
  }

  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  renderError = () => {
    return <Error>{this.state.error}</Error>;
  }

  deleteMember = (friend) => {
    const members = this.state.members.filter(el => el !== friend);
    this.setState({ members });
  }

  renderMembers = () => {
    return this.state.members.map(friend => {
      return (<ListItem key={friend}>
        <button onClick={() => this.deleteMember(friend)}>X</button>
        <MemberName>{friend}</MemberName>
      </ListItem>);
    });
  }

  render() {
    let inputClasses = cx(
      standarInput,
      { [errorInput]: this.state.error.length },
    );
    return (
      <Container>
        <Title>Invite your friends:</Title>
        <ErrorDiv>
          {!!this.state.error.length && this.renderError()}
        </ErrorDiv>
        <input className={inputClasses} type="text" placeholder="" value={this.state.input} onChange={this.handleInput}></input>
        <Button onClick={this.handleAddClick}>Add</Button>
        <MemberList>
          {this.renderMembers()}
        </MemberList>
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
const Button = styled('button')`
width: 20vw;
height: 5vh;
border-width: 2px;
border-color: #afafaf;
border-radius: 10px;
background-color: rgb(255, 255, 255);
font-family: ${fontFamily};
`
const standarInput = css`
  width: 70vw;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  border-width: 0 0 2px 0;
`
const errorInput = css`
  border-color: #ff7151;
`
const ErrorDiv = styled('div')`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction column;
  justify-content: center;
  align-items: center;
`
const MemberList = styled('div')`
  width: 90%;
  display: flex;
  flex-direction column;
  justify-content: center;
  align-items: center;
`
const ListItem = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction row;
  justify-content: flex-start;
  align-items: center;
`
const MemberName = styled('p')`
  margin: 0;
  font-size: 1rem;
`
const Error = styled('p')`
  color: red;
  font-size: 1rem;
`