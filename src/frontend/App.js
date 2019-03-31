import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import {
  WelcomeScreen,
  WordScreen,
  InstallScreen,
} from './screens';
import { WrapperConfig } from './components';
import ServiceConfig from './components/WrapperConfig/service';

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      ServiceConfig.download();
    }, 3000);
  }

  render() {
    const { config } = this.props;
    return (
      <HashRouter>
        <Switch>
          {!config && <Route path="/" name="Welcome" component={WelcomeScreen} />}
          {config && !config.storage_path && <Route path="/" name="Config" component={InstallScreen} />}
          {config && config.storage_path && <Route path="/" name="Word" component={WordScreen} />}
        </Switch>
      </HashRouter>
    );
  }
}

export default WrapperConfig(App);