import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { WordScreen } from './screens';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" name="Home" component={WordScreen} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
