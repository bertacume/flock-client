import React, { Component } from 'react';
import styled from 'react-emotion'

const AuthBoxContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .5rem;
  height: 50vh;
`;

const AuthBoxHeader = styled('div')`
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AuthBoxLogin = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 20vh;
`;
const AuthBoxSignUp = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 10vh;
`;
const AuthButton = styled('button')`
  max-height: 7.5vh;
  border-radius: 25px;
  background-color: rgb(255, 255, 255,.6);
  aligin-content: center;
  aligin-text: center;
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
              Name
            </h2>
            <input onChange={this.props.handleInputChild('inputName')} style={{border: '1px solid #000'}}/>
            <h2>
              Last name
            </h2>
            <input onChange={this.props.handleInputChild('inputLastname')} style={{border: '1px solid #000'}}/>
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
          <h2>Send</h2>
        </AuthButton>
      </AuthBoxContainer>
    );
  }
}

export default AuthBox;