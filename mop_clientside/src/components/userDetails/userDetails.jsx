import React, { Component } from "react";
import axios from 'axios';
import { Form, Button, Card } from "react-bootstrap";
import './userDetails.css';

export default class UserDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            api: 'http://localhost:3001/api/users/',
            newPassword: '',
            newEmail: '',
            userQuestions: []
        }
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }
    
    async componentDidMount() {
        try{
        const userId = localStorage.getItem('userId')
        const response = await axios.get(this.state.api );
        const user = response.data.users.find(x => x._id === userId);
        this.setState({user: user});
        console.log('ovoo user', this.state.user);

        const questions = await axios.get('http://localhost:3001/api/questions/' + userId);
        console.log('nova pitanja', questions);
        const userQuestions = questions.data.questions.find(x => x.postedBy === userId);
        console.log("korisnikova", userQuestions);
        console.log('ovo pitanja', userQuestions);
        this.setState({userQuestions: userQuestions})
        
    } catch(err) {
        console.log(err);
    }
    }
    updateUser() {
        axios.post(this.state.api + this.state.user._id,{name: this.state.user.name, lastname: this.state.user.lastname, password: this.state.newPassword, email: this.state.newPassword} )
    }
    emailChange(event) {
        
        this.setState({email: event.target.value});
      }
      passwordChange(event) {
        this.setState({password: event.target.value});
      }

    render(){
        return <div>
        <Form>
        <Form.Row>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control readOnly value={this.state.user.name} />
            </Form.Group>

            <Form.Group controlId="lastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control readOnly value={this.state.user.lastname} />
            </Form.Group>
        </Form.Row>
            <Form.Row>
    <Form.Group  controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder={this.state.user.email} onChange={this.emailChange}/>
    </Form.Group>

    <Form.Group controlId="password">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Change password" onChange={this.passwordChange}/>
    </Form.Group>
  </Form.Row>

  <Button variant="primary" type="submit" onClick={this.updateUser}>
    Save changes
  </Button>
  
</Form>
<label>List of my questions :</label>
{this.state.userQuestions.map((question) => (
    <Card className="proba" style={{ width: '18rem' }} key={question.postedBy}>
        <Card.Body>
    <Card.Title key={this.state.randomInt}>{question.postedBy.name}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted" key={question._id}>Question:</Card.Subtitle>
    <Card.Text key={this.state.randomInt2}>{question.body}</Card.Text>
   </Card.Body>
    </Card>
))}
        </div>
        }
}