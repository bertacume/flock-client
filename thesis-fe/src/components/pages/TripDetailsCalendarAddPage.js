import React, { Component } from 'react';
import styled from 'react-emotion'
import { DateRange } from 'react-date-range';
import { List } from '../container/List'
import ADD_DATE from '../apollo/mutations/add_date';
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { Navbar } from '../presentational/Navbar';
import chat from '../../assets/chat.png';
import plus from '../../assets/plus.png';
import { backGradient, basicColors } from '../../helpers/styleConstants';


class TripDetailsCalendarAddPage extends Component {


  state = {
    selectedList: []
  }

  redirectToCalendar = () => {
    this.props.history.push('/tripdetails/' + this.props.match.params.id + '/calendar')
  }

  handleCalendarChange = (date) => {
    const dateFormatted = Object.assign({}, date, { startPresentational: date.startDate.format('YYYY-MM-DD') }, { endPresentational: date.endDate.format('YYYY-MM-DD') })
    if (this.state.selectedList.every(obj => (obj.startPresentational !== dateFormatted.startPresentational) || (obj.endPresentational !== dateFormatted.endPresentational))) this.setState({ selectedList: this.state.selectedList.concat(dateFormatted) });

  }

  render() {
    return (
      <Container>
        {/* <Nav> */}
        <Navbar
          pathLeft={`/tripdetails/${this.props.match.params.id}/calendar`}
          pathRight={`/tripdetails/${this.props.match.params.id}/chat/calendar`}
          title={'calendar'}
          iconRight={chat}
          history={this.props.history}
        />
        {/* </Nav> */}
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
                color: `${basicColors.darkerColor}`
              },
              DaySelected: {
                background: '#ffffff',
                color: `${basicColors.darkerColor}`
              },
              Calendar: {
                width: 280,
                padding: 10,
                background: 'transparent',
                borderRadius: '3rem',
                display: 'inline-block',
                boxSizing: 'border-box',
                letterSpacing: 0,
                color: '#ffffff'
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
                borderRightColor: '#ffffff',
                marginLeft: 1
              },
              MonthArrowNext: {
                borderLeftWidth: '6px',
                borderLeftColor: '#ffffff',
                marginLeft: 7
              },
            }}
          />
          <Link to={'/tripdetails/' + this.props.match.params.id + '/calendar/'}>
            <Mutation mutation={ADD_DATE} variables={{
              tripID: this.props.match.params.id,
              timeFrames: this.state.selectedList.map(obj => ({ startDate: obj.startDate.format('YYYY-MM-DD'), endDate: obj.endDate.format('YYYY-MM-DD') }))
            }}
              onCompleted={(res) => {
                this.setState({
                  input: ''
                })
              }}
              onError={(error) => console.log(error)}
            >
              {add => <Button onClick={() => {
                add().then(this.redirectToCalendar);
              }}><ImgBtn src={plus} /></Button>}
            </Mutation>
          </Link>
          <ContainerList>
            <List items={this.state.selectedList.slice().map(obj => obj.startPresentational + ' - ' + obj.endPresentational || [])}
              buttonResponse='delete'
              handleClick={(e) => this.setState({ selectedList: this.state.selectedList.slice().filter(obj => obj.startPresentational + ' - ' + obj.endPresentational !== e) })}
              styles={{
                itemTitle: [`color: ${basicColors.darkerColor}`, 'margin: 0', 'font-size: 1.4rem'],
                listContainer: ['max-height: 15rem;'],
                listItem: ['background-color: rgba(255, 255, 255, .6)',
                  'padding: 0 35px',
                  'height: 2.8rem',
                  'margin: .2rem 0'],
              }
              }
            />
          </ContainerList>
        </SubContainer>
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: white;
`;

const SubContainer = styled('div')`
  width: 90%;
  heigth: 100%;
  display: flex;
  padding: 10px 0 30px 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${backGradient};
  border-radius: 3rem;
  // position: absolute;
  // top: 10vh;
`

const ContainerList = styled('div')`
  // position: absolute;
  // top: 70vh;
  // max-height: 25vh;
  overflow: scroll;
  width: 100%;
`;


const Nav = styled('div')`
  // position: absolute;
  // top: 0vh;
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
  // position: absolute;
  // top: 60vh;
  // left: 40vw;
`

export default TripDetailsCalendarAddPage;
