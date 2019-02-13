import React from 'react';
import TranslateService from './translate';

const wrapper = (group) => (Class) => class TERLocalizationWrapper extends React.Component {
  isMounted = true;

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._ismounted = true;
    TranslateService.addListener(this.handleChange)
  }

  componentWillUnmount() {
    this._ismounted = false;
    TranslateService.removeListener(this.handleChange)
  }

  handleChange() {
    if (this._ismounted) {
      this.forceUpdate();
    }
  }

  render() {
    if (group === undefined) {
      return (
        <Class {...this.props} t={TranslateService.t} translate={TranslateService.t}>
          {this.props.children}
        </Class>
      )
    }

    return (
      <Class {...this.props} t={TranslateService.t(group)} translate={TranslateService.t}>
        {this.props.children}
      </Class>
    )
  }
};

module.exports = wrapper;