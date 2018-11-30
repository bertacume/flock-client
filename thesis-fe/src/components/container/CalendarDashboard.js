import React, { Component } from 'react';
import styled from 'react-emotion'
import back from '../../assets/svg/back.svg';
import { DateRange } from 'react-date-range';
import { List } from '../container/List';

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ff7e5f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #feb47b, #ff7e5f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #feb47b, #ff7e5f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`

const ContainerUsers = styled('div')`
  margin-top: 5rem;
  margin-left: 5rem;
  width: 80vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`
const ContainerList = styled('div')`
  max-height: 30rem;
  width: 30rem;
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
  font-size: 1.25rem;
  margin: 1rem;
  color: white;
`;


class MyTripsDashboard extends Component {

  state = {
    tripID : this.props.location.pathname.split('/')[2],
    usersInfo : {},
    listInfo : [],
    selectedUser :  null
  }

  generateObj = () => {
    const objUsers = {};
    const listPresentational = [];
    let selected;
    for (let i = 0; i < this.props.info.trip.timeFrame.suggestions.length; i++) {
      if (i === 0) selected = this.props.info.trip.timeFrame.suggestions[i].creator.firstName
      objUsers[this.props.info.trip.timeFrame.suggestions[i].creator.firstName] = this.props.info.trip.timeFrame.suggestions[i]
      listPresentational[i] = ( <H1 onClick={this.showTimeframe} id={this.props.info.trip.timeFrame.suggestions[i].creator.firstName} key={this.props.info.trip.timeFrame.suggestions[i].creator.firstName}>
        {this.props.info.trip.timeFrame.suggestions[i].creator.firstName}</H1> )
    }
    this.setState({
      usersInfo : objUsers,
      listInfo : listPresentational,
      selectedUser : selected
    });
  }

  componentDidMount () {
    this.generateObj();
  }

  redirectToTrip = () => {
    this.props.history.push('/tripdetails/' + this.state.tripID)
  }

  showTimeframe = (e) => {
    this.setState({
      selectedUser : e.target.id
    })
  }
  render() {
    const mock = {};
    mock.Arturo = ['18-12-2018','31-12-2018']
    mock.Damien = ['12-12-2018','25-12-2018']
    mock.Marco = ['20-12-2018','02-01-2019']
    mock.Berta = ['17-12-2018','08-01-2019']
    mock.Christopher = ['22-12-2018','05-01-2019']
    const toShow = this.state.listInfo.length > 0 && (this.state.selectedUser)
    return (
      <Container>
        <ContainerUsers>
        {this.state.listInfo}
        </ContainerUsers>
        <H2>
          Checking {this.state.selectedUser}'s avaiability
        </H2>
        <DateRange
          startDate={(toShow && mock[toShow][0]) || null}
          endDate={(toShow && mock[toShow][1]) || null}
          onInit={null}
          calendars={1}
          twoStepChange={true}
          theme={{
            DayInRange: {
              background: '#000000',
              color: '#b75537'
            },
            DaySelected: {
              background: '#000000',
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
        <ContainerList>
          {mock[toShow] &&
            <List
            items={(mock[toShow] && [mock[toShow][0].concat([' - '],mock[toShow][1])])}
            styles={{
            maxHeight:'5rem',
            itemTitle : ['color: #b75537', 'margin: 0', 'font-size: 1.4rem'],
            listContainer : ['max-height: 12.6rem;'],
            listItem : ['background-color: rgba(255, 255, 255, .3)',
            'padding: 0 35px',
            'height: 4rem',
            'margin: .2rem 0'],
            }}
            />}
        </ContainerList>
        <GoBackButton>
          <img src={back} alt="go back" height="40" width="40" onClick={this.redirectToTrip}/>
        </GoBackButton>
      </Container>
    );
  }
}

export default MyTripsDashboard;