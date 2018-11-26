import React, { Component } from 'react';
import styled from 'react-emotion'
import NavProfile from '../presentational/NavProfile';

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
        <h1 onClick={() => window.location.replace('/mytrips')}>Logo</h1>
        </NavLogo>
        <h1>
          {this.props.textContent}
        </h1>
        <NavProfile avatarURL ={this.props.avatarURL}/>
      </NavigationContainer>
    );
  }
}

export default Navigation;