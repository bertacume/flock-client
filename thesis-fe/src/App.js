import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GuardFactory from './components/guard/GuardFactory';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={GuardFactory} />
          <Route exact path="/:first/" component={GuardFactory} />
          <Route exact path="/:first/:second" component={GuardFactory} />
          <Route path="/:first/:second/:third" component={GuardFactory} />
        </div>
      </Router>
    );
  }
}

export default App;
