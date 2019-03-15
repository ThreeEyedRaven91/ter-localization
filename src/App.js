import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { WordScreen, Login } from './screens';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/translation" name="TranslationScreen" component={WordScreen} />
          <Route path="/" name="Home" component={Login} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
