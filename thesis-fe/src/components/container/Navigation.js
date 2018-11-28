import React from 'react';
import styled from 'react-emotion'
import NavProfile from '../presentational/NavProfile';
import { Link } from "react-router-dom";
import logo from '../../assets/svg/rawr-dinosaur.svg';

const NavigationContainer = styled('div')`
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const NavLogo = styled('div')`
  margin-left: 2rem;
`;

const H1 = styled('h1')`
  font-size: 2.5rem;
  color: white;
`;

const Navigation = (props) => {
  return (
    <NavigationContainer>
      <NavLogo>
        <Link to="/mytrips">
          <img src={logo} alt="logo" height="60" width="60"/>
        </Link>
      </NavLogo>
      <H1>
        {props.textContent}
      </H1>
      <NavProfile avatarURL={props.avatarURL}/>
    </NavigationContainer>
  );
}


export default Navigation;