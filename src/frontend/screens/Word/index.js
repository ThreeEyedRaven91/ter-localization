import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Request from 'ter-request-wrapper/src/components/Request/index';

import { Header } from '../../components/index';
import WordTable from "./table";

class WordScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col>
              <Request url="/api/word">
                {({data, loading, loaded}) => {
                  if (loading) {
                    return <div>Loading</div>;
                  }
                  if (!loaded) {
                    return <div>Preparing</div>;
                  }
                  if (data) {
                    return (
                      <WordTable data={data} />
                    );
                  }

                  return <div>Not loaded</div>
                }}
              </Request>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default WordScreen;
