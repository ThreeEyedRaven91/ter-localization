import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Row } from 'reactstrap';
import { Form } from '../../components';
import template from './template';
import API from '../../apis';
import ServiceConfig from '../../components/WrapperConfig/service';

class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {
        storage_path: 'localization',
        host: 'localhost',
        port: '5050',
        languages: 'en,fr,jp',
        spreadsheet_id: '',
        sheet_id: '',
      },
    };

    this.didPressDone = this.didPressDone.bind(this);
    this.didPressAuthorize = this.didPressAuthorize.bind(this);
    this.didPressUpload = this.didPressUpload.bind(this);
    this.didPressDownload = this.didPressDownload.bind(this);
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
    }
  }

  async didPressAuthorize() {
    const result = await API.sync.getAuthorizationUrl();
    const { data: { data } } = result;
    if (data && data.url) {
      window.location = data.url;
    }
  }

  async didPressUpload() {
    const result = await API.sync.upload();
  }

  async didPressDownload() {
    const result = await API.sync.download();
  }

  render() {
    const { data } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <h1>Setting</h1>
                <p className="text-muted">Setting spreadsheet and sheet which will be synced</p>
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
          <Col md="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <h1>Setup</h1>
                <p className="text-muted">Setup GDrive app and token</p>
                <Button color="primary" block onClick={this.didPressAuthorize}>Authorization</Button>
                <Button color="primary" block onClick={this.didPressUpload}>Upload</Button>
                <Button color="primary" block onClick={this.didPressDownload}>Download</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Register;
