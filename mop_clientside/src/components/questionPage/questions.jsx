import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./questions.css";
import ListGroup from "react-bootstrap/listgroup";
import { GrLike } from "react-icons/gr";
import Moment from "react-moment";
import "moment-timezone";

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      body: "",
      author: "",
      onQuestion: "",
      postingError: false,
      edit: false,
      editedAnswer: {},
      questions: [
        {
          body: "",
          date: Date,
          postedBy: {},
          answers: [{}],
          _id: "",
          upvotes: [],
        },
      ],
      api: "http://localhost:3001/api/questions",
    };
    this.textFilling = this.textFilling.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.editMode = this.editMode.bind(this);
    this.submitEditedAnswer = this.submitEditedAnswer.bind(this);
  }
  async componentDidMount() {
    try {
      const response = await axios.get(this.state.api);
      this.setState({ questions: response.data.questions, loaded: true });
      if (localStorage.getItem("userId")) {
        this.setState({ author: localStorage.getItem("userId") });
      } else {
        this.setState({ postingError: true });
      }
    } catch (err) {
      console.log(err);
    }
  }
  textFilling(event) {
    this.setState({ body: event.target.value, onQuestion: event.target.id });
  }

  async deleteAnswer(answer) {
    const response = await axios.delete(
      "http://localhost:3001/api/answers/" + answer._id
    );

    const idQuestion = answer.onQuestion;

    if (response.data) {
      const newQuestionsObject = this.state.questions.map((question) => {
        const newAnswersObject = question.answers.filter(
          (answer) => answer._id !== idQuestion
        );
        return { ...question, answers: newAnswersObject };
      });
      this.setState({ questions: newQuestionsObject });
    }
  }
  async like(question) {
    const increasedUpvote = question.upvotes + 1;
    const like = await axios.put(
      "http://localhost:3001/api/questions/" + question._id,
      { upvotes: increasedUpvote }
    );
  }
  async submitAnswer() {
    if (this.state.author) {
      const response = await axios.post("http://localhost:3001/api/answers/", {
        author: this.state.author,
        onQuestion: this.state.onQuestion,
        body: this.state.body,
      });
      if (response.data) {
        const newAnswer = response.data.answer;

        const newQuestionsObject = this.state.questions.map((question) => {
          const newAnswersObject = [...question.answers];

          if (newAnswer.onQuestion === question._id) {
            newAnswersObject.push(newAnswer);
          }

          return { ...question, answers: newAnswersObject };
        });

        this.setState({ questions: newQuestionsObject });
      }
    }
  }
  async submitEditedAnswer(answer) {
    const response = await axios.put(
      "http://localhost:3001/api/answers/" + this.state.editedAnswer._id,
      { body: this.state.body }
    );
    if (response.data) {
      const newAnswer = response.data;

      const newQuestionsObject = this.state.questions.map((question) => {
        const newAnswersObject = [...question.answers];

        if (newAnswer.onQuestion === question._id) {
          newAnswersObject.filter((x) => x._id !== newAnswer._id);
          newAnswersObject.push(newAnswer);
        }

        return { ...question, answers: newAnswersObject };
      });

      this.setState({ questions: newQuestionsObject });
    }
  }
  editMode(answer) {
    this.setState({ edit: true, editedAnswer: answer });
  }
  render() {
    const { loaded, postingError, edit, body } = this.state;
    if (!loaded) {
      return <h1>Loading</h1>;
    }
    return (
      <div>
        {this.state.questions.map((question) => (
          <div>
            <Card
              bg="light"
              className="proba"
              style={{ width: "25rem" }}
              key={question._id + "1"}
            >
              <Card.Body>
                <Card.Title key={question._id + "2"}>
                  {question.postedBy.name}
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 text-muted"
                  key={question._id + "4"}
                >
                  Date: <Moment>{question.date}</Moment>
                </Card.Subtitle>
                <Card.Text key={question._id + "3"}>
                  Question: {question.body}{" "}
                  <GrLike
                    id={question._id}
                    onClick={() => this.like(question)}
                  />
                </Card.Text>
              </Card.Body>
              {question.answers.map((answer) => (
                <ListGroup.Item>
                  {answer.body}{" "}
                  {answer.author === this.state.author && (
                    <div id="wrapper">
                      <button
                        type="button"
                        className="btn btn-warning btn-sm"
                        onClick={() => this.editMode(answer)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.deleteAnswer(answer)}
                      >
                        delete
                      </button>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
              <div className="input-group mb-3">
                {edit === false ? (
                  <div className="card-div">
                    <input
                      type="text"
                      className="form-control"
                      id={question._id}
                      placeholder="Post answer"
                      aria-describedby="basic-addon2"
                      onChange={this.textFilling}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.submitAnswer}
                        disabled={postingError}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="card-div">
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={this.state.editedAnswer.body}
                      id={question._id}
                      placeholder="Edit answer"
                      aria-describedby="basic-addon2"
                      onChange={this.textFilling}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.submitEditedAnswer}
                        disabled={postingError}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}
