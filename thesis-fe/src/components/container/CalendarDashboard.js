import React, { Component } from 'react';
import styled from 'react-emotion'
import back from '../../assets/svg/back.svg';
import { Link } from "react-router-dom";
import plus from '../../assets/plus-gradient.png';
import { fontFamily } from '../../helpers/styleConstants';
import moment from 'moment';
import star from '../../assets/svg/star.svg';
import person from '../../assets/svg/person.svg';

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const ContainerSuggestions = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BIG = styled('h1')`
  font-size: 3rem;
  color: white;
`;

const Button = styled('button')`
width: 20vw;
height: 10vh;
margin: 10px 0 20px 0;
border-width: 0;
border-color: #afafaf;
border-radius: 10px;
background-color: white;
font-family: ${fontFamily};
`

const ImgBtn = styled('img')`
  height: 100%;
`

const GoBackButton = styled('button')`
  position: absolute;
  right: 40vw;
  margin-top: 2rem;
  margin-right: .25rem;
  position: relative;
  font-size: 2rem;
`;

const H1 = styled('h1')`
  font-size: 1.5rem;
  margin: 1rem;
  color: white;
`;

const H2 = styled('h1')`
  font-size: 1.5rem;
  margin-top: 1.25rem;
  margin-right: 0.5rem;
  color: white;
`;


class MyTripsDashboard extends Component {

  redirectToTrip = () => {
    this.props.history.push('/tripdetails/' + this.props.match.params.id)
  }

  render() {
    const suggestionList = this.props.info.trip.timeFrame.suggestions.map(obj => (
      <ContainerSuggestions key={obj.startDate + obj.endDate}>
        <H2>
          {moment(obj.startDate).format('DD-MM-YYYY') + ' - ' + moment(obj.endDate).format('DD-MM-YYYY')}
        </H2>
        <H2>
          - {obj.voters.length}
        </H2>
        <img src={person} alt="winner" height="20" width="20" />
        <img src={star} alt="winner" height="20" width="20" />

      </ContainerSuggestions>
    ))
    return (
      <Container>
        <BIG>
          Calendar
        </BIG>
        <Link to={'/tripdetails/' + this.props.match.params.id + '/calendar/add'}>
          <Button ><ImgBtn src={plus} /></Button>
        </Link>
        {suggestionList}
        <GoBackButton>
          <img src={back} alt="go back" height="40" width="40" onClick={this.redirectToTrip}/>
        </GoBackButton>
      </Container>
    );
  }
}

export default MyTripsDashboard;