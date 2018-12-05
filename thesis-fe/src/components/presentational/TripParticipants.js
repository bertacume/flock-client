import React, { Component } from 'react';
import styled from 'react-emotion';
import next from '../../assets/next.png';
import network from '../../assets/network.png';

const MoreInfoButton = styled('button')`
  position: relative;
  font-size: 2rem;
  margin-right: .25rem;
`;


const Container = styled('div')`
box-sizing: border-box;
  font-size: 1.5rem;
  border-radius: 10px;
  width: 90vw;
  height: 20vh;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;
  background: rgba(255,175,111,1);
  margin-bottom: 2vh;
  padding-left: 2rem;
`;

const ContainerParticipants = styled('h1')`
font-size: 1.5rem;
margin-left:.25rem;
color: white;
max-width: 20rem;
align-content: flex-end
`;


class TripParticipants extends Component {

  render() {
    const numberParticipants = this.props.info.length
    return (
      <Container>
        <img src={network} alt="logo" height="50" width="50"/>
        <ContainerParticipants>
          People attending: {numberParticipants}
        </ContainerParticipants>
        <MoreInfoButton>
          <img src={next} alt="more info" height="30" width="30" onClick={this.props.redirectParent}/>
        </MoreInfoButton>
      </Container>
    );
  }
}

export default TripParticipants;