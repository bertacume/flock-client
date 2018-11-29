import React, { Component } from 'react';
import styled from 'react-emotion';
import next from '../../assets/next.png';
import calendar from '../../assets/svg/calendar.svg'

const Container = styled('div')`
box-sizing: border-box;
font-size: 1.25rem;
border-radius: 10px;
width: 90vw;
height: 20%;
display: flex;
flex-direction:row;
justify-content:space-between;
align-items: center;
background: rgba(255,126,88,1);
margin-bottom: 2vh;
padding-left: 2rem;
`;

const H1 = styled('h1')`
font-size: 1.5rem;
color: white;
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
        <img src={calendar} alt="logo" height="50" width="50"/>
        <H1>
          Check the calendar
        </H1>
        <MoreInfoButton>
          <img src={next} alt="more info" height="30" width="30" onClick={this.props.redirectParent}/>
        </MoreInfoButton>
      </Container>
    );
  }
}

export default TripCalendar;