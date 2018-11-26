import React, { Component } from 'react';
import styled from 'react-emotion';


const NavProfileImage = styled('div')`
border: 1px solid #000;
background-image: url('https://graph.facebook.com/1897429313675048/picture?type=small');
background-size: cover;
border-radius: 200px;
width: 15%;
height: 80%;
margin-right: 2rem;
`;

class Navigation extends Component {
  render() {
    return (
      <NavProfileImage onClick={() => window.location.replace('/profile')} />
    );
  }
}

export default Navigation;