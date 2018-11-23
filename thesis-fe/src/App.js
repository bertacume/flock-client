import React, { Component } from 'react';
import Auth_page from './components/container/Auth_page';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyTrips_page from './components/container/MyTrips_page';
import TripDetails_page from './components/container/TripDetails_page';
import GuardFactory from './components/guard/GuardFactory';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Auth_page} />
          <Route path="/:first/:second" component={GuardFactory('mytrips')()} />
          {/* <Route path="/tripdetails/:iduser/:idtrip" component={Guard} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
