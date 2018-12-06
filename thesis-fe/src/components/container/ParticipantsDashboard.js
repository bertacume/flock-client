import React, { Component } from 'react';
import styled from 'react-emotion'
import { Mutation } from "react-apollo";
import ADD_FRIEND from '../apollo/mutations/addfriend';
import { Navbar } from '../presentational/Navbar';
import chat from '../../assets/chat.png';
import { Input } from '../styledComponents/styledComponents';

class ParticipantsDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input : ''
    }
  }

  componentDidMount () {
    this.props.sub();
  }

  handleInput = (e) => {
    const input = e.target.value;
    this.setState({
      input : input
    })
  }

  validateEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.input).toLowerCase());
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
    const participants = this.props.info.trip.participants.map(obj => (
      <Participant key={obj.firstName + obj.lastName + obj.email}>
        <div style={image('https://img.clipartxtras.com/2f24590138d32260c0e35e81b46a196d_drawing-dinosaur-drawing-easy-as-well-as-cute-dinosaur-drawing-dinosaur-cute-drawing_600-800.jpeg')}></div>
        <ContainerInfo>
          <Personal>
          <H1>{(obj.firstName || 'Unregistered') + ' ' + (obj.lastName || 'user') }</H1>
          <H2>Email: {obj.email}</H2>
          </Personal>
        </ContainerInfo>
      </Participant>
    ))
    return (
      <Container>
          <Navbar
            pathLeft={`/tripdetails/${this.props.match.params.id}`}
            pathRight={`/tripdetails/${this.props.match.params.id}/chat/budget`}
            title={'Participants'}
            iconRight={chat}
            history={this.props.history}
          />
        <SubContainer>

          <Input autoFocus key='aaaa' value={this.state.input} placeholder="Invite more friends" type="text" id="input" onChange={(e) => this.setState({input:e.target.value})} />

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
            { add => (<ButtonAdd onClick={() => (this.validateEmail()) ? add() : console.log('Please input email')}><ImgBtn src={require('../../assets/plus.png')} /></ButtonAdd> )}
          </Mutation>
        </SubContainer>
        <Participants>
          {participants}
        </Participants>
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
  background: white;
`
const Participant = styled('div')`
  box-sizing: border-box;
  display: flex;
  width: 80vw;
  flex-direction: row;
  align-items: center;
  margin: 2rem;
  padding-left: .5rem;
  max-height: 40vh;
  overflow: scroll;
  border-radius: 25px;
  margin-bottom: 2rem;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`
const ImgBtn = styled('img')`
  height: 5vh;
`

const Participants = styled('div')`
  max-height: 100vh;
  height: 80vh;
  overflow: scroll;
`
const ButtonAdd = styled('button')`
  width: 20vw;
  height: 5vh;
  border-width: 0;
  border-color: #afafaf;
  border-radius: 10px;
  background-color: transparent;
`

const SubContainer = styled('div')`
  width: 100%;
  height: 18%;
  margin: 5px 0;
  padding: 10px 0;
  display: flex;
  flex-direction column;
  justify-content: space-evenly;
  align-items: center;
  background: #e9e9e9;
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
const Personal = styled('div')`
  display: flex;
  flex-direction: column;
  align-item: center;
`

export default ParticipantsDetails;