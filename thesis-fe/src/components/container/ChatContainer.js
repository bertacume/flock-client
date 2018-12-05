import React, { Component } from 'react';
import styled from 'react-emotion';
import { Navbar } from '../presentational/Navbar';
import locationImg from '../../assets/location.png';
import { Mutation } from 'react-apollo';
import moment from 'moment'


class ChatContainer extends Component {
  state = {
    input: '',
  }

  handleInput = (event) => {
    this.setState({ input: event.target.value });
  }

  handleAddClick = (mutation) => {
    this.addMessage(mutation, this.state.input);
    this.setState({ input: '' });
  }

  addMessage = (mutation, message) => {
    const variables = { tripID: this.props.tripID, message };
    mutation({ variables });
  }

  renderMessages = () => {
    return this.props.messages.map(mssg => (
      <Mssg key={mssg.createdAt}>
        <ContainerChatMessage>
          <Title>{mssg.message}</Title>
        </ContainerChatMessage>
        <Title>{moment(mssg.createdAt).format('HH:mm')}</Title>
        <Title>{mssg.creator.firstName}</Title>
      </Mssg>
    ))
  };

  render() {
    return (
      <Container>
        <Navbar
          pathLeft={`/tripdetails/${this.props.tripID}`}
          title={'destination'}
          iconRight={locationImg}
          history={this.props.history}
        />
        <ContainerChat>
          {this.renderMessages()}
        </ContainerChat>
        <SubContainer>
          <Input type="text" placeholder={'Type a message'} value={this.state.input} onChange={this.handleInput} />
          <Mutation
            mutation={this.props.mutation[this.props.type]}
          >
            {(mutation, { data }) => (
              <ButtonAdd onClick={() => this.handleAddClick(mutation)}>ADD</ButtonAdd>
            )}
          </Mutation>
        </SubContainer>
      </Container>
    )
  }
}

const Container = styled('div')`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const ContainerChat = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: white;
`
const Mssg = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: blue;
`
const SubContainer = styled('div')`
  width: 100%;
  height: 18%;
  margin: 5px 0;
  padding: 10px 0;
  display: flex;
  flex-direction column;
  justify-content: space-evenly;
  align-items: center;
  background: #e9e9e9;
`
const ContainerChatMessage = styled('div')`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 20px;
  margin-bottom: 1rem;
  background: #ffd4b8;
`
const Input = styled('textarea')`
  height: 100%;
  width: 100%;
  font-size : 2rem;
  word-break: break-word;
  border-sryle: none;
  border-color: Transparent;
  outline: none;
  overflow: auto;
`
const ButtonAdd = styled('button')`
  width: 20vw;
  height: 5vh;
  border-width: 0;
  border-color: #afafaf;
  border-radius: 10px;
  background-color: transparent;
`
const Title = styled('p')`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
`
export default ChatContainer;


/*
User will get in and: login with his username and password, sign up and create new account, login with facebook (and maybe sign up on this case),
the fe will send this data to the be and the backend should return in case of success the userid to the
front end -which will be kept on the localStorage???- and will be further used. In case of failure, define what to do.//#endregion
In the success case, the USER ID should persist.
*/