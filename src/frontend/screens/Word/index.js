import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import WordTable from "./table";
import API from '../../apis';

class WordScreen extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      data: {},
      loading: 0,
      loaded: false,
    };
  }

  async componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      loading: prevState.loading + 1,
    }));
    const result = await API.word.get();
    const { data } = result;
    this.setState(prevState => ({
      ...prevState,
      loading: prevState.loading - 1,
      data,
      loaded: true,
    }));
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { loading, loaded, data } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-language"></i> Translation
              </CardHeader>
              <CardBody>
                {loading > 0 && (<div>Loading</div>)}
                {loading == 0 && !loaded && (<div>Preparing</div>)}
                {loading == 0 && loaded && data && (<WordTable data={data} />)}
                {loading == 0 && loaded && !data && (<div>Not loaded</div>)}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default WordScreen;
