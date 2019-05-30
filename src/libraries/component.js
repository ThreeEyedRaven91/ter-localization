import React from 'react';
import TranslateService from './translate';

class LocalizationComponent extends React.Component {
  translationGroup = null;

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.t = this.t.bind(this);
    this.translate = this.translate.bind(this);
  }

  t(word) {
    if (this.translationGroup) {
      return TranslateService.t(this.translationGroup)(word);
    }
    return TranslateService.t('general')(word);
  }

  translate(group) {
    return TranslateService.t(group);
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
};

module.exports = LocalizationComponent;