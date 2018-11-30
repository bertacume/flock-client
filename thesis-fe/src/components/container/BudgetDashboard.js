import React, { Component } from 'react';
import styled from 'react-emotion'
import plus from '../../assets/svg/plus.svg';
import star from '../../assets/svg/star.svg';

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
`;

const ContainerBudget = styled('div')`
  width: 80vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BIG = styled('h1')`
  font-size: 3rem;
  color: white;
`;
const H1 = styled('h1')`
  font-size: 1.5rem;
  margin-left: 1rem;
  color: white;
`;


const ContainerBudgets = styled('div')`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class BudgetDashboard extends Component {

  redirectToTripDetails = (id) => {
    return () => {
      this.props.history.push('/tripdetails/' + id)
    }

  }
  render() {
    console.log(this.props);
    const isDecided = this.props.info.trip.budget.chosenBudget
    const chosenToShow = ((isDecided) ? [(
      <ContainerBudget key='1'>
        <img src={star} alt="winner" height="25" width="25" />
        <H1>{this.props.info.trip.destination.chosenDestination.name}</H1>
        <H1>votes: {this.props.info.trip.destination.chosenDestination.voters.length}</H1>
        <H1>creator: {this.props.info.trip.destination.chosenDestination.creator.firstName}</H1>
      </ContainerBudget>
      )]
    :
      [<H1 key='1'>To be decided</H1>])
    return (
      <Container>
        <BIG>
          Budget
        </BIG>
        <ContainerBudgets>

        </ContainerBudgets>

      </Container>
    );
  }
}

export default BudgetDashboard;