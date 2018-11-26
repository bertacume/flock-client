import React, { Component } from 'react';
import styled from 'react-emotion';


const Container = styled('div')`
  font-size: 1.5rem;
  border: 1px solid #000;
  width: 90vw;
  height: 10%;
  display: flex;
  flex-direction:row;
  align-items: center;
  flex-wrap: wrap;
`;

const ContainerInner = styled('div')`
  font-size: 1.25rem;
  margin-left: .5rem;

`;
class TripParticipants extends Component {
  render() {
    const listParticipants = this.props.info.map(obj => (
      <ContainerInner key={obj.id}>{obj.firstName} {obj.lastName}</ContainerInner>
    ))
    return (
      <Container>
        Participants: {listParticipants}
      </Container>
    );
  }
}

export default TripParticipants;