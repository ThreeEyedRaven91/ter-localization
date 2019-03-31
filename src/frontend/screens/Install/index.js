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
      },
    } = this.state;
    const result = await API.config.post({
      storage_path,
      host,
      port,
      languages,
    });
    const { data: { code } } = result;

    if (code === 200) {
      await ServiceConfig.download();
    }
  }

  render() {
    const { data } = this.state;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Getting started</h1>
                  <p className="text-muted">Setup for new project</p>
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
                  <Button color="success" block onClick={this.didPressDone}>Done. Set it up!</Button>
                </CardBody>
                <CardFooter className="p-4">
                  <p className="text-muted">or just give it a fuck and click here</p>
                  <Button color="primary" block onClick={this.didPressDone}>I don't care, just continue</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
