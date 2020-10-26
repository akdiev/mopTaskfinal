import React, { Component } from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './homepage.css';
import Moment from 'react-moment';
import 'moment-timezone';
import './homepage.css'

export default class Homepage extends Component {
    constructor(props){
        super(props)
        this.state = {
            hotQuestions: [{}],
            users: [{name: '',
        lastname: '',
    email: '',
password:'',
numberOfPostedAnswers: Number}],
            loaded:false,
            itemsListed: 20,
            examplelist:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
    };
    this.loadMore = this.loadMore.bind(this);
    }
    async componentDidMount() {
        try{
            const response = await axios.get('http://localhost:3001/api/questions/?sortBy=upvotes');
            this.setState({hotQuestions: response.data.sortedQuestions, loaded: true});

            }
            catch(err) {
            console.log(err);
            
        }
    }
    loadMore () {
        this.setState((prev) => {
            return {itemsListed: prev.itemsListed + 20};
        });
    }
    
    render() {
        const {loaded} = this.state
        if(!this.state.loaded) {
        return <h1>'Loading...'</h1>
        }
        return <div>
            <Card bg="light">
                <Card.Title className="hot-title" style={{ width: '25rem' }}>Hot questions</Card.Title>
            </Card>
            {this.state.hotQuestions.slice(0, this.state.itemsListed).map((question, index) => {
                return (<div>
                    <Card bg="light" className="proba" style={{ width: '25rem' }} key={question._id + "1"}>
          <Card.Body>
      <Card.Title key={question._id + "2"}>{question.postedBy.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted" key={question._id + "4"}><Moment>{question.date}</Moment></Card.Subtitle>
      <Card.Text key={question._id + "3"}>Question: {question.body}</Card.Text>
      <Card.Text className="mb-2 text-muted" key={question.upvotes + "4"}>Like count: {question.upvotes===null? 0 : question.upvotes}</Card.Text>
     </Card.Body>
      </Card>
    </div>);
            })}
            {this.state.itemsListed < this.state.hotQuestions.length && <Button type="button" className="btn btn-secondary" onClick={this.loadMore}>Load more</Button>}


</div>        
}
}