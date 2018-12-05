import React, { Component } from 'react';
import styled from 'react-emotion'
import { BasicContainer, SubContainer, Button, pressed } from '../styledComponents/styledComponents';
import { fontFamily } from '../../helpers/styleConstants';
import logo from '../../assets/logo.png';

class AuthBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shouldShow: [true,false]
    }
  }

  displayLogin = () => {
    this.setState({shouldShow: [true,false]})
    this.props.handleChildType('login')
  }

  displaySignUp = () => {
    this.props.handleChildType('signup')
    this.setState({shouldShow: [false,true]})
  }

  render() {
    return (
      <Container>
        <Logo src={logo} />
          <ContainerMode>
            <Button className={this.props.type === 'login' ? pressed : null} onClick={this.displayLogin}>
              Login
            </Button>
            <Button className={this.props.type === 'register' ? pressed : null} onClick={this.displaySignUp}>
              Sign Up
            </Button>
          </ContainerMode>
          <SubContainer>
            {this.state.shouldShow[0] && <BasicContainer>
              <Input placeholder="Email" onChange={this.props.handleInputChild('inputEmail')} />
              <InputPassw placeholder="Password" onChange={this.props.handleInputChild('inputPassword')} type="password" />
            </BasicContainer>}
          {this.state.shouldShow[1] && <BasicContainer>
            <Input placeholder="Name" onChange={this.props.handleInputChild('inputName')} />
            <Input placeholder="Last Name" onChange={this.props.handleInputChild('inputLastname')} />
            <Input placeholder="Email" onChange={this.props.handleInputChild('inputEmail')} />
            <InputPassw placeholder="Password" onChange={this.props.handleInputChild('inputPassword')} type="password" />
            </BasicContainer>}
        <AuthButton onClick={this.props.handleSendChild}>
          Send
        </AuthButton>
        </SubContainer>
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction column;
  justify-content: flex-start;
  align-items: center;
  button:active {
    border-width: 0;
  }
  input:focus{
    outline: none;
  }
  Input::placeholder {
    color: #ffffff;
    letter-spacing: 1px;
    font-size: 1.3rem;
    font-family: ${fontFamily};
  }
`
const ContainerMode = styled('div')`
  width: 100%;
  display: flex;
  flex-direction row;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
`
const Input = styled('input')`
  width: 80%;
  height: 5vh;
  font-family: ${fontFamily};
  padding: 0 10px;
  margin: 10px 0;
  color: #b75537;
  border-width: 0 0 2px 0;
  border-color: white;
  background-color: transparent;
  letter-spacing: 1px;
  font-size: 1.3rem;
`
const InputPassw = styled('input')`
  width: 80%;
  height: 5vh;
  padding: 0 10px;
  margin: 10px 0;
  color: #b75537;
  border-width: 0 0 2px 0;
  border-color: white;
  background-color: transparent;
  letter-spacing: 1.2px;
  font-size: 1.3rem;
`
const AuthButton = styled('button')`
  max-height: 7.5vh;
  width: 30%;
  height: 7vh;
  margin: 5px;
  background-color: rgb(255, 255, 255,.6);
  color: #e38163;
  aligin-content: center;
  text-align:center;
  border-width: 0;
  border-radius: 2rem;
  font-weight: 500;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-family: ${fontFamily};
`
const Logo = styled('img')`
  height: 10%;
  margin: 0 0 30px 0;
`


export default AuthBox;