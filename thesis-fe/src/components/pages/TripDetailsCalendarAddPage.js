import React, { Component } from 'react';
import styled from 'react-emotion'
import { DateRange } from 'react-date-range';
import { List } from '../container/List'
import moment from 'moment';
import { fontFamily, addTrip } from '../../helpers/styleConstants';
import back from '../../assets/svg/back.svg';
import ADD_DATE from '../apollo/mutations/add_date';
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";


class TripDetailsCalendarAddPage extends Component {


  state = {
    selectedList : []
  }

  redirectToCalendar = () => {
    this.props.history.push('/tripdetails/' + this.props.match.params.id + '/calendar')
    console.log(this.props);
  }

  handleCalendarChange = (date) => {
    const dateFormatted = Object.assign({}, date, {startPresentational : date.startDate.format('YYYY-MM-DD')},{endPresentational : date.endDate.format('YYYY-MM-DD')})
    console.log(dateFormatted);
    this.setState({selectedList: this.state.selectedList.concat(dateFormatted)});
    // (e) => {
    //   const objTime = this.state.selectedList;
    //   for (let i = 0; i < objTime.length; i++) {
    //     if ((objTime[i].startDate._d.toString() === e.startDate._d.toString()) && (objTime[i].endDate._d.toString() === e.endDate._d.toString())) {
    //       return
    //     }
    //   }
    //   this.setState({selectedList : this.state.selectedList.concat(e)})
    // }
  }

  render() {
    return (
      <Container>
        <H1>
          Add your favorite dates
        </H1>
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
              }}>Add</Button> }
            </Mutation>
          </Link>
          <ContainerList>
          <List items={this.state.selectedList.slice().map(obj => obj.startPresentational + ' - ' +  obj.endPresentational || [])}
            buttonResponse='delete'
            handleClick = {(e) => this.setState({selectedList: this.state.selectedList.slice().filter( obj => e !== (moment(obj.startDate).format('DD-MM-YYYY') + ' - ' +  moment(obj.endDate).format('DD-MM-YYYY')))})}
          />
          </ContainerList>
        <GoBackButton>
          <img src={back} alt="go back" height="40" width="40" onClick={this.redirectToCalendar}/>
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
  justify-content: center;
  align-items: center;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const SubContainer = styled('div')`
  width: 90%;
  display: flex;
  padding: 10px 0 30px 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${addTrip.containerBackground};
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

const H1 = styled('p')`
  font-size: 1.5rem;
  margin: 1rem;
  color: white;
  position: absolute;
  top 5vh;
`;

const Button = styled('button')`
  color: #b75537;
  width: 20vw;
  height: 5vh;
  margin: 10px 0 20px 0;
  border-width: 0;
  border-color: #afafaf;
  border-radius: 10px;
  background-color: ${addTrip.containerBackground};
  font-family: ${fontFamily};
  position: absolute;
  top: 60vh;
  left: 40vw;
`

const GoBackButton = styled('button')`
  position: absolute;
  right: 40vw;
  margin-top: 2rem;
  margin-right: .25rem;
  position: relative;
  font-size: 2rem;
  position: absolute;
  top: 90vh;
  left: 2vw;
`;

export default TripDetailsCalendarAddPage;
