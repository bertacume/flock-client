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
class TripBudget extends Component {
  render() {

    console.log(this.props);
    return (
      <h1>
        Budget to be implemented
      </h1>
    );
  }
}

export default TripBudget;