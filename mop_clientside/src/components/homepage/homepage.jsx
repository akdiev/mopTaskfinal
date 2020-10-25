import React, { Component } from "react";
import axios from 'axios';

export default class Homepage extends Component {
    constructor(props){
        super(props)
        this.state = {
            hotQuestions: [{}],
    }
    }
    async componentDidMount() {
        try{
            const response = await axios.get('htto://localhost:3001/api/questions/?sortBy=upvotes');
            this.setState({hotQuestions: response.data.questions});
            console.log(response.data.hotQuestions);
            }
            catch(err) {
            console.log(err);
        }
    }
    render() {
        return <div>


        </div>
        }
}