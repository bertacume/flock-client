import React, { Component } from 'react';
import styled from 'react-emotion'
import star from '../../assets/svg/star.svg';
// import back from '../../assets/svg/back.svg';
import back from '../../assets/back.png';
import destinationImg from '../../assets/destination.png';
import locationImg from '../../assets/location.png';
import { Mutation } from "react-apollo";
import ADD_SUGGESTED_DESTINATION_LIKES from '../apollo/mutations/add_suggested_destination_likes';

class DestinationDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripID: this.props.location.pathname.split('/')[2]
    }
  }
  redirectToTrip = (id) => {
    this.props.history.push('/tripdetails/' + this.props.location.pathname.split('/')[2])
  }

  renderNavBar = () => {
    return (<NavBar>
      <Button onClick={this.redirectToTrip}>
        <Icon src={back} />
      </Button>
      <Title>destination</Title>
      <Button onClick={this.redirectToTrip}>
        <Icon src={locationImg} />
      </Button>
    </NavBar>);
  }

  renderDictated = () => {
    const { destination } = this.props.trip;
    return (<ContainerDestination key='1'>
      <img src={star} alt="winner" height="25" width="25" />
      <H1>{destination.chosenDestination.name}</H1>
      <H1>votes: {destination.chosenDestination.voters.length}</H1>
      <H1>creator: {destination.chosenDestination.creator.firstName}</H1>
    </ContainerDestination>);
  }

  renderDemocracy = () => {
    return (<H1 key='1'>To be decided</H1>);
  }


  render() {
    const { destination } = this.props.trip;
    // const othersToShow = ((destination.suggestions.length > 0) ? [(
    //   destination.suggestions.filter(obj => obj.name !== chosenDestination).map(obj => (
    //     <ContainerDestination key={obj.name + obj.voters.length}>
    //       <H2>{obj.name}</H2>
    //       <H2>votes: {obj.voters.length}</H2>
    //       {destination.isDictated &&
    //         <Mutation mutation={ADD_SUGGESTED_DESTINATION_LIKES} variables={{
    //           input: {
    //             tripID: this.state.tripID,
    //             name: obj.name
    //           }
    //         }}>
    //           {addDestinationLikes => <img src={star} alt="winner" height="15" width="15" onClick={addDestinationLikes} id={obj.name} />}
    //         </Mutation>
    //       }
    //     </ContainerDestination>
    //   ))
    // )]
    //   :
    //   null)


    return (
      <Container>
        {this.renderNavBar()}
        <ContainerDestinations>
          {destination.isDictated ? this.renderDictated() : this.renderDemocracy()}
        </ContainerDestinations>
      </Container>
    );
  }
}

const BIG = styled('h1')`
  font-size: 3rem;
  color: #e48264;
`;
const Container = styled('div')`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #ffffff;
`;
const NavBar = styled('div')`
  box-sizing: border-box;
  width: 100%;
  height: 8%;
  padding: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
`;
const Button = styled('button')`
  height: 90%;
  width: 10%;
  padding: 0;
  border-width: 0;
  background-color: transparent;
`
const Icon = styled('img')`
  height: 80%;
`;
const Title = styled('p')`
  margin: 0;
  font-family: Kathen;
  color: #e88d6f;
  font-size: 2.5rem;
  text-align: center
`
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
  color: #e48264;
`;
const H2 = styled('h1')`
  font-size: 1.25rem;
  margin: 0 1rem;
  color: #e48264;
`;
const GoBackButton = styled('button')`
  position: absolute;
  right: 40vw;
  margin-top: 2rem;
  margin-right: .25rem;
  position: relative;
  font-size: 2rem;
`;
export default DestinationDashboard;