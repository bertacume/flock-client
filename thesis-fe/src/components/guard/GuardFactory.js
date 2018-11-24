import React, { Component } from 'react';
import MyTrips_page from '../container/MyTrips_page';
import Auth_page from '../container/Auth_page'
import TripDetails_page from '../container/TripDetails_page';

const GuardFactory = (() => {
  if (!localStorage.getItem('logged')) {
  localStorage.setItem('logged','false');}
  const isLogged = (() => localStorage.getItem('logged'));
  let ComponentFiltered;
  const GuardCheck = (routerMethods) => {
    const ctx = routerMethods.match.params;
    console.log(ctx);
    if (!isLogged() || isLogged() === 'false') {
      localStorage.setItem('history1', ctx.first);
      localStorage.setItem('history2', ctx.second || '');
      ComponentFiltered = <Auth_page routerMethods={routerMethods}/>;
      localStorage.setItem('logged','true');
    }
    else {
      if (ctx.first === 'mytrips') {
        if (!ctx.second) ComponentFiltered = <MyTrips_page routerMethods={routerMethods}/>
        else {
        ComponentFiltered = <MyTrips_page routerMethods={routerMethods}/>;
        window.location.replace('http://localhost:3000/mytrips');
        }
      }
      else if (ctx.first === 'tripdetails') {
        if (ctx.second) ComponentFiltered = <TripDetails_page routerMethods={routerMethods}/>;
        else {
          ComponentFiltered = <MyTrips_page routerMethods={routerMethods}/>;
          window.location.replace('http://localhost:3000/mytrips');
        }
      }
      else {
        ComponentFiltered = <MyTrips_page />;
        window.location.replace('http://localhost:3000/mytrips');
      }
    }
  }
  const ComponentToRender = () => ComponentFiltered;
  const funcGuard = () => {
    return (
      class Guard extends Component {
        render () {
          console.log('a');
          GuardCheck(this.props);
          return (
            <ComponentToRender />
          )
        }
      }
    )
  };
  return funcGuard();
})();

export default GuardFactory;

