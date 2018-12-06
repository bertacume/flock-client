import React, { Component } from 'react';
import styled from 'react-emotion';
import next from '../../assets/next.png';
import participants from '../../assets/participants.png';
import { palette } from '../../helpers/styleConstants';

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
  background: ${palette[0]};
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
        <img src={participants} alt="logo" height="35" width="35"/>
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