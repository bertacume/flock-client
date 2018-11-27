import React, { Component } from 'react';
import styled from 'react-emotion'
import back from '../../assets/svg/back.svg';

const Container = styled('div')`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
`;

const Participant = styled('div')`
  display: flex;
  width: 80vw;
  flex-direction: row;
  align-items: center,
  margin: 2rem;
`;

const ContainerInfo = styled('div')`
  margin-left: .5rem;
  display: flex;
  flex-direction: column
`;

const H1 = styled('h1')`
  font-size: 1.5rem;
`;
const H2 = styled('h1')`
  font-size: 1.25rem;
`;

const BIG = styled('h1')`
  font-size: 3rem;
`
const GoBackButton = styled('button')`
  position: absolute;
  right: 40vw;
  margin-top: 2rem;
  margin-right: .25rem;
  position: relative;
  font-size: 2rem;
`;



class ParticipantsDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id : this.props.location.pathname.split('/')[2]
    }
  }

  redirectToTrip = (id) => {

    this.props.history.push('/tripdetails/' + this.props.location.pathname.split('/')[2])

  }
  render() {

    const image = (ad) => ( {
      backgroundImage:`url(${ad})`,
      backgroundSize: "cover",
      height: 60,
      width: 60,
      borderRadius: 50
      }
    );
    const participants = this.props.info.trip.participants.map(obj => (
      <Participant key={obj.firstName + obj.lastName}>
        <div style={image('https://img.clipartxtras.com/2f24590138d32260c0e35e81b46a196d_drawing-dinosaur-drawing-easy-as-well-as-cute-dinosaur-drawing-dinosaur-cute-drawing_600-800.jpeg')}></div>
        <ContainerInfo>
          <H1>{obj.firstName + ' ' + obj.lastName}</H1>
          <H2>Email: {obj.email}</H2>
        </ContainerInfo>
      </Participant>
    ))
    return (
      <Container>
        <BIG>
          Participants
        </BIG>
        {participants}
        <GoBackButton>
          <img src={back} alt="go back" height="20" width="20" onClick={this.redirectToTrip}/>
        </GoBackButton>
      </Container>
    );
  }
}

export default ParticipantsDetails;