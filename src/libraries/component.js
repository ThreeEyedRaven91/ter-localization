import React from 'react';
import TranslateService from './translate';

class LocalizationComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();
    this._ismounted = true;
    TranslateService.addListener(this.handleChange)
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this._ismounted = false;
    TranslateService.removeListener(this.handleChange)
  }

  handleChange() {
    if (this._ismounted) {
      this.forceUpdate();
    }
  }

  render() {
    if (this.translationGroup === undefined) {
      return (
        <Class {...this.props} t={TranslateService.t} translate={TranslateService.t}>
          {this.props.children}
        </Class>
      )
    }

    return (
      <Class {...this.props} t={TranslateService.t(this.translationGroup)} translate={TranslateService.t}>
        {this.props.children}
      </Class>
    )
  }
};

module.exports = LocalizationComponent;