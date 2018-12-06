import React, { Component } from 'react';
import styled from 'react-emotion';
import next from '../../assets/next.png';
import budget from '../../assets/budget_white.png'
import { palette } from '../../helpers/styleConstants';

class TripBudget extends Component {


  render() {
    return (
      <Container>
        <img src={budget} alt="logo" height="35" width="35"/>
        {
          (this.props.info.isDictated || this.props.info.isLocked) ?
            <ContainerBudget>
              Budget: {this.props.info.chosenSuggestion.value}
            </ContainerBudget>
          :
            <ContainerBudgets>
              <ContainerBudget>
                Budget : {(this.props.info.chosenBudget) ? this.props.info.chosenBudget.value : <span>Not yet decided</span>}
              </ContainerBudget>
            </ContainerBudgets>
        }
        <MoreInfoButton>
          <img src={next} alt="more info" height="30" width="30" onClick={this.props.redirectParent}/>
        </MoreInfoButton>
      </Container>
    );
  }
}

const Container = styled('div')`
box-sizing: border-box;
font-size: 1.25rem;
border-radius: 10px;
width: 90vw;
height: 20vh;
display: flex;
flex-direction:row;
align-items: center;
justify-content: space-between;
background: ${palette[2]};
margin-bottom 2vh;
padding-left: 2rem;
`
const ContainerBudget = styled('h1')`
font-size: 1.5rem;
margin-left:.25rem;
color: white;
`
const ContainerBudgets = styled('div')`
display: flex;
flex-direction: column;
`
const MoreInfoButton = styled('button')`
  margin-right: .25rem;
  position: relative;
  font-size: 2rem;
`

export default TripBudget;