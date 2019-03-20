import React, {Component} from 'react';
import {Input, Table} from 'reactstrap';

const getLanguages = (data) => {
  return Object.keys(data);
};

const styles = {
  key: {
    maxWidth: 200,
    wordWrap: 'break-word',
  },
  groupHeader: {
    backgroundColor: '#20a8d8',
    color: 'white',
    textAlign: 'center',
  },
};

class LanguageTable extends Component {
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
    const { data } = this.props;
    const languageCode = getLanguages(data)

    return (
      // <div>aaa</div>
      <Table striped hover>
        <thead>
        <tr>
          <th>#</th>
          <th>Code</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
          {languageCode.map((language, index) => (
            <React.Fragment>
              <tr>
                <td>{index}</td>
                <td>{language}</td>
                <td>{data[language]}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default LanguageTable;
