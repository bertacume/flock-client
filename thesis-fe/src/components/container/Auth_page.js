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
    this.props.history.push('/mytrips/55');
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
    console.log(this);
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