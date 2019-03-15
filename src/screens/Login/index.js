import React, { Component } from 'react';
import {
  Button, Card, CardBody, Col, Container, Form, Row, Input
} from 'reactstrap';

const data = {
  email: 'benduong',
  password: '123456'
}

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(value, key){
    this.setState({[key]:value})
  }

  onSubmit(){ 
    const {history} = this.props
    const {email,password} = this.state;
    if(email === data.email && password === data.password){
      history.push({
        pathname:'/translation',
        state:{
          isSucessed: true
        }});
    }else{
      alert('wrong password or email')
    }
  }

  render(){
    const {email,password} = this.state
    return(
      <Container>
        <Row className="justify-content-center">
          <Card className="p-4">
            <CardBody>
              <Form onSubmit={event => this.onSubmit(event)}>
                <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Login</h1>
                <Row style={{ marginTop: 20 }}>
                  <Col>
                    <Input value={email} onChange={(e)=>this.onChangeInput(e.target.value,'email')} style={{ marginTop:10 }}/>
                    <Input type="password" value={password} onChange={(e)=>this.onChangeInput(e.target.value,'password')}style={{ marginTop:10 }}/>
                    <Button style={{marginTop:10}} id="LOGIN_BTN" block color="primary" className="px-4">Login</Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Row>
      </Container>
    )
  }
}

export default Login;