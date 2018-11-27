import React, { Component } from 'react';
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
  padding: 3rem;
  align-items: center;
`;

const Profile_page = () => {
  const logout = () => {
    localStorage.setItem('logged','');
    localStorage.setItem('id','');
    window.location.replace('/auth');
  }

  return (
    <Container>
      <Navigation />
      <ContainerOptions>
        <h1 onClick={logout}>Logout</h1>
        <h1>Change avatar</h1>
        <h1>Send us a message</h1>
      </ContainerOptions>
    </Container>
  );
}


export default Profile_page;

