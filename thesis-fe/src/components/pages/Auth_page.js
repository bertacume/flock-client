import React, { Component } from 'react';
import AuthBox from '../presentational/AuthBox';
import FacebookLogin from 'react-facebook-login';
import { BASE_FACEBOOK_ID } from '../../helpers/constants';
import styled from 'react-emotion';
import { Mutation } from "react-apollo";
import REGISTER from '../apollo/mutations/register';
import LOGIN from '../apollo/mutations/login';

const InnerContainer = styled('div')`
  transform: translateY(-10vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(255, 255, 255,.6);
  border-radius: 10px;
`;

const OuterContainer = styled('div')`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

class Auth_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName : '',
      inputLastname : '',
      inputEmail : '',
      inputPassword : '',
      childType: 'login'
    }
  }

  handleInputParent = (type) => {
    return (e) => {
      this.setState({[type] : e.target.value});
    }
  }

  handleParentType = (type) => {
    this.setState({childType : type})
  }

  handleLoginError = (error) => {
    console.log('ERROR ON AUTHENTICATION: ', error)
    const list = document.getElementsByTagName("input");
    for (let i = 0; i < list.length; i++) {
      list[i].value = '';
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
    console.log(this.props);
    return (
      <OuterContainer>
        <InnerContainer >
        { (this.state.childType === 'signup') ?
          <Mutation mutation={REGISTER} variables ={{
            email: this.state.inputEmail,
            password: this.state.inputPassword,
            firstName: this.state.inputName,
            lastName: this.state.inputLastname,
            avatarURL: 'test'
            }}
            onCompleted={(res) => console.log(res)}
            >
            { register => <AuthBox handleInputChild={this.handleInputParent.bind(this)} handleChildType={this.handleParentType} handleSendChild={register}  /> }
          </Mutation>
          :
          <Mutation mutation={LOGIN} variables ={{
            email: this.state.inputEmail,
            password: this.state.inputPassword
          }}
          onCompleted={(res) => {
            localStorage.setItem('token',res.login);
            this.props.history.push('/mytrips');
          }}
          onError={(res) => this.handleLoginError(res)}
          >
            { login => <AuthBox handleInputChild={this.handleInputParent.bind(this)} handleChildType={this.handleParentType} handleSendChild={login}  /> }
          </Mutation>
        }
        </InnerContainer>
        <FacebookLogin appId={BASE_FACEBOOK_ID} autoLoad={false} fields="name,email,picture" callback={this.handleFBAuthentication}  />
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