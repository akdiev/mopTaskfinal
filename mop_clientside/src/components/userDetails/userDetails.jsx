import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import "./userDetails.css";
import { validateFields } from "../../validation";
import classnames from "classnames";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      questions: [{}],
      validated: false,
      name: "",
      lastname: "",
      email: {
        value: "",
        validateOnChange: false,
        error: "",
      },
      password: {
        value: "",
        validateOnChange: false,
        error: "",
      },
      submitCalled: false,
      allFieldsValidated: false,
    };
  }

  async componentDidMount() {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        "http://localhost:3001/api/users/" + userId
      );
      this.setState({ user: response.data });
      this.setState((state) => ({
        email: {
          ...state.email,
          value: response.data.email,
        },
        name: {
          ...state.name,
          value: response.data.name,
        },
        lastname: {
          ...state.lastname,
          value: response.data.lastname,
        },
        password: {
          ...state.password,
          value: response.data.password,
        },
      }));
      const questions = await axios.get(
        "http://localhost:3001/api/questions/" + userId
      );
      this.setState({ questions: questions.data.questions });
    } catch (err) {
      console.log(err);
    }
  }
  handleChange(validationFunc, evt) {
    const field = evt.target.name;
    const fieldVal = evt.target.value;
    this.setState((state) => ({
      [field]: {
        ...state[field],
        value: fieldVal,
        error: state[field]["validateOnChange"] ? validationFunc(fieldVal) : "",
      },
    }));
  }

  handleBlur(validationFunc, evt) {
    const field = evt.target.name;
    if (
      this.state[field]["validateOnChange"] === false &&
      this.state.submitCalled === false
    ) {
      this.setState((state) => ({
        [field]: {
          ...state[field],
          validateOnChange: true,
          error: validationFunc(state[field].value),
        },
      }));
    }
    return;
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { email, password, name, lastname } = this.state;
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);
    if ([emailError, passwordError].every((e) => e === false)) {
      this.setState({ allFieldsValidated: true });
      this.showAllFieldsValidated();
      const response = axios.put(
        "http://localhost:3001/api/users/" + this.state.user._id,
        {
          name: this.state.name.value,
          lastname: this.state.lastname.value,
          password: this.state.password.value,
          email: this.state.email.value,
        }
      );
    } else {
      this.setState((state) => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError,
        },
        password: {
          ...state.password,
          validateOnChange: true,
          error: passwordError,
        },
      }));
    }
  }

  showAllFieldsValidated() {
    setTimeout(() => {
      this.setState({ allFieldsValidated: false });
    }, 1500);
  }

  render() {
    const { email, password, allFieldsValidated } = this.state;
    if (!this.state.questions) {
      return <h1>You haven't posted a question yet!</h1>;
    } else {
      return (
        <div>
          <div className="box">
            <Form
              className="content_custom"
              onSubmit={(evt) => this.handleSubmit(evt)}
            >
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="field"
                  name="name"
                  type="text"
                  placeholder="Name"
                  defaultValue={this.state.name.value}
                  onChange={(evt) =>
                    this.handleChange(validateFields.validateName, evt)
                  }
                />
                <Form.Text className="text-muted" value="armin"></Form.Text>
                <Form.Control.Feedback></Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="Lastname">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  className={classnames("field", "form-control")}
                  type="text"
                  placeholder="Lastname"
                  defaultValue={this.state.lastname.value}
                  onChange={(evt) =>
                    this.handleChange(validateFields.validateLastname, evt)
                  }
                  name="lastname"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={classnames(
                    "field",
                    "form-control",
                    { "is-valid": email.error === false },
                    { "is-invalid": email.error }
                  )}
                  type="email"
                  placeholder="Enter email"
                  defaultValue={this.state.email.value}
                  onChange={(evt) =>
                    this.handleChange(validateFields.validateEmail, evt)
                  }
                  name="email"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue={this.state.password.value}
                  name="password"
                  placeholder="Password"
                  className={classnames(
                    "field",
                    "form-control",
                    { "is-valid": password.error === false },
                    { "is-invalid": password.error }
                  )}
                  onChange={(evt) =>
                    this.handleChange(validateFields.validatePassword, evt)
                  }
                  onBlur={(evt) =>
                    this.handleBlur(validateFields.validatePassword, evt)
                  }
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Password must contain at least 5 characters.
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      );
    }
  }
}
