import React, { Component } from 'react';
import styled from 'react-emotion'
import back from '../../assets/svg/back.svg';
import confirm from '../../assets/svg/confirm.svg';
import { Mutation } from "react-apollo";
import ADD_FRIEND from '../apollo/mutations/addfriend';

class ParticipantsDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input : ''
    }
  }

  handleInput = (e) => {
    const input = e.target.value;
    this.setState({
      input : input
    })
  }

  getInput = () => {
    const input = document.getElementsByTagName("input");
    return input[0] && input[0].value
  }
  redirectToTrip = (id) => {
    this.props.history.push('/tripdetails/' + this.props.match.params.id)
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
      <Participant key={obj.firstName + obj.lastName + obj.email}>
        <div style={image('https://img.clipartxtras.com/2f24590138d32260c0e35e81b46a196d_drawing-dinosaur-drawing-easy-as-well-as-cute-dinosaur-drawing-dinosaur-cute-drawing_600-800.jpeg')}></div>
        <ContainerInfo>
          <Personal>
          <H1>{(obj.firstName || 'Unregistered') + ' ' + (obj.lastName || 'user') }</H1>
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
        {this.state.input.length > 0 ?
          <input autoFocus key='aaaa' value={this.state.input} placeholder="Invite more friends" style={{fontSize:"15px", borderRadius:"5px", borderStyle: 'none'}} type="text" id="input" onChange={(e) => this.setState({input:e.target.value})} />
        :
          <input key='aaaa' value={this.state.input} placeholder="Invite more friends" style={{fontSize:"15px", borderRadius:"5px", borderStyle: 'none'}} type="text" id="input" onChange={(e) => this.setState({input:e.target.value})} />
        }
          <Mutation mutation={ADD_FRIEND} variables ={{
              tripID: this.props.match.params.id,
              participants : [this.state.input]
            }}
            onCompleted={(res) => {
              this.setState({
                input: ''
              })
            }}
            onError={(error) => console.log(error)}
          >
            { add => <button style={{fontSize:"15px",color:"white"}} onClick={add}>Add</button> }
          </Mutation>
        </InviteFriends>
        {participants}
        <GoBackButton>
          <img src={back} alt="go back" height="40" width="40" onClick={this.redirectToTrip}/>
        </GoBackButton>
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5vh;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`
const Participant = styled('div')`
  display: flex;
  width: 80vw;
  flex-direction: row;
  align-items: center,
  margin: 2rem;
`
const ContainerInfo = styled('div')`
  margin-left: .5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const H1 = styled('p')`
  font-size: 1.5rem;
  color: white;
`
const H2 = styled('p')`
  font-size: 1.25rem;
  color: white;
`
const BIG = styled('p')`
  font-size: 3rem;
  color: white;
`
const GoBackButton = styled('button')`
  position: absolute;
  right: 40vw;
  margin-top: 2rem;
  margin-right: .25rem;
  position: relative;
`
const Personal = styled('div')`
  display: flex;
  flex-direction: column;
  align-item: center;
`

export default ParticipantsDetails;