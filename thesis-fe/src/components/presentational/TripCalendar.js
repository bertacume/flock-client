import React, { Component } from 'react';
import styled from 'react-emotion';
import next from '../../assets/next.png';
import calendar from '../../assets/svg/calendar.svg'
import { palette } from '../../helpers/styleConstants';

const Container = styled('div')`
box-sizing: border-box;
font-size: 1.25rem;
border-radius: 10px;
width: 90vw;
height: 20vh;
display: flex;
flex-direction:row;
justify-content:space-between;
align-items: center;
background: ${palette[3]};
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
        <img src={calendar} alt="logo" height="35" width="35"/>
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