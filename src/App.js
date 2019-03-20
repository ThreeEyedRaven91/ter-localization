import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { WordScreen } from './screens';
import Language from './screens/Language';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" name="Home" component={WordScreen} />
          <Route exact path="/language" name="Home" component={Language} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
