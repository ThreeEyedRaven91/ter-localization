import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { ScaleLoader } from 'react-spinners';
import socketIOClient from "socket.io-client";
import { Header } from '../../components/index';
import WordTable from "./table";
import './word.css';
import { onGetWordData } from '../../api/api';
import { endpoint } from '../../helpers/configs';

class WordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      endpoint: endpoint,
      data: {},
      loading: false
    };
  }

  componentDidMount() {
    this.onGetWordData()
    this.listenSocket()
  }

  listenSocket() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('change word', (col) => {
      this.onGetWordData()
    })
  }

  async onGetWordData() {
    this.setState({ loading: true })
    try {
      const wordData = await onGetWordData()
      if (wordData.ok) {
        this.setState({ data: wordData.data, loading: false })
      }
    } catch (e) {
      this.setState({ loading: false })
    }
  }

  render() {
    const { loading, data } = this.state;
    return (
      <div>
        <div className="sweet-loading">
          <ScaleLoader
            sizeUnit="px"
            size={150}
            color="#123abc"
            loading={loading}
          />
        </div>
        <Header />
        <Container>
          <Row>
            <Col>
              <WordTable data={data} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default WordScreen;
