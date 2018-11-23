import React, { Component } from 'react';
import styled from 'react-emotion'
import NavProfile from './NavProfile';

const NavigationContainer = styled('div')`
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: yellow;
`;

const NavLogo = styled('div')`
  margin-left: 2rem;
`;

class Navigation extends Component {

  render() {
    return (
      <NavigationContainer>
        <NavLogo>
        <h1>Logo</h1>
        </NavLogo>
        <h1>
          {this.props.textContent}
        </h1>
        <NavProfile />
      </NavigationContainer>
    );
  }
}

export default Navigation;