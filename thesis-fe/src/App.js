import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Guard from './components/guard/Guard';
import MyTripsPage from './components/pages/MyTrips_page';
import AuthPage from './components/pages/Auth_page';
import TripDetailsPage from './components/pages/TripDetails_page';
import ProfilePage from './components/pages/Profile_page';
import TripDetailsDestinationPage from './components/pages/TripDetailsDestination_page';
import TripDetailsParticipantsPage from './components/pages/TripDetailsParticipants_page';
import TripDetailsCalendarPage from './components/pages/TripDetailsCalendar_page';
import TripDetailsBudgetPage from './components/pages/TripDetailsBudget_page';
import { AddTripPage } from './components/pages/AddTripPage';
import { CreateTrip } from './components/container/MutationTest';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Guard exact path="/" component={MyTripsPage} />
            <Route path="/auth" component={AuthPage} />
            <Guard path="/mytrips" component={MyTripsPage} />
            <Guard exact path="/tripdetails/:id" component={TripDetailsPage} />
            <Guard path="/tripdetails/:id/destination" component={TripDetailsDestinationPage} />
            <Guard path="/tripdetails/:id/calendar" component={TripDetailsCalendarPage} />
            <Guard path="/tripdetails/:id/participants" component={TripDetailsParticipantsPage} />
            <Guard path="/tripdetails/:id/budget" component={TripDetailsBudgetPage} />
            <Guard path="/addtrip" component={AddTripPage} />
            <Guard path="/profile" component={ProfilePage} />
            <Guard path="/mutation" component={CreateTrip} />
            <Redirect to='/mytrips' />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
