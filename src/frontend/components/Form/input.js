import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      edited: false,
    };
  }

  onChangeText(text) {
    const { onChange } = this.props;
    this.setState({ edited: true });

    if (onChange) {
      if (text.trim().length === 0) {
        onChange(null);
      } else {
        onChange(text);
      }
    }
  }

  render() {
    const {
      title, validationResult, forceValidate,
      left_col: leftCol,
      right_col: rightCol,
      title_right: titleRight,
      input_key: inputKey,
      input_log: inputLog,
      ...other
    } = this.props;
    const { edited } = this.state;

    return (
      <FormGroup row>
        {title && (
          <Col md={leftCol} style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            <Label htmlFor="name">{title}</Label>
          </Col>
        )}
        <Col md={title ? rightCol : 12} lg={inputLog}>
          <Input
            className="form-control"
            {...other}
            onChange={event => this.onChangeText(event.nativeEvent.target.value)}
          />
          <ValidationError
            validationResult={validationResult}
            inputKey={inputKey}
            edited={edited}
            forceValidate={forceValidate}
          />
        </Col>
        <Col md={2} style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          {titleRight && (
            <Label style={{ fontWeight: 'bold', width: 30 }} htmlFor="name">{titleRight}</Label>
          )}
        </Col>
      </FormGroup>
    );
  }
}

const ValidationError = ({
  validationResult, inputKey, edited, forceValidate,
}) => {
  if (!edited && !forceValidate) {
    return null;
  }

  if (validationResult && validationResult.fields && validationResult.fields[inputKey]) {
    const messages = validationResult.fields[inputKey];
    return messages.map(message => (
      <p style={{ color: 'red', marginBottom: 0 }}>{message}</p>
    ));
  }

  return null;
};

export default Form;
Form.propTypes = {
  t: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
  left_col: PropTypes.number,
  right_col: PropTypes.number,
  input_key: PropTypes.string,
  validationResult: PropTypes.object,
  forceValidate: PropTypes.bool,
  title_right: PropTypes.string.isRequired,
  input_log: PropTypes.string.isRequired,
};

Form.defaultProps = {
  t: null,
  onChange: null,
  type: null,
  title: null,
  left_col: 4,
  right_col: 8,
  input_key: null,
  validationResult: null,
  forceValidate: false,
};
