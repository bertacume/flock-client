import React, { Component } from 'react';
import styled from 'react-emotion';
import { Mutation } from "react-apollo";
import ChatContainer from "../container/ChatContainer"

class ChatPage extends Component {

  render() {
    const topicList = ['general', 'attendance', 'destination', 'budget', 'calendar']
    const messageObjArr = [];
    let k = 0;
    for (let i = 0; i < 25; i++) {
      messageObjArr[i] = {
        message : 'hahjashjs jakjskjajsa jkjsjkaskjaj jajsajkskjakj jasjajksajk jajsjaksjka',
        email : 'a@' + i + '.com',
        topic : topicList[k],
        firstName : '12345' + i,
        lastName: 'asasasasa'
      }
      k++;
      if (k === 5) {
        k = 0
      }
    }

    const messageFiltered = messageObjArr.filter(obj => obj.topic === this.props.match.params.topic)
    return (
      <ChatContainer info={messageFiltered} history={this.props.history} match={this.props.match} />
    )
  }
}

export default ChatPage;


/*
User will get in and: login with his username and password, sign up and create new account, login with facebook (and maybe sign up on this case),
the fe will send this data to the be and the backend should return in case of success the userid to the
front end -which will be kept on the localStorage???- and will be further used. In case of failure, define what to do.//#endregion
In the success case, the USER ID should persist.
*/