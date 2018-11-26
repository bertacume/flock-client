import React, { Component } from 'react';
import AuthBox from '../presentational/AuthBox';
import FacebookLogin from 'react-facebook-login';
import { BASE_FACEBOOK_ID } from '../../helpers/constants';
import styled from 'react-emotion'

const InnerContainer = styled('div')`
transform: translateY(-10vh);
color: blue;
display: flex;
flex-direction: column;
align-items: center;
`;
const OuterContainer = styled('div')`
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
`;

class Auth_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputUsername : '',
      inputEmail : '',
      inputPassword : ''
    }
  }

  handleInputParent = (type) => {
    return (e) => {
      this.setState({[type] : e.target.value});
    }
  }

  handleSendParent = () => {
    if (!this.state.inputEmail) console.log('do graphql query for login and send: ', this.state.inputUsername, this.state.inputPassword)
    else console.log('do graphql query for signup and send: ',this.state.inputEmail)
    const first = localStorage.getItem('history1');
    const second = localStorage.getItem('history2');
    if (first && second) {
      console.log(first);
    }
    this.props.history.push('/mytrips');
  }

  handleFBAuthentication = (res) => {
    console.log(res);
  }

  MyFacebookButton = ({ onClick }) => (
    <button onClick={onClick}>
      Login with facebook
    </button>
  );

  render() {
    return (
      <OuterContainer>
        <InnerContainer >
          <AuthBox handleInputChild={this.handleInputParent.bind(this)} handleSendChild={this.handleSendParent.bind(this)}/>
          <FacebookLogin appId={BASE_FACEBOOK_ID} autoLoad={false} fields="name,email,picture" callback={this.handleFBAuthentication}/>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

export default Auth_page;


/*
User will get in and: login with his username and password, sign up and create new account, login with facebook (and maybe sign up on this case),
the fe will send this data to the be and the backend should return in case of success the userid to the
front end -which will be kept on the localStorage???- and will be further used. In case of failure, define what to do.//#endregion
In the success case, the USER ID should persist.
*/