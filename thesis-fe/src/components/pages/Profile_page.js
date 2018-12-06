import React from 'react';
import styled from 'react-emotion';
import { Navbar } from '../presentational/Navbar';
import { basicColors } from '../../helpers/styleConstants';
import logo from '../../assets/logo_orange.png';

const Profile_page = (props) => {
  const logout = () => {
    localStorage.setItem('token','');
    window.location.replace('/auth');
  }

  return (
    <Container>
      <Navbar
        pathLeft={`/mytrips`}
        title={'Profile'}
        iconRight={null}
        history={props.history}
      />
      <ContainerOptions>
        <H1 onClick={logout}>Logout</H1>
        <ImgBtn src={logo} />
      </ContainerOptions>
    </Container>
  );
}

const Container = styled('div')`
  border-radius: 200px;
  width: 100vw;
  height: 100vh;
  margin-right: 2rem;
`
const ContainerOptions = styled('div')`
  border-radius: 200px;
  width: 100vw;
  height: 90vh;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 3rem;
  align-items: center;
`
const H1 = styled('p')`
font-size: 2.5rem;
color: ${basicColors.middleColor};
`
const ImgBtn = styled('img')`
  height: 10%;
`


export default Profile_page;

