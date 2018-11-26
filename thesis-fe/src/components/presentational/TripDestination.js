import React, { Component } from 'react';
import styled from 'react-emotion';


const Container = styled('div')`
font-size: 1.25rem;
border: 1px solid #000;
width: 90vw;
height: 10%;
display: flex;
flex-direction:row;
align-items: center;
`;

const ContainerInner = styled('div')`
font-size: 1.25rem;

`;
class TripDestination extends Component {
  render() {
    return (
      <Container>
        {
          (this.props.info.isDictated) ?
            <h1>
              Destination: {this.props.chosenDestination}
            </h1>
          :
            <h1>
              Decided destination: {(this.props.info.chosenDestination.name) ? this.props.info.chosenDestination.name : <span>Not yet decided</span>}
              Suggestions: {
                this.props.info.suggestions.map(obj => <span key={obj.name}>{obj.name}</span>)
              }
            </h1>
        }
      </Container>
    );
  }
}

export default TripDestination;