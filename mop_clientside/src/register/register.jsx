import React, {Component} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css'
import { useForm } from "react-hook-form";

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            error: false,
            api: "http://localhost:3001/api/users"
        };
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.lastnameChange = this.lastnameChange.bind(this);
        this.submit = this.submit.bind(this);

    }
    
    emailChange(event) {
        
        this.setState({email: event.target.value});
      }
      passwordChange(event) {
        this.setState({password: event.target.value});
      }
      nameChange(event) { 
        this.setState({name: event.target.value});
      }
      lastnameChange(event) {
        this.setState({lastname: event.target.value});
      }
    
      async submit() {
        console.log(this.state);
        try{
          const response = await axios.post(this.state.api, {email: this.state.email, password: this.state.password, name: this.state.name, lastname: this.state.lastname})
          console.log(response);
        } catch(err) {
            this.setState({error: true});
        }
      }
 
    render() { 
        return <div className="reg-box">
          <div className="box">
        <Form className="content_custom ">
            <Form.Group controlId="name" >
            <Form.Label>Name</Form.Label>
            <Form.Control className="field" type="text" placeholder="Name" onChange={this.nameChange}/>
            <Form.Text className="text-muted" value="armin">
        </Form.Text>
    </Form.Group>
    <Form.Group controlId="Lastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control className="field" type="text" placeholder="Lastname" onChange={this.lastnameChange}/>
            <Form.Text className="text-muted">
        </Form.Text>
    </Form.Group>
        <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control className="field" type="email" placeholder="Enter email" onChange={this.emailChange}/>
            <Form.Text className="text-muted">
            <span style={{color: 'red'}} hidden={!this.state.emailValid}>Email invalid</span>
        </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className="field" type="password" placeholder="Password" required onChange={this.passwordChange}/>
        {/* <span style={{color: 'red'}} hidden={this.state.passwordValid}>Password must contain at least 5 characters</span> */}
    </Form.Group>
    <Button variant="primary" type="submit" onClick={this.submit}>
        Submit
    </Button>
    </Form>
    </div>
    </div>

}
}