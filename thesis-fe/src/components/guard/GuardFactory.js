import React, { Component } from 'react';
import MyTripsPage from '../pages/MyTrips_page';
import AuthPage from '../pages/Auth_page';
import TripDetailsPage from '../pages/TripDetails_page';
import ProfilePage from '../pages/Profile_page';
import TripDetailsDestinationPage from '../pages/TripDetailsDestination_page';
import TripDetailsParticipantsPage from '../pages/TripDetailsParticipants_page';
import { baseURL } from '../../helpers/constants'

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
      localStorage.setItem('id',0);
    }
    else {
      if (ctx.first === 'mytrips') {
        if (!ctx.second) ComponentFiltered = <MyTripsPage routerMethods={routerMethods}/>
        else {
        ComponentFiltered = <MyTripsPage routerMethods={routerMethods}/>;
        window.location.replace(baseURL + '/mytrips');
        }
      }
      else if (ctx.first === 'profile') {
        if (!ctx.second) ComponentFiltered = <ProfilePage routerMethods={routerMethods}/>
        else {
        ComponentFiltered = <MyTripsPage routerMethods={routerMethods}/>;
        window.location.replace(baseURL + '/mytrips');
        }
      }
      else if (ctx.first === 'tripdetails') {
        if (ctx.second && !ctx.third) ComponentFiltered = <TripDetailsPage routerMethods={routerMethods} tripID={ctx.second}/>;
        else if (ctx.third) {
          if (ctx.third === 'destination') {
            ComponentFiltered = <TripDetailsDestinationPage routerMethods={routerMethods} tripID={ctx.second} />
          }
          else if (ctx.third === 'participants') {
            ComponentFiltered = <TripDetailsParticipantsPage routerMethods={routerMethods} tripID={ctx.second} />
          }
        }
        else {
          ComponentFiltered = <MyTripsPage routerMethods={routerMethods}/>;
          window.location.replace(baseURL + '/mytrips');
        }
      }
      else {
        ComponentFiltered = <MyTripsPage />;
        window.location.replace(baseURL + '/mytrips');
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

