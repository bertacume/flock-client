import React, { Component } from 'react';
import styled from 'react-emotion';
import { Navbar } from '../presentational/Navbar';
import locationImg from '../../assets/location.png';
import budgetImg from '../../assets/budget.png';
import logo from '../../assets/logo_orange.png';
import calendarImg from '../../assets/svg/calendarPurple.svg'
import { Mutation } from 'react-apollo';
import moment from 'moment';
import { basicColors, fontFamily } from '../../helpers/styleConstants';
import bird from '../../assets/logo_one_bird.png'


class ChatContainer extends Component {
  state = {
    input: '',
  }
  componentDidMount() {
    this.props.sub();
  }

  handleInput = (event) => {
    this.setState({ input: event.target.value });
  }

  handleAddClick = (mutation) => {
    this.addMessage(mutation, this.state.input);
    this.setState({ input: '' });
  }

  addMessage = (mutation, message) => {
    const variables = { tripID: this.props.tripID, message };
    mutation({ variables });
  }

  getIcon = () => {
    switch (this.props.type) {
      case 'DESTINATION':
        return locationImg;
      case 'BUDGET':
        return budgetImg;
      case 'CALENDAR':
        return calendarImg;

      default:
        return logo;
    }
  }

  renderMessages = () => {
    const type = (this.props.type === 'CALENDAR') ? 'TIMEFRAME' : this.props.type;
    const messages = this.props.messages.filter(mssg => mssg.type === type);
    return messages.map(mssg => {
      const isUser = this.props.self.email === mssg.creator.email;
      return (<Mssg key={mssg.createdAt} isUser={isUser}>
        {isUser ? null : <InfoTitle isUser={isUser} isBold={true}>{mssg.creator.firstName} {mssg.creator.lastName}</InfoTitle>}
        {isUser ?
          <MssgBox>
            <ContainerChatMessage isUser={isUser}>
              <Title isUser={isUser}>{mssg.message}</Title>
            <TitleSmall isUser={isUser}>{moment(mssg.createdAt).format('HH:mm')}</TitleSmall>
            </ContainerChatMessage>
            <Arrow isUser={isUser}>
              <ArrowInner isUser={isUser} />
              <ArrowOuter isUser={isUser} />
            </Arrow>
          </MssgBox> :
          <MssgBox>
            <Arrow>
              <ArrowInner />
              <ArrowOuter />
            </Arrow>
            <ContainerChatMessage>
              <Title>{mssg.message}</Title>
            <TitleSmall isUser={isUser}>{moment(mssg.createdAt).format('HH:mm')}</TitleSmall>
            </ContainerChatMessage>
          </MssgBox>
        }
      </Mssg>);
    })
  };

  render() {
    return (
      <Container>
        <Navbar
          pathLeft={this.props.type === 'GENERAL' ? `/tripdetails/${this.props.tripID}/` : `/tripdetails/${this.props.tripID}/${this.props.type.toLowerCase()}`}
          title={this.props.type}
          iconRight={this.getIcon()}
          history={this.props.history}
        />
        <Box>
          <ContainerChat>
            {this.renderMessages()}
          </ContainerChat>
          <SubContainer>
            <Input cols="50" rows="5" placeholder={'Type a message'} value={this.state.input} onChange={this.handleInput} />
            <Mutation
              mutation={this.props.mutation[this.props.type]}
            >
              {(mutation, { data }) => (
                <ButtonAdd onClick={() => this.handleAddClick(mutation)}><ImgBtn src={bird} /></ButtonAdd>
              )}
            </Mutation>
          </SubContainer>
        </Box>
      </Container>
    )
  }
}

const Container = styled('div')`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  textarea::-webkit-input-placeholder {
    color: #ffffff;
  }
`
const Box = styled('div')`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
const ContainerChat = styled('div')`
  height: 100%;
  width: 100%;
  background: white;
  overflow: scroll;
`
const Mssg = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${props =>
    props.isUser ? 'flex-end' : 'flex-start'};
  clear: both;
`
const MssgBox = styled('div')`
 padding: 0 0 10px 0;
  clear: both;
  position: relative;
`
const SubContainer = styled('div')`
  box-sizing: border-box;
  width: 100%;
  height: 7rem;
  padding: 10px;
  display: flex;
  flex-direction row;
  justify-content: space-evenly;
  align-items: center;
  background: ${basicColors.lightColor};
`
const Arrow = styled('div')`
  width: 12px;
  height: 20px;
  overflow: hidden;
  position: relative;
  float: left;
  top: 6px;
  ${props =>
    props.isUser ? `left: -1px` : `right: -1px`};
`
const ArrowOuter = styled('div')`
  width: 12px;
  height: 20px;
  overflow: hidden;
  position: relative;
  float: left;
  top: 6px;
  right: -1px;
`
const ArrowInner = styled('div')`
  width: 0;
  height: 0;
  ${props =>
    props.isUser ? `border-left: 20px solid ${basicColors.lightColor}` : `border-right: 20px solid ${basicColors.grey}`};
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  position: absolute;
  top: 0;
  ${props =>
    props.isUser ? `right: 2px` : `left: 2px`};
`
const ContainerChatMessage = styled('div')`
  float: left;
  height: 100%;
  // border: 1px solid #CCC;
  word-break: break-word;
  background-color: ${props =>
    props.isUser ? basicColors.lightColor : basicColors.grey};
  border: 1px solid transparent;
  padding: 6px 8px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  // padding: 10px 20px;
  // display: flex;
  // flex-direction: column;
  // justify-content: flex-start;
  // border-radius: 20px;
  // margin-bottom: 1rem;
  // background: #ffd4b8;
`
const Input = styled('textarea')`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 10px 20px;
  margin: 5px;
  word-break: break-word;
  border-sryle: none;
  border-color: transparent;
  background: rgba(255, 255, 255, .2);
  border-radius: 1rem;
  color: #ffffff;
  font-family: ${fontFamily};
  font-weight: 1.2rem;
  outline: none;
  overflow:scroll;
`
const ButtonAdd = styled('button')`
  width: 20vw;
  height: 5vh;
  border-width: 0;
  border-color: #afafaf;
  border-radius: 10px;
  background-color: transparent;
`
const InfoTitle = styled('p')`
  height: 100%;
  margin: 0;
  padding: ${props =>
    props.isUser ? '.5rem 1.5rem .5rem 0' : '.5rem 0 .5rem 1.5rem'};
  color: ${basicColors.lightColor};
  font-weight: ${props =>
    props.isBold ? '700' : '500'};
  font-size: 1.2rem;
`
const Title = styled('p')`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  color: ${props =>
    props.isUser ? '#ffffff' : '#000000'};
`
const TitleSmall = styled('p')`
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 5px 0 0 0;
  font-size: 1rem;
  color: ${props =>
    props.isUser ? '#ffffff' : '#000000'};
  text-align: ${props =>
    props.isUser ? 'right' : 'left'};
`
const ImgBtn = styled('img')`
  height: 100%;
`
export default ChatContainer;


/*
User will get in and: login with his username and password, sign up and create new account, login with facebook (and maybe sign up on this case),
the fe will send this data to the be and the backend should return in case of success the userid to the
front end -which will be kept on the localStorage???- and will be further used. In case of failure, define what to do.//#endregion
In the success case, the USER ID should persist.
*/