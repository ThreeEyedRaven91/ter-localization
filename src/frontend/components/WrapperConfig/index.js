import React from 'react';
import ServiceConfig from './service';

const wrapper = (Class) => class WrapperConfig extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this._ismounted = true;
    ServiceConfig.addListener(this.handleChange)
  }

  componentWillUnmount() {
    this._ismounted = false;
    ServiceConfig.removeListener(this.handleChange)
  }

  handleChange() {
    if (this._ismounted) {
      this.forceUpdate();
    }
  }

  render() {
    return (
      <Class {...this.props} config={ServiceConfig.getConfig()}>
        {this.props.children}
      </Class>
    )
  }
};

export default wrapper;