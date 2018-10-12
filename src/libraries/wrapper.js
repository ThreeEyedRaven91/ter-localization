import React from 'react';
import TranslateService from './translate';

const wrapper = (group) => (Class) => class TERLocalizationWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    TranslateService.addListener(this.handleChange)
  }

  componentWillUnmount() {
    TranslateService.removeListener(this.handleChange)
  }

  handleChange() {
    this.forceUpdate();
  }

  render() {
    return (
      <Class {...this.props} t={TranslateService.t(group)} translate={TranslateService.t}>
        {this.props.children}
      </Class>
    )
  }
};

module.exports = wrapper;