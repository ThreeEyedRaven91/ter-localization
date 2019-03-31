import React, {Component} from 'react';
import {Input, Table} from 'reactstrap';

const getLanguages = (data) => {
  return Object.keys(data);
};

const getGroups = (data) => {
  const languages = getLanguages(data);
  return languages.reduce((total, current) => {
    const language = data[current];
    if (language) {
      const keys = Object.keys(language);
      keys.map(key => {
        if (total.every(element => element !== key)) {
          total.push(key);
        }
      });
    }
    return total;
  }, []);
};

const getKeys = (data, group) => {
  const languages = getLanguages(data);
  return languages.reduce((total, current) => {
    const language = data[current];
    if (language) {
      const keys = Object.keys(language[group]);
      keys.map(key => {
        if (total.every(element => element !== key)) {
          total.push(key);
        }
      });
    }
    return total;
  }, []);
};

const updateWord = async ({ group, key, language, word }) => {
  await fetch('/api/word', {
    body: JSON.stringify({
      group,
      key,
      language,
      word,
    }),
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
  });
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

class WordTable extends Component {
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
    const languages = getLanguages(data);
    const groups = getGroups(data);

    return (
      <Table striped hover>
        <thead>
        <tr>
          <th>#</th>
          {languages.map(language => (
            <th key={language}>{language}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {groups.map(group => (
          <React.Fragment key={group}>
            <tr>
              <th scope="row" colSpan={languages.length + 1} style={styles.groupHeader}>{group}</th>
            </tr>
            {getKeys(data, group).map(key => (
              <tr key={key}>
                <th scope="row" style={styles.key}>{key}</th>
                {languages.map(language => (
                  <td key={language}>
                    <Input
                      defaultValue={data[language][group][key]}
                      onBlur={(event) => updateWord({
                        word: event.target.value,
                        group,
                        language,
                        key,
                      })}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </React.Fragment>
        ))}
        </tbody>
      </Table>
    );
  }
}

export default WordTable;
