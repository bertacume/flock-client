import React, { Component } from 'react';
import styled from 'react-emotion'
import star from '../../assets/svg/star.svg';
import back from '../../assets/svg/back.svg';
import plus from '../../assets/svg/plus.svg';
import { Mutation } from "react-apollo";
import ADD_SUGGESTED_DESTINATION_LIKES from '../apollo/mutations/add_suggested_destination_likes';

const BIG = styled('h1')`
  font-size: 3rem;
  color: white;
`;
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
const ContainerDestination = styled('div')`
  width: 80vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ContainerDestinations = styled('div')`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const H1 = styled('h1')`
  font-size: 1.5rem;
  margin-left: 1rem;
  color: white;
`;
const H2 = styled('h1')`
<<<<<<< HEAD
  font-size: 1.25rem;
  margin: 0 1rem;
  color: white;
=======
  font-size: 1.5rem;
  margin: 0 1rem;
>>>>>>> added mutation structure, user functionalities and refactored
`;
const GoBackButton = styled('button')`
  position: absolute;
  right: 40vw;
  margin-top: 2rem;
  margin-right: .25rem;
  position: relative;
  font-size: 2rem;
`;
class MyTripsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripID : this.props.location.pathname.split('/')[2]
    }
  }
  redirectToTrip = (id) => {
    this.props.history.push('/tripdetails/' + this.props.location.pathname.split('/')[2])
  }

  render

  render() {
    const isDecided = this.props.info.trip.destination.chosenDestination.name
    const chosenToShow = ((!isDecided) ? [(
      <ContainerDestination key='1'>
        <img src={star} alt="winner" height="25" width="25" />
        <H1>{this.props.info.trip.destination.chosenDestination.name}</H1>
        <H1>votes: {this.props.info.trip.destination.chosenDestination.voters.length}</H1>
        <H1>creator: {this.props.info.trip.destination.chosenDestination.creator.firstName}</H1>
      </ContainerDestination>
      )]
    :
      [<H1>To be decided</H1>])


    const othersToShow = ((this.props.info.trip.destination.suggestions.length > 0) ? [(
      this.props.info.trip.destination.suggestions.filter(obj => obj.name !== this.props.info.trip.destination.chosenDestination.name).map( obj => (
        <ContainerDestination key={obj.name + obj.voters.length}>
          <H2>{obj.name}</H2>
          <H2>votes: {obj.voters.length}</H2>
          {isDecided &&
            <Mutation mutation={ADD_SUGGESTED_DESTINATION_LIKES} variables ={{input : {
              tripID : this.state.tripID,
              name: obj.name
            }}}>
              {addDestinationLikes => <img src={star} alt="winner" height="15" width="15" onClick={addDestinationLikes} id={obj.name}/>}
            </Mutation>
          }
        </ContainerDestination>
      ))
      )]
    :
      null)


    return (
      <Container>
        <BIG>
          Destination
        </BIG>
        <ContainerDestinations>
          {chosenToShow}
          {othersToShow}
        </ContainerDestinations>
        <GoBackButton>
          <img src={back} alt="go back" height="40" width="40" onClick={this.redirectToTrip}/>
        </GoBackButton>
      </Container>
    );
  }
}

export default MyTripsDashboard;