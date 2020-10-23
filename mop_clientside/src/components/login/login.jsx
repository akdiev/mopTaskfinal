import React, { Component } from "react";
import loginImg from "../../login-icon.png";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';
import './login.css';
import Alert from 'react-bootstrap/Alert'


class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: Boolean,
      api:"http://localhost:3001/api/users/",
      userToken: '',
      route: '',
      loginError: undefined
    };
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.submit = this.submit.bind(this);
    
    
    
  }

  emailChange(event) {
    this.setState({email: event.target.value});
  }
  passwordChange(event) {
    this.setState({password: event.target.value});
  }
  async submit() {
    console.log(this.state);
    try{
      const response = await axios.post(this.state.api + "login", {email: this.state.email, password: this.state.password})
      this.setState({userToken: response.data});
      const users = await axios.get(this.state.api);
      const user = users.data.users.find(x => x.email === this.state.email);
      localStorage.setItem('userToken', this.state.userToken);
      localStorage.setItem('userId', user._id);
      this.setState({error: false});
      if(this.state.userToken) {
        this.setState({route: '/home'});
      } else {
        this.setState({route: '/login', loginError: true})
        console.log(this.state.route);

      }
    } catch(err) {
        this.setState({error: true});
    }
  }
  render() {
    return (
      <div className="base-container content_custom">
        <div className="box">
        <div className="header header_new">Login</div>
     
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login_image" className="img"></img>
          </div>
        </div>
        <form>
          <div className="email field_new">
        <Form.Group controlId="email" >
            <Form.Label>Email address</Form.Label>
            <Form.Control className="field" type="email" placeholder="Enter email" required onChange={this.emailChange}/>
            <Form.Text className="text-muted">
        </Form.Text>
    </Form.Group>
    </div>
      <div className="password field_new">
    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className="field" type="password" placeholder="Password" required onChange={this.passwordChange}/>
    </Form.Group>
    </div>
    <span hidden={this.state.loginError != true}>Username or password incorrect</span>
    
    </form>
        <div className="footer">
          <Button type="button" className="btn" onClick={this.submit} href={this.state.route}>
            Login
          </Button>
        </div>        
        </div>
        <a href="/register" className="not-reg">No account? Register here!</a>

        <Alert variant="success" show={!this.state.error} transition={!this.state.error}>
  <Alert.Heading>You successfully logged in</Alert.Heading>
  
</Alert>
      </div>
    );
  }
}
export default Login ;
