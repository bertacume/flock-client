import React, { Component } from 'react';
import styled from 'react-emotion'
import plus from '../../assets/svg/plus.svg';

// const Container = styled('div')`
//   width: 100vw;
//   height: 90vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 5vh;
// `;

// const ContainerButton = styled('div')`
//   height: 10vh;
//   width:10vh;
//   margin-bottom: 2rem;
// `;

// const ContainerTrip = styled('div')`
//   padding: 1.5rem;
//   background-color: green;
//   height: 15vh;
//   width:80vw;
//   display: flex;
//   flex-direction: column;
//   margin: 1.5rem 0;
// `;


// const ContainerFriends = styled('div')`
//   display: flex;
//   width: 80vw;
//   flex-direction: row;
// `;

// const AddTripButton = styled('button')`
//   position: relative;
//   height: 100%;
//   width: 100%;
//   font-size: 4rem;
//   background-color: yellow;
//   border-radius: 100%;
//   display: flex;
//   justify-content: center;
//   align-item: center;
// `;


class MyTripsDashboard extends Component {

  redirectToTrip = (id) => {
    return () => {
      this.props.history.push('/tripdetails/' + id)
    }

  }
  render() {

    console.log(this.props);

    return (
      <h1>
        cALL
      </h1>
    );
  }
}

export default MyTripsDashboard;