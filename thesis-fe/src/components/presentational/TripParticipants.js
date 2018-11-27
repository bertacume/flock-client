import React, { Component } from 'react';
import styled from 'react-emotion';
import plus from '../../assets/svg/plus.svg'

const MoreInfoButton = styled('button')`
  position: relative;
  font-size: 2rem;
  margin-right: .25rem;
`;


const Container = styled('div')`
  font-size: 1.5rem;
  border: 1px solid #000;
  width: 90vw;
  height: 12.5%;
  display: flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  overflow: scroll;
`;

const InnerContainer = styled('div')`
  font-size: 1rem;
`;

const H3 = styled('div')`
  font-size: 1.25rem;
  margin-left: .25rem;
`;
const Item = styled('h1')`
  display: inline-block;
  font-size: 1.5rem;
  margin: 0.1rem .25rem;
  border: .1rem solid black;
  padding: 0 .25rem;
`;

const ContainerList = styled('div')`
  width: 100%
  height: 10%;
  font-size: 1.5rem;
  margin-left: .5rem;
  flex-direction:row;
  justify-content: space-around;
  flex-wrap: wrap;
`;
class TripParticipants extends Component {

  render() {
    const listParticipants = this.props.info.map(obj => (
      <Item key={obj.id}>{obj.firstName} {obj.lastName[0]}</Item>
    ))
    return (
      <Container>
          <InnerContainer>
            <H3>Participants: </H3> {<ContainerList>{listParticipants}</ContainerList>}
          </InnerContainer>
        <MoreInfoButton>
          <img src={plus} alt="more info" height="20" width="20" onClick={this.props.redirectParent}/>
        </MoreInfoButton>
      </Container>
    );
  }
}

export default TripParticipants;