import React, { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import './questions.css';

export default class Questions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [{
                body:'',
                date: Date,
                postedBy: {},
                randomInt: Math.random(),
                randomInt2: Math.random(),
                randomInt2: Math.random(),
        }],
            api: "http://localhost:3001/api/questions"

        };
    }
async componentDidMount() {
    try{
    const response = await axios.get(this.state.api);
    this.setState({questions: response.data.questions});
    console.log(response.data.questions);
    } 
    catch(err) {
    console.log(err);
}
}
render() {
    return <div>
        {this.state.questions.map((question) => (
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