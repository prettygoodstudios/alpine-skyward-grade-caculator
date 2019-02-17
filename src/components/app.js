import React, { Component } from 'react';
import {Router, Switch, Route} from 'react-router-dom';
//History
import history from "../../history.js";
//Screens
import LoginScreen from "./screens/login";
import GradesScreen from './screens/grades.js';


export default class App extends Component {
  render() {
    return (
      <div>
        <div className="push">
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={LoginScreen} />
              <Route path="/grades" component={GradesScreen} />
            </Switch>
          </Router>
        </div>
        <div className="footer">
          <h3>Alpine School District</h3>
          <h5>Grade Calculator</h5>
          <p>V1.0 - Miguel Rust</p>
        </div>
      </div>
    );
  }
}
