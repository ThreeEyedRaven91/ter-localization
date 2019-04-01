import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Row } from 'reactstrap';
import { Form, WrapperConfig } from '../../components';
import template from './template';
import API from '../../apis';
import ServiceConfig from '../../components/WrapperConfig/service';

class Register extends Component {
  constructor(props, context) {
    super(props, context);
    const { config } = props;
    this.state = {
      data: {
        storage_path: config.storage_path,
        host: config.host,
        port: config.port,
        languages: config.languages.join(','),
        spreadsheet_id: config.spreadsheet_id,
        sheet_id: config.sheet_id,
      },
    };

    this.didPressDone = this.didPressDone.bind(this);
  }

  async didPressDone() {
    const {
      data: {
        storage_path,
        host,
        port,
        languages,
        spreadsheet_id,
        sheet_id,
      },
    } = this.state;
    const { history } = this.props;
    const result = await API.config.post({
      storage_path,
      host,
      port,
      languages,
      spreadsheet_id,
      sheet_id,
    });
    const { data: { code } } = result;

    if (code === 200) {
      await ServiceConfig.download();
      history.go('/translate');
    }
  }

  render() {
    const { data } = this.state;

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <h1>Setting</h1>
                <Form
                  template={template}
                  value={data}
                  onChange={({ key, value }) => {
                    this.setState(prevState => ({
                      ...prevState,
                      data: {
                        ...prevState.data,
                        [key]: value,
                      },
                    }));
                  }}
                />
              </CardBody>
              <CardFooter className="p-4">
                <Button color="primary" block onClick={this.didPressDone}>Save</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WrapperConfig(Register);
