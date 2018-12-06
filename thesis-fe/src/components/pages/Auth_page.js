import React, { Component } from 'react';
import AuthBox from '../presentational/AuthBox';
import FacebookLogin from 'react-facebook-login';
import { BASE_FACEBOOK_ID } from '../../helpers/constants';
import styled from 'react-emotion';
import { Mutation, ApolloConsumer } from "react-apollo";
import REGISTER from '../apollo/mutations/register';
import LOGIN from '../apollo/mutations/login';
import FACEBOOK from '../apollo/mutations/facebook';
import { backGradient } from '../../helpers/styleConstants';

class Auth_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken : '',
      userID: '',
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

  onLogin = (apolloClient, token) => {
    localStorage.setItem('token', token);
    window.location.replace('/mytrips');
  }


  render() {
    return (
      <ApolloConsumer>
        {(client) => (
          <OuterContainer>
            { (this.state.childType === 'signup') ?
              <Mutation mutation={REGISTER} variables ={{
                email: this.state.inputEmail,
                password: this.state.inputPassword,
                firstName: this.state.inputName,
                lastName: this.state.inputLastname,
                avatarURL: 'test'
                }}
                onCompleted={(res) => this.onLogin(client, res.register)}
                >
                { register => <AuthBox type={'register'} handleInputChild={this.handleInputParent.bind(this)} handleChildType={this.handleParentType} handleSendChild={register}  /> }
              </Mutation>
              :
              <Mutation mutation={LOGIN} variables ={{
                email: this.state.inputEmail,
                password: this.state.inputPassword
              }}
              onCompleted={(res) => this.onLogin(client, res.login)}
              onError={(res) => this.handleLoginError(res)}
              >
                { login => <AuthBox type={'login'} handleInputChild={this.handleInputParent.bind(this)} handleChildType={this.handleParentType} handleSendChild={login}  /> }
              </Mutation>
            }
            <Mutation mutation={FACEBOOK} variables ={{
              email: this.state.inputEmail,
              userID: this.state.userID,
              accessToken: this.state.accessToken,
              firstName: this.state.inputName,
              lastName: this.state.inputLastname,
              avatarURL: 'test'
              }}
              onCompleted={(res) => this.onLogin(client, res.facebook)}
              onError={(error) => console.log(error)}
            >
              { facebook => <FacebookLogin appId={BASE_FACEBOOK_ID}
                autoLoad={false} fields="name,email,picture,first_name,last_name"
                callback={(res) => {
                  this.setState({userID: res.userID, accessToken: res.accessToken, inputName: res.first_name, inputLastname: res.last_name,
                  inputEmail: res.email }, facebook)
                }}
              /> }
            </Mutation>
          </OuterContainer>
        )}
      </ApolloConsumer>
    );
  }
}

const OuterContainer = styled('div')`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${backGradient};
`

export default Auth_page;


/*
User will get in and: login with his username and password, sign up and create new account, login with facebook (and maybe sign up on this case),
the fe will send this data to the be and the backend should return in case of success the userid to the
front end -which will be kept on the localStorage???- and will be further used. In case of failure, define what to do.//#endregion
In the success case, the USER ID should persist.
*/