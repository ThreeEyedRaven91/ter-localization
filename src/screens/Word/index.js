import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
} from 'reactstrap';
import { ScaleLoader } from 'react-spinners';
import socketIOClient from "socket.io-client";
import { Header } from '../../components/index';
import WordTable from "./table";
import { create } from 'apisauce';
import './word.css'

const api = create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: 'no-cache',
  },
  timeout: 60000,
});

function onGetWordData(params = {}) { return api.get('/api/word', params); }

class WordScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      endpoint: 'localhost:5050',
      data: {},
      loading: false
    };
  }

  componentDidMount() {
    this.onGetWordData()
    this.listenSocket()
  }

  listenSocket() {
    const socket = socketIOClient(this.state.endpoint);
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
