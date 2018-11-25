import React, { Component } from 'react';
import MyTripsPage from '../apollo/MyTrips_page';
import AuthPage from '../apollo/Auth_page';
import TripDetailsPage from '../apollo/TripDetails_page';

const GuardFactory = (() => {
  if (!localStorage.getItem('logged')) {
  localStorage.setItem('logged','false');}
  const isLogged = (() => localStorage.getItem('logged'));
  let ComponentFiltered;
  const GuardCheck = (routerMethods) => {
    const ctx = routerMethods.match.params;
    if (!isLogged() || isLogged() === 'false') {
      localStorage.setItem('history1', ctx.first);
      localStorage.setItem('history2', ctx.second || '');
      ComponentFiltered = <AuthPage routerMethods={routerMethods}/>;
      localStorage.setItem('logged','true');
    }
    else {
      if (ctx.first === 'mytrips') {
        if (!ctx.second) ComponentFiltered = <MyTripsPage routerMethods={routerMethods}/>
        else {
        ComponentFiltered = <MyTripsPage routerMethods={routerMethods}/>;
        window.location.replace('http://localhost:3000/mytrips');
        }
      }
      else if (ctx.first === 'tripdetails') {
        if (ctx.second && !ctx.third) ComponentFiltered = <TripDetailsPage routerMethods={routerMethods} tripID={ctx.second}/>;
        else {
          ComponentFiltered = <MyTripsPage routerMethods={routerMethods}/>;
          window.location.replace('http://localhost:3000/mytrips');
        }
      }
      else {
        ComponentFiltered = <MyTripsPage />;
        window.location.replace('http://localhost:3000/mytrips');
      }
    }
  }
  const ComponentToRender = () => ComponentFiltered;
  const funcGuard = () => {
    return (
      class Guard extends Component {
        render () {
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

