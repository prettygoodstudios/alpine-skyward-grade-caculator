import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
//Screens
import LoginScreen from "./screens/login";


export default class App extends Component {
  render() {
    return (
      <div>
        <div className="push">
          <BrowserRouter>
            <Switch>
              <Route path="/" component={LoginScreen} />
            </Switch>
          </BrowserRouter>
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
