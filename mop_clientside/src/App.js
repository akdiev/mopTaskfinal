import React from 'react';
import './App.css';
import ListUsers from './components/list-users/list-users';
import Login from './components/login/login';
import Register from './register/register';
import Questions from './components/questionPage/questions';
import {BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom';
import Homepage from './components/homepage/homepage';
import UserDetails from './components/userDetails/userDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import { useParams } from 'react-router';

// function User() {
//   let { id } = useParams();
//   let satroid = localStorage.getItem('userId');
//   console.log('id je', id)
//   return localStorage.getItem('userId');
// children={<User />}
// }


function App() {
  return (

<Router>
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="home">Moptask</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/questions">Question page</Nav.Link>
      <Nav.Link href="/profile/">Profile</Nav.Link>
    </Nav>
    <Form inline>
      <Button variant="outline-info" href="/login" onClick={Router.red}>Login</Button>
    </Form>
  </Navbar>
    {/* <Register /> */}
    {/* <Questions /> */}
    {/* <Login /> */}
          <Route path="/profile/">
            <UserDetails />
          </Route>
          <Route path="/users">
            <ListUsers />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/questions">
            <Questions />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Router>
  );
  
}

export default App;
