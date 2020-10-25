import React, { Component } from "react";
import loginImg from "../../login-icon.png";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css';
import Alert from 'react-bootstrap/Alert'
import { validateFields } from '../../validation';
import classnames from 'classnames';
import { useHistory } from "react-router-dom";
import {Redirect} from 'react-router-dom';


export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: Boolean,
      api:"http://localhost:3001/api/users/",
      userToken: '',
      route: '',
      user: {},
      loginError: false,
      email: {
        value: '',
        validateOnChange: false,
        error: ''
      },
      password: {
        value: '',
        validateOnChange: false,
        error: ''
      },
      submitCalled: false,
      allFieldsValidated: false,
      redirect: false
    };

  }

  handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState(state => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
      }
    }));
  }

  handleBlur(validationFunc, evt) {
    
    const field = evt.target.name;
    if (
      this.state[field]['validateOnChange'] === false &&
      this.state.submitCalled === false
    ) {
      this.setState(state => ({
        [field]: {
          ...state[field],
          validateOnChange: true,
          error: validationFunc(state[field].value)
        }
      }));
    }
    return;
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = this.state;
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);
    console.log(this.state);
    if ([emailError, passwordError].every(e => e === false)) {

      this.setState({allFieldsValidated: true });
      this.showAllFieldsValidated();
      try{
        const response = await axios.post(this.state.api + "login", {email: this.state.email.value, password: this.state.password.value});
        this.setState({userToken: response.data});
        const users = await axios.get(this.state.api);
        const user = users.data.users.find(x => x.email === this.state.email.value);
        localStorage.setItem('userToken', this.state.userToken);
        localStorage.setItem('userId', user._id);
        this.setState({error: false, redirect: true});
    } catch(err) {
        this.setState({error: true, loginError: true});
    }

    } else {
      this.setState(state => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError
        },
        password: {
          ...state.password,
          validateOnChange: true,
          error: passwordError
        },
        loginError: true
      }));
    }
  }

  showAllFieldsValidated() {
    setTimeout(() => {
      this.setState({ allFieldsValidated: false });
    }, 1500);
  }

  render() {
    const { email, password, allFieldsValidated, redirect, loginError } = this.state;
    if(redirect && this.state.userToken) {
      return <Redirect to="home" />
    }else return (
      <div className="base-container content_custom">
        <div className="box">
        <div className="header header_new">Login</div>
        
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="login_image" className="img"></img>
          </div>
        </div>
        <Form className="content_custom" onSubmit={evt => this.handleSubmit(evt)}>
          <div className="email field_new">
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control className={classnames(
                    'field',
                    'form-control',
                    { 'is-valid': email.error === false },
                    { 'is-invalid': email.error }
                  )} type="email" placeholder="Enter email" onChange={evt =>
                    this.handleChange(validateFields.validateEmail, evt)
                  } name="email"/>
            <Form.Text className="text-muted">
            <Form.Control.Feedback type="invalid">Email is required field</Form.Control.Feedback>
        </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" className={classnames(
                    'field',
                    'form-control',
                    { 'is-valid': password.error === false },
                    { 'is-invalid': password.error }
                  )}
                  onChange={evt =>
                    this.handleChange(validateFields.validatePassword, evt)
                  }
                  onBlur={evt =>
                    this.handleBlur(validateFields.validatePassword, evt)
                  } />
    </Form.Group>
    </div>
    
    
        <div className="footer">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
        </Form>        
        </div>
        <a href="/register" className="not-reg">No account? Register here!</a>
        
        <Alert variant="success" show={!this.state.error} transition={!this.state.error}>
          <Alert.Heading>You successfully logged in</Alert.Heading>
        </Alert>
        <Alert variant="warning" show={this.state.loginError} transition={!this.state.error}>
          <Alert.Heading>Email or password incorrect!</Alert.Heading>
        </Alert>

      </div>
    );
  }
}
