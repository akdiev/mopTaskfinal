import React, { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './homepage.css';
import {GrLike} from 'react-icons/gr';

export default class Homepage extends Component {
    constructor(props){
        super(props)
        this.state = {
            hotQuestions: [{}],
            loaded:false
    }
    }
    async componentDidMount() {
        try{
            const response = await axios.get('http://localhost:3001/api/questions/?sortBy=upvotes');
            console.log(response.data);
            this.setState({hotQuestions: response.data.sortedQuestions, loaded: true});
            }
            catch(err) {
            console.log(err);
            this.like = this.like.bind(this);
        }
    }
    like(event) {
        console.log('event', event.target.id);
    }
    render() {
        const {loaded} = this.state
        if(!this.state.loaded) {
        return <h1>'Loading...'</h1>
        }
        return <div>
            <h1>Hot questions:</h1>
            {this.state.hotQuestions.map((question) => (<div>
                <Card bg="light" className="proba" style={{ width: '25rem' }} key={question._id + "1"}>
      <Card.Body>
  <Card.Title key={question._id + "2"}>{question.postedBy.name}</Card.Title>
  <Card.Subtitle className="mb-2 text-muted" key={question._id + "4"}>Question:</Card.Subtitle>
  <Card.Text key={question._id + "3"}>{question.body} <GrLike id={question._id} onClick={this.like}/></Card.Text>
 </Card.Body>
  </Card>
</div>))}
{this.state.hotQuestions.length > 19? <Button type="button" className="btn btn-secondary">Load more</Button>: '' }

</div>        
}
}