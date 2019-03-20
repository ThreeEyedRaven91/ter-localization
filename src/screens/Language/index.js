import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form, FormGroup, Label, Input
} from 'reactstrap';
import Request from 'ter-request-wrapper/src/components/Request/index';

import { Header } from '../../components/index';
import LanguageTable from "./table";
import CreateForm from './CreateForm';
import { getLanguage } from '../../api/language';

class Language extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
    this.state = {
      isOpen: false,
      data: {}
    };
  }
  componentDidMount() {
    this.getLanguage()
  }

  async getLanguage() {
    const data = await getLanguage();
    this.setState({
      data: data.data
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { history } = this.props;
    const { data } = this.state;
    return (
      <div>
        <Header />
        <Container>
          <CreateForm
            getLanguage={this.getLanguage}
          /> 
          <Row>
            <Col>
              <LanguageTable data={data} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Language;
