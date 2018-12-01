import React, { Component } from 'react';
import styled from 'react-emotion';
import { Mutation } from "react-apollo";
import next from '../../assets/next.png';


const Container = styled('div')`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const ContainerChat = styled('div')`
  height: 60vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius : 20px;
`;

const ContainerMessage = styled('div')`
  height: 20vh;
  width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius : 20px;
`;

const ContainerMessageInput = styled('div')`
  height: 17.5vh;
  width: 70vw;
  background: blue;
`;

const ContainerMessageSend = styled('div')`
  height: 17.5vh;
  width: 15vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background : black;
`;

const ContainerChatMessage = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid black;
  border-radius: 20px;
  margin-bottom: 1rem;
`;

const Input = styled('textarea')`
  height: 100%;
  width: 100%;
  font-size : 2rem;
  word-break: break-word;
  border-sryle: none;
  border-color: Transparent;
  outline: none;
  overflow: auto;
`;

const BIG = styled('h1')`
  font-size : 3rem;
  color : white;
`;

const H1 = styled('h1')`
  font-size : 1.5rem;
  color : black;
  margin-left: .75rem;
`;

const H2 = styled('h1')`
  font-size : 1rem;
  color : black
  margin-left: .5rem;
`;

class ChatContainer extends Component {




  render() {


    console.log(this.props);
    const messagesToDisplay = this.props.info.map(obj => (
      <ContainerChatMessage key={obj.message + Math.random()}>
        <H1>
          {obj.firstName}
        </H1>
        <H2>
          {obj.message}
        </H2>
      </ContainerChatMessage>
    ))
    return (
      <Container>
         <BIG>
          Chat : {this.props.match.params.topic}
        </BIG>
        <ContainerChat>
          {messagesToDisplay}
        </ContainerChat>

        <ContainerMessage>
          <ContainerMessageInput>
            <Input placeholder="Send a message here" />
          </ContainerMessageInput>
          <ContainerMessageSend>
            <img src={next} alt="more info" height="50" width="50" onClick={this.props.redirectParent}/>
          </ContainerMessageSend>
        </ContainerMessage>
      </Container>
    )
  }
}

export default ChatContainer;


/*
User will get in and: login with his username and password, sign up and create new account, login with facebook (and maybe sign up on this case),
the fe will send this data to the be and the backend should return in case of success the userid to the
front end -which will be kept on the localStorage???- and will be further used. In case of failure, define what to do.//#endregion
In the success case, the USER ID should persist.
*/