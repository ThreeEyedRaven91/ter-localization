import React, { Component } from 'react';
import Select from 'react-select';
import {
  FormGroup, Col, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import API from '../../apis';

const customStyles = {
  control: base => ({
    ...base,
    borderColor: '#E3E7EA',
  }),
};

class Dropdown extends Component {
  constructor(props, context) {
    super(props, context);
    const { mapPropsToState } = props;

    this.state = {
      selectedValue: undefined,
      options: [],
      params: mapPropsToState ? mapPropsToState(props) : undefined,
      optionsCategory: [],
    };
  }

  async componentDidMount() {
    const { request, formValue, ...props } = this.props;
    const result1 = await API.categories.get();
    if (request) {
      const result = await request({
        ...props,
        formValue,
      });
      this.setState(prev => ({
        ...prev,
        options: result,
        optionsCategory: result1.data.items || [],
      }));
    }
  }

  async componentWillReceiveProps(nextProps) {
    const { mapPropsToState, request } = nextProps;
    const { params } = this.state;

    if (mapPropsToState && request) {
      const nextParams = mapPropsToState(nextProps);

      if (nextParams !== params) {
        const result = await request(nextProps);
        this.setState(prev => ({
          ...prev,
          options: result,
          params: nextParams,
        }));
      }
    }
  }


  onChangeText(text) {
    const { onChange } = this.props;

    if (onChange) {
      onChange(text);
    }

    this.setState({
      selectedValue: text,
    });
  }

  render() {
    const {
      title, leftCol, rightCol,
    } = this.props;
    const { formValue: { unit, category_id: categoryID }, input_key: inputKey } = this.props;
    const {
      options, optionsCategory,
    } = this.state;

    let value = {};
    switch (inputKey) {
      case 'unit':
        value = { label: unit, value: unit };
        break;
      case 'category_id': {
        const valueCategory = optionsCategory.filter(opt => opt.id === categoryID);
        const category = valueCategory && valueCategory[0] && valueCategory[0].name;
        value = { value: category, label: category };
      }
        break;
      default:
        break;
    }

    return (
      <FormGroup row>
        <Col md={leftCol} style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
          <Label style={{ fontWeight: 'bold' }} htmlFor="name">{title}</Label>
        </Col>
        <Col md={rightCol}>
          <Select
            styles={customStyles}
            options={options}
            onChange={selectedOption => this.onChangeText(selectedOption.value)}
            value={value}
          />
        </Col>
      </FormGroup>
    );
  }
}

export default Dropdown;

Dropdown.propTypes = {
  title: PropTypes.string,
  leftCol: PropTypes.number,
  rightCol: PropTypes.number,
  request: PropTypes.func,
  mapPropsToState: PropTypes.func,
  onChange: PropTypes.func,
  formValue: PropTypes.object,
  input_key: PropTypes.string.isRequired,
};

Dropdown.defaultProps = {
  title: '',
  leftCol: 4,
  rightCol: 8,
  request: false,
  mapPropsToState: null,
  onChange: null,
  formValue: null,
};
