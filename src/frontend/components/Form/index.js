import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import Input from './input';
import Dropdown from './dropdown';
import DatePicker from './datepicker';

class Form extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prev => ({
      ...prev,
      value: {
        ...prev.value,
        ...nextProps.value,
      },
    }));
  }

  onChange(key, value) {
    if (key) {
      this.setState(prev => ({
        value: {
          ...prev.value,
          [key]: value,
        },
      }));

      const { onChange } = this.props;
      if (onChange) {
        onChange({ key, value });
      }
    }
  }

  render() {
    const { template: { elements }, validationResult, forceValidate } = this.props;
    const { value } = this.state;

    return (
      <Row>
        {elements.map((element) => {
          switch (element.type) {
            case 'select':
              return (
                <Col xs={element.col || 12}>
                  <Dropdown
                    {...element}
                    key={element.input_key}
                    value={value[element.input_key]}
                    formValue={value}
                    onChange={text => this.onChange(element.input_key, text)}
                  />
                </Col>
              );
            case 'datepicker':
              return (
                <Col xs={element.col || 12}>
                  <DatePicker
                    {...element}
                    key={element.input_key}
                    value={value[element.input_key]}
                    formValue={value}
                    onChange={text => this.onChange(element.input_key, text)}
                  />
                </Col>
              );
            default:
              return (
                <Col xs={element.col || 12}>
                  <Input
                    {...element}
                    title={element.title ? element.title : ''}
                    key={element.input_key}
                    value={value[element.input_key]}
                    onChange={text => this.onChange(element.input_key, text)}
                    validationResult={validationResult}
                    forceValidate={forceValidate}
                  />
                </Col>
              );
          }
        })}
      </Row>
    );
  }
}

export default Form;

Form.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  template: PropTypes.object,
  validationResult: PropTypes.object,
  forceValidate: PropTypes.object,
};

Form.defaultProps = {
  onChange: null,
  value: null,
  template: null,
  validationResult: null,
  forceValidate: false,
};
