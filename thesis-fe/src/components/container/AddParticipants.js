import React, { Component } from 'react';
import { cx, css } from 'emotion';
import styled from 'react-emotion'
import { fontFamily, addTrip, basicColors } from '../../helpers/styleConstants';
import { List } from './List';


export class AddParticipants extends Component {
  state = {
    error: '',
    input: '',
  }

  handleInput = (event) => {
    this.setState({ input: event.target.value, error: '' });
  }

  handleAddClick = () => {
    const participant = this.state.input;
    if (!this.validateEmail(participant)) return this.setState({ error: 'Not an email' });

    const parentParticipants= this.props.participants;
    let participants;

    //check if we already have some suggestions
    if (parentParticipants) {
      if (parentParticipants.includes(participant)) return this.setState({ error: 'Already added' });
      participants = parentParticipants.slice();
    } else participants = [];

    participants.push(participant);
    this.setState({ input: '' });
    this.props.setParticipants(participants);
  }

  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  renderError = () => {
    return <Error>{this.state.error}</Error>;
  }

  deleteItem = (item) => {
    const participants = this.props.participants.filter(el => el !== item);
    this.props.setParticipants(participants);
  }

  render() {
    const inputClasses = cx(
      standarInput,
      { [errorInput]: this.state.error.length },
    );
    return (
      <Container>
        <Title>Invite your friends:</Title>
        <ErrorDiv>
          {!!this.state.error.length && this.renderError()}
        </ErrorDiv>
        <input className={inputClasses} type="text" placeholder="" value={this.state.input} onChange={this.handleInput} />
        <Button onClick={this.handleAddClick}><ImgBtn src={require('../../assets/plus.png')} /></Button>
        {this.props.participants &&
          <List items={this.props.participants}
            deleteItem={(item) => this.deleteItem(item)}
            handleClick={this.deleteItem}
            buttonResponse='delete'
            styles={{
              itemTitle: [`color: ${basicColors.darkerColor}`, 'margin: 0', 'font-size: 1.5rem'],
              listContainer: ['max-height: 21rem'],
              listItem: ['background-color: rgba(255, 255, 255, .3)',
                'padding: 0 35px',
                'height: 4rem',
                'margin: .2rem 0'],
            }}
          />}
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 90%;
  padding: 20px 0 30px 0;
  display: flex;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${addTrip.containerBackground};
  border-radius: 3rem;

  Input:focus{
    outline: none;
  }
`
const Title = styled('p')`
color: ${basicColors.darkerColor};
font-family: ${fontFamily};
font-size: 1.5rem;
`
const Button = styled('button')`
width: 20vw;
height: 5vh;
margin: 10px 0 20px 0;
border-width: 0;
background-color: transparent;
font-family: ${fontFamily};
`
const standarInput = css`
  width: 70%;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  border-width: 0 0 2px 0;
  color: ${basicColors.darkerColor};
  border-color: white;
  background-color: transparent;
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
const Error = styled('p')`
  color: red;
  font-size: 1rem;
`
const ImgBtn = styled('img')`
  height: 100%;
`