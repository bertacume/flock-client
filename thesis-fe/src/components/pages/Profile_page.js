import React from 'react';
import Navigation from '../container/Navigation';
import styled from 'react-emotion';



const Container = styled('div')`
  border-radius: 200px;
  width: 100vw;
  height: 100vh;
  margin-right: 2rem;
`;


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
`;

const Profile_page = () => {
  const logout = () => {
    localStorage.setItem('token','');
    window.location.replace('/auth');
  }

  const H1 = styled('h1')`
  font-size: 2.5rem;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

  return (
    <Container>
      <Navigation />
      <ContainerOptions>
        <H1 onClick={logout}>Logout</H1>
        <H1>Change avatar</H1>
        <H1>Invite friends</H1>
        <H1>Send us a message</H1>
      </ContainerOptions>
    </Container>
  );
}


export default Profile_page;

