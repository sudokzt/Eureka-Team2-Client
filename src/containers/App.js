import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Login from './Login';
import Search from './Search';
import Approached from './Approached';
import Matching from './Matching';
import MatchSucceeded from './MatchSucceeded';
import Talk from './Talk';
import PartnerProfile from './PartnerProfile';
import ZeroCrasherTutorial from './ZeroCrasherTutorial';
import ZeroCrasherLoading from './ZeroCrasherLoading';
import ZeroCrasher from './ZeroCrasher';
import ZeroCrasherPartnerInfo from './ZeroCrasherPartnerInfo';

// Set global variables to store ID and token.
window.USER_ID = null;
window.USER_TOKEN = null;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/approached" component={Approached} />
            <Route exact path="/matching" component={Matching} />
            <Route
              exact
              path="/match-succeeded/:id"
              component={MatchSucceeded}
            />
            <Route exact path="/talk/:id" component={Talk} />
            <Route
              exact
              path="/partner-profile/:id"
              component={PartnerProfile}
            />
            <Route
              exact
              path="/zero-crasher/tutorial"
              component={ZeroCrasherTutorial}
            />
            <Route
              exact
              path="/zero-crasher/loading"
              component={ZeroCrasherLoading}
            />
            <Route
              exact
              path="/zero-crasher/partner-info/:id"
              component={ZeroCrasherPartnerInfo}
            />
            <Route exact path="/zero-crasher/:id" component={ZeroCrasher} />
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
