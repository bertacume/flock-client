import React, { Component } from 'react';
import styled from 'react-emotion';
import plus from '../../assets/svg/plus.svg'


const Container = styled('div')`
font-size: 1.25rem;
border: 1px solid #000;
width: 90vw;
height: 10%;
display: flex;
flex-direction:row;
align-items: center;
`;

const ContainerDestination = styled('h1')`
  font-size: 1.25rem;
`;

const ContainerSuggestions = styled('h1')`
  font-size: 1.25rem;
`;

const ContainerDestinations = styled('div')`
  display: flex;
  flex-direction: column;
`;
const MoreInfoButton = styled('button')`
  position: relative;
  font-size: 2rem;
`;

class TripDestination extends Component {

  redirectParent = () => {

  }
  render() {
    return (
      <Container>
        {
          (this.props.info.isDictated) ?
            <ContainerDestination>
              Destination: {this.props.chosenDestination}
            </ContainerDestination>
          :
            <ContainerDestinations>
              <ContainerDestination>
                Decided destination: {(this.props.info.chosenDestination.name) ? this.props.info.chosenDestination.name : <span>Not yet decided</span>}
              </ContainerDestination>
              <ContainerSuggestions>
              Suggestions: {
                this.props.info.suggestions.map(obj => <span key={obj.name}>{obj.name}</span>)
              }
              </ContainerSuggestions>
            </ContainerDestinations>
        }
        <MoreInfoButton>
          <img src={plus} alt="more info" height="20" width="20" onClick={this.props.redirectParent}/>
        </MoreInfoButton>
      </Container>
    );
  }
}

export default TripDestination;