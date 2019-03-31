import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import {
  WelcomeScreen,
  InstallScreen,
} from './screens';
import { WrapperConfig, Layout } from './components';
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
          {config && config.storage_path && <Route path="/" name="Localization" component={Layout} />}
        </Switch>
      </HashRouter>
    );
  }
}

export default WrapperConfig(App);