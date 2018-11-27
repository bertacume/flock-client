import React, { Component } from 'react';
import styled from 'react-emotion'

const AuthBoxContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  border: 1px solid #000;
`;

const AuthBoxHeader = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AuthBoxLogin = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 20vh;
`;
const AuthBoxSignUp = styled('div')`
  display: flex;
  flex-direction: column;
  height: 20vh;
`;
const AuthButton = styled('button')`
  border-radius: 50px;
  background-color: white;
  padding: 1rem;
`

class AuthBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shouldShow: [true,false]
    }
  }

  displayLogin = () => {
    this.setState({shouldShow: [true,false]})
  }

  displaySignUp = () => {
    this.setState({shouldShow: [false,true]})
  }

  render() {
    return (
      <AuthBoxContainer>
          <AuthBoxHeader>
            <h1 onClick={this.displayLogin}>
              Login
            </h1>
            <h1 onClick={this.displaySignUp}>
              Sign Up
            </h1>
          </AuthBoxHeader>
          <div>
            {this.state.shouldShow[0] && <AuthBoxLogin>
              <h2>
                Username
              </h2>
              <input onChange={this.props.handleInputChild('inputUsername')} style={{border: '1px solid #000'}} />
              <h2>
                Password
              </h2>
              <input onChange={this.props.handleInputChild('inputPassword')} type="password" style={{border: '1px solid #000'}}/>
            </AuthBoxLogin>}
          </div>
        <div>
          {this.state.shouldShow[1] && <AuthBoxSignUp>
            <h2>
              Username
            </h2>
            <input onChange={this.props.handleInputChild('inputUsername')} style={{border: '1px solid #000'}}/>
            <h2>
              Email
            </h2>
            <input onChange={this.props.handleInputChild('inputEmail')} style={{border: '1px solid #000'}} />
            <h2>
              Password
            </h2>
            <input onChange={this.props.handleInputChild('inputPassword')} type="password" style={{border: '1px solid #000'}} />
            </AuthBoxSignUp>}
        </div>
        <AuthButton onClick={this.props.handleSendChild}>
          {this.state.shouldShow[0] ? <h2>Log in</h2> : <h2>Sign Up</h2>}
        </AuthButton>
      </AuthBoxContainer>
    );
  }
}

export default AuthBox;