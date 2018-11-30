import React, { Component } from 'react';
import styled from 'react-emotion'
import back from '../../assets/svg/back.svg';
import confirm from '../../assets/svg/confirm.svg';

const Container = styled('div')`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
  flex-direction: row;
  align-items: center;
`;

const H1 = styled('h1')`
  font-size: 1.5rem;
  color: white;
`;
const H2 = styled('h1')`
  font-size: 1.25rem;
  color: white;
`;

const BIG = styled('h1')`
  font-size: 3rem;
  color: white;
`
const GoBackButton = styled('button')`
  position: absolute;
  right: 40vw;
  margin-top: 2rem;
  margin-right: .25rem;
  position: relative;
`;

const Personal = styled('div')`
  display: flex;
  flex-direction: column;
  align-item: center;
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

    const image = (imgURL) => ( {
      backgroundImage:`url(${imgURL})`,
      backgroundSize: "cover",
      height: 60,
      width: 60,
      borderRadius: 50
      }
    );
    const InviteFriends = styled('div')`
      display:flex;
      flex-direction: row;
      margin-bottom: 2rem;
    `;
    const participants = this.props.info.trip.participants.map(obj => (
      <Participant key={obj.firstName + obj.lastName}>
        <div style={image('https://img.clipartxtras.com/2f24590138d32260c0e35e81b46a196d_drawing-dinosaur-drawing-easy-as-well-as-cute-dinosaur-drawing-dinosaur-cute-drawing_600-800.jpeg')}></div>
        <ContainerInfo>
          <Personal>
          <H1>{obj.firstName + ' ' + obj.lastName}</H1>
          <H2>Email: {obj.email}</H2>

          </Personal>
            <img src={confirm} alt="confirm" height="20" width="20"/>

        </ContainerInfo>
      </Participant>
    ))
    return (
      <Container>
        <BIG>
          Who's attending
        </BIG>
        <InviteFriends>
        <input placeholder="Invite more friends" style={{fontSize:"15px", borderRadius:"5px", borderStyle: 'none'}} type="text"/>
        <button style={{fontSize:"15px",color:"white"}} >Add</button>
        </InviteFriends>
        {participants}
        <GoBackButton>
          <img src={back} alt="go back" height="40" width="40" onClick={this.redirectToTrip}/>
        </GoBackButton>
      </Container>
    );
  }
}

export default ParticipantsDetails;