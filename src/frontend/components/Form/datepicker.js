import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  FormGroup,
  Label,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import './datepicker.css';
import moment from 'moment';

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
      if (text === undefined || text === null) {
        onChange('');
      } else if (text.length !== 0) {
        const valid = moment(text, 'YYYY-MM-DD', true).isValid();
        const year = moment(text, 'YYYY').year() < 10000;
        onChange(valid && year ? moment(text).format('YYYY-MM-DD') : new Date());
      }
    }
  }

  render() {
    const {
      title, validationResult, forceValidate,
      left_col: leftCol,
      right_col: rightCol,
      input_key: inputKey,
      value,
      ...other
    } = this.props;
    const { edited } = this.state;
    return (
      <FormGroup row>
        <Col md={leftCol} style={{ display: 'flex', alignItems: 'center' }}>
          <Label style={{ fontWeight: 'bold' }} htmlFor="name">{title}</Label>
        </Col>
        <Col md={rightCol}>
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <DatePicker
              className="form-control"
              {...other}
              selected={value}
              onChange={v => this.onChangeText(v)}
              showYearDropdown
              showMonthDropdown
              dateFormatCalendar="MMMM"
              scrollableYearDropdown
              dateFormat="yyyy-MM-dd"
              ref={(c) => { this.calendar = c; }}
            />
            <button
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                top: 7,
                right: 23,
                outline: 0,
                borderWidth: 0,
                backgroundColor: 'transparent',
              }}
              onClick={() => this.calendar.setFocus()}
              type="button"
              alt="calendar"
            >
              <img
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
                alt="true"
              />
            </button>
          </div>
          <ValidationError
            validationResult={validationResult}
            inputKey={inputKey}
            edited={edited}
            forceValidate={forceValidate}
          />
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
  value: PropTypes.any,
  input_key: PropTypes.string,
  validationResult: PropTypes.object,
  forceValidate: PropTypes.bool,
};

Form.defaultProps = {
  t: null,
  onChange: null,
  type: null,
  title: null,
  left_col: 4,
  right_col: 8,
  value: null,
  input_key: null,
  validationResult: null,
  forceValidate: false,
};
