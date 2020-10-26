import React, { Component } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import "./myQuestions.css";

export default class Myquestions extends Component {
  state = {
    questions: [{}],
  };

  async componentDidMount() {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        "http://localhost:3001/api/users/" + userId
      );
      this.setState({ user: response.data });
      const questions = await axios.get(
        "http://localhost:3001/api/questions/" + userId
      );
      this.setState({ questions: questions.data.questions });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (!this.state.user) {
      return <a href="/login">You are not logged in. Log in here</a>;
    } else {
      return (
        <div>
          {this.state.questions.map((userQuestions) => (
            <Card className="questionCard" key={userQuestions.postedBy}>
              <Card.Body>
                <Card.Title key={userQuestions._id}>Question:</Card.Title>

                <Card.Subtitle
                  className="mb-2 text-muted"
                  key={this.state.randomInt2}
                >
                  {userQuestions.body}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    }
  }
}
