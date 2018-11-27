import React from 'react';
import styled from 'react-emotion'
import NavProfile from '../presentational/NavProfile';
import { BrowserRouter as  Router, Link } from "react-router-dom";

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

const Navigation = (props) => {
  return (
    <NavigationContainer>
      <NavLogo>
        <Link to="/mytrips">
          <h1>Logo</h1>
        </Link>
      </NavLogo>
      <h1>
        {props.textContent}
      </h1>
      <NavProfile avatarURL ={props.avatarURL}/>
    </NavigationContainer>
  );
}


export default Navigation;