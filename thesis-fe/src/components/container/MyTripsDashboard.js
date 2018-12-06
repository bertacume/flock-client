import React, { Component } from 'react';
import styled from 'react-emotion'
import plus from '../../assets/plus-gradient.png';
import { Link } from "react-router-dom";
import { fontFamily } from '../../helpers/styleConstants';

class MyTripsDashboard extends Component {

  componentDidMount () {
    this.props.sub();
  }
  redirectToTrip = (id) => {
    return () => {
      this.props.history.push('/tripdetails/' + id)
    }
  }


  render() {

    const listTrips = this.props.info.map(obj => (
      <ContainerTrip onClick={this.redirectToTrip(obj.id)} key={obj.id}>
        <H1>{obj.name}</H1>
      </ContainerTrip>
    )
    )
    return (
      <Container>
        <ContainerButton>
          <Link to='/addtrip'>
            <Button ><ImgBtn src={plus} /></Button>
          </Link>
        </ContainerButton>
        <Trips>
        {listTrips}
        </Trips>
      </Container>
    );
  }
}

const Container = styled('div')`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContainerButton = styled('div')`
  height: 10vh;
  width:10vh;
  margin-bottom: 2rem;
`
const ContainerTrip = styled('div')`
  padding: 1.5rem;
  min-height: 50px;
  width:80vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0;
  background: #ff8e62;
  border-radius: 20px;
  color: white;

`
const Trips = styled('div')`
  overflow: scroll;
`

const H1 = styled('p')`
  font-size: 2rem;
  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`
const Button = styled('button')`
width: 20vw;
height: 10vh;
margin: 10px 0 20px 0;
border-width: 0;
border-color: #afafaf;
border-radius: 10px;
background-color: transparent;
font-family: ${fontFamily};
`
const ImgBtn = styled('img')`
  height: 80%;
`
export default MyTripsDashboard;