import React, { Component } from 'react';
import styled from 'react-emotion'
import { DateRange } from 'react-date-range';
import { List } from '../container/List'
import ADD_DATE from '../apollo/mutations/add_date';
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { Navbar } from '../presentational/Navbar';
import chat from '../../assets/chat.png';
import plus from '../../assets/plus-gradient.png';


class TripDetailsCalendarAddPage extends Component {


  state = {
    selectedList : []
  }

  redirectToCalendar = () => {
    this.props.history.push('/tripdetails/' + this.props.match.params.id + '/calendar')
  }

  handleCalendarChange = (date) => {
    const dateFormatted = Object.assign({}, date, {startPresentational : date.startDate.format('YYYY-MM-DD')},{endPresentational : date.endDate.format('YYYY-MM-DD')})
    if (this.state.selectedList.every(obj => (obj.startPresentational !== dateFormatted.startPresentational) || (obj.endPresentational !== dateFormatted.endPresentational))) this.setState({selectedList: this.state.selectedList.concat(dateFormatted)});

  }

  render() {
    return (
      <Container>
        <Nav>
          <Navbar
            pathLeft={`/tripdetails/${this.props.match.params.id}/calendar`}
            pathRight={`/tripdetails/${this.props.match.params.id}/chat/budget`}
            title={'calendar'}
            iconRight={chat}
            history={this.props.history}
          />
        </Nav>
        <SubContainer>
          <DateRange
            minDate={null}
            maxDate={null}
            startDate={null}
            endDate={null}
            calendars={1}
            onChange={this.handleCalendarChange}
            twoStepChange={true}
            theme={{
              DayInRange: {
                background: 'rgba(255, 255, 255, .6)',
                color: '#b75537'
              },
              DaySelected: {
                background: '#ffffff',
                color: '#b75537'
              },
              Calendar: {
                width: 280,
                padding: 10,
                background: 'transparent',
                borderRadius: '3rem',
                display: 'inline-block',
                boxSizing: 'border-box',
                letterSpacing: 0,
                color: '#b75537'
              },
              DateRange: {
                display: 'block',
                boxSizing: 'border-box',
                background: 'transparent',
                borderRadius: '2px'
              },
              MonthButton: {
                display: 'block',
                boxSizing: 'border-box',
                height: 18,
                width: 18,
                padding: 0,
                margin: '0 10px',
                border: 'none',
                background: 'rgba(255, 255, 255, .4)',
                boxShadow: 'none',
                outline: 'none',
                borderRadius: '50%'
              },
              MonthArrowPrev: {
                borderRightWidth: '6px',
                borderRightColor: '#b75537',
                marginLeft: 1
              },
              MonthArrowNext: {
                borderLeftWidth: '6px',
                borderLeftColor: '#b75537',
                marginLeft: 7
              },
            }}
          />
          </SubContainer>
          <Link to={'/tripdetails/' + this.props.match.params.id + '/calendar/'}>
            <Mutation mutation={ADD_DATE} variables ={{
                tripID: this.props.match.params.id,
                timeFrames: this.state.selectedList.map(obj => ({startDate: obj.startDate.format('YYYY-MM-DD'), endDate: obj.endDate.format('YYYY-MM-DD')}))
              }}
              onCompleted={(res) => {
                this.setState({
                  input: ''
                })
              }}
              onError={(error) => console.log(error)}
            >
              { add => <Button  onClick={() => {
                add().then(this.redirectToCalendar);
              }}><ImgBtn src={plus} /></Button> }
            </Mutation>
          </Link>
          <ContainerList>
          <List items={this.state.selectedList.slice().map(obj => obj.startPresentational + ' - ' +  obj.endPresentational || [])}
            buttonResponse='delete_black'
            handleClick = {(e) => this.setState({selectedList: this.state.selectedList.slice().filter( obj => obj.startPresentational + ' - ' + obj.endPresentational !== e)})}
          />
          </ContainerList>
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
`;

const SubContainer = styled('div')`
  width: 90%;
  display: flex;
  padding: 10px 0 30px 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-radius: 3rem;
  position: absolute;
  top: 10vh;
`

const ContainerList = styled('div')`
  position: absolute;
  top: 70vh;
  max-height: 25vh;
  overflow: scroll;
`;


const Nav = styled('div')`
  position: absolute;
  top: 0vh;
  overflow: scroll;
`;

const ImgBtn = styled('img')`
  height: 100%;
`

const Button = styled('button')`
  color: white;
  width: 20vw;
  height: 7.5vh;
  margin: 10px 0 20px 0;
  border-width: 0;
  border-color: #afafaf;
  border-radius: 10px;
  background: transparent;
  font-size: 3rem;
  position: absolute;
  top: 60vh;
  left: 40vw;
`

export default TripDetailsCalendarAddPage;
