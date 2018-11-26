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

const MoreInfoButton = styled('button')`
  position: relative;
  font-size: 2rem;
`;

// const ContainerInner = styled('div')`
// font-size: 1.25rem;

// `;
class TripCalendar extends Component {
  render() {

    return (
      <Container>

        <MoreInfoButton>
          <img src={plus} alt="more info" height="20" width="20" onClick={this.props.redirectParent}/>
        </MoreInfoButton>
      </Container>
    );
  }
}

export default TripCalendar;