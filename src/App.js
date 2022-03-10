import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route exact path="/Project-trybewallet" component={ Login } />
      </Switch>
    );
  }
}

export default App;
