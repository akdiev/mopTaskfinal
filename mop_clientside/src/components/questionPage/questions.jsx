import React, { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import './questions.css';
import ListGroup from 'react-bootstrap/listgroup';

export default class Questions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            body: '',
            author: '',
            onQuestion: '',
            postingError: false,
            questions: [{
                body:'',
                date: Date,
                postedBy: {},
                answers: [{}],
                _id: '',
        }],
            api: "http://localhost:3001/api/questions"

        };
        this.textFilling = this.textFilling.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.editAnswer = this.editAnswer.bind(this);
        this.deleteAnswer =this.deleteAnswer.bind(this);

    }
async componentDidMount() {
    try{
        this.setState({author: localStorage.getItem('userId')})
    const response = await axios.get(this.state.api);
    this.setState({questions: response.data.questions, loaded: true});
    } catch(err) {
    console.log(err);
}
}
textFilling(event) {
    console.log(event.target.id);
    this.setState({body: event.target.value, onQuestion: event.target.id});
}
editAnswer(event) {

}
deleteAnswer() {

}
async submitAnswer () {
    if(this.state.author) {
        const response = await axios.post('http://localhost:3001/api/answers/', {author: this.state.author, onQuestion: this.state.onQuestion, body: this.state.body})
        if(response.data) {
            const newAnswer = response.data;
         
            const newQuestionsObject = this.state.questions.map(question => {
                const newAnswersObject = [...question.answers];
         
                if(question._id === this.state.onQuestion) {
                    newAnswersObject.push(newAnswer)
                }
         
                return {...question, answers: newAnswersObject}
            })
            console.log(newQuestionsObject);
            this.setState({questions: newQuestionsObject});
    }
}
}   
render() {
    const {loaded, body, postingError} = this.state
    if(!loaded) {
        return <h1>Loading</h1>
      } return (<div>
      {this.state.questions.map((question) => (<div>
  <Card bg="light" className="proba" style={{ width: '25rem' }} key={question._id + "1"}>
      <Card.Body>
  <Card.Title key={question._id + "2"}>{question.postedBy.name}</Card.Title>
  <Card.Subtitle className="mb-2 text-muted" key={question._id + "4"}>Question:</Card.Subtitle>
  <Card.Text key={question._id + "3"}>{question.body}</Card.Text>
 </Card.Body>
 {question.answers.map((answer) => (
 <ListGroup.Item>{answer.body} {answer.author === this.state.author && <div id="wrapper"><button type="button" class="btn btn-warning btn-sm" onClick={this.editAnswer}>Edit</button><button type="button" class="btn btn-danger btn-sm" onClick={this.deleteAnswer}>delete</button></div>}
 
 </ListGroup.Item>))}

 <div className="input-group mb-3">
  <input type="text" className="form-control" id={question._id} placeholder="Post answer" aria-describedby="basic-addon2" onChange={this.textFilling} />
  <div className="input-group-append">
    <button className="btn btn-outline-secondary" type="button" onClick={this.submitAnswer} disabled={this.state.postingError}>Post</button>
  </div>
</div>
  </Card>
</div>

))}

  </div>)
}
}