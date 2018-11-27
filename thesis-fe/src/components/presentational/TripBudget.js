import React, { Component } from 'react';
import styled from 'react-emotion';
import plus from '../../assets/svg/plus.svg'


const Container = styled('div')`
font-size: 1.25rem;
border: 1px solid #000;
width: 90vw;
height: 12.5%;
display: flex;
flex-direction:row;
align-items: center;
justify-content: space-between;
`;

const ContainerBudget = styled('h1')`
font-size: 1.25rem;
margin-left:.25rem;
`;
const ContainerBudgets = styled('div')`
display: flex;
flex-direction: column;
`;

const ContainerSuggestions = styled('h1')`
font-size: 1rem;
margin-left: .25rem;
`;

const MoreInfoButton = styled('button')`
  margin-right: .25rem;
  position: relative;
  font-size: 2rem;
`;
// `;
class TripBudget extends Component {

  render() {
    console.log(this.props);
    return (
      <Container>
        {
          (this.props.info.isDictated) ?
            <ContainerBudget>
              Budget: {this.props.info.chosenBudget}
            </ContainerBudget>
          :
            <ContainerBudgets>
              <ContainerBudget>
                Decided budget : {(this.props.info.chosenBudget.value) ? this.props.info.chosenBudget.value : <span>Not yet decided</span>}
              </ContainerBudget>
              <ContainerSuggestions>
                Do the cool thing
              </ContainerSuggestions>
            </ContainerBudgets>
        }
        <MoreInfoButton>
          <img src={plus} alt="more info" height="20" width="20" onClick={this.props.redirectParent}/>
        </MoreInfoButton>
      </Container>
    );
  }
}

export default TripBudget;