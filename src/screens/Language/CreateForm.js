import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form, FormGroup, Label, Input
} from 'reactstrap';
import './index.css'

class CreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowForm: false,
      languageCode: '',
      languageName: '',
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createLanguage = this.createLanguage.bind(this);
  }

  toggleForm() {
    this.setState((prevState) => ({
      isShowForm: !prevState.isShowForm
    }))
  }

  handleChange(name) {
    return (e) => {
      this.setState({
        [name]: e.target.value
      })
    }
  }

  async createLanguage() {
    const { languageCode, languageName } = this.state;
    const {  getLanguage } = this.props
    if (languageCode.trim().length > 0 && languageName.trim().length > 0) {
      const data = await fetch('http://localhost:5050/api/language', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          languageCode,
          languageName
        })
      }).then((response) => response.json());
      if (data.isSuccess) {
        this.setState({
          languageCode: '',
          languageName: '',
        }, () => {
          alert(data.message)
          getLanguage()
        })
      } else {
        alert(data.error)
      }
    } else {
      alert('Can not create language')
    }
  }

  render() {
    const { isShowForm, languageCode, languageName } = this.state;
    return (
      <Row className="language__row__add-new">
        <div>
          {!isShowForm && <Button color="primary" onClick={this.toggleForm}>Add new language</Button>}
          <div>
            {isShowForm && 
              <Form>
                <FormGroup>
                  <Label for="exampleEmail">Language Code</Label>
                  <Input value={languageCode} type="text" placeholder="Enter Language Code" onChange={this.handleChange('languageCode')}/>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Language Name</Label>
                  <Input value={languageName} type="text" placeholder="Enter Language Name" onChange={this.handleChange('languageName')} />
                </FormGroup>
                <Button className="language__btn language__btn--add" onClick={this.createLanguage} color="primary">Add</Button>
                <Button className="language__btn language__btn--cancel" onClick={this.toggleForm}>Cancel</Button> 
              </Form>
            }
          </div>
        </div>
      </Row>      
    )
  }
}

export default CreateForm;