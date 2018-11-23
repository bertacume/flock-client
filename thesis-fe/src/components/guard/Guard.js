import React, { Component } from 'react';
import MyTrips_page from '../container/MyTrips_page';

const GuardFactory = () => {
  const ComponentToRender = () => {
  return (<MyTrips_page/>) }
  const func = () => {
    return (
      class Guard extends Component {
      render () {
        console.log('b');
        console.log(ComponentToRender);
        return (
          <div>
          <h1>rest</h1>
          <ComponentToRender />
          </div>
        )
      }
      }

  )};
  return func;
  // return (ComponentToRender) => {
  // console.log('b');
  // return ( (() => {
  // class Guard extends Component {
  // render () {
  //   console.log('b');
  //   const Opa = <MyTrips_page/>
  //   console.log(this.props);
  //   return (
  //     <ComponentToRender />
  //   )
  // }
  // }})
  // )
}



export default GuardFactory;

