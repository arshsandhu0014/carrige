import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { handelFormChange } from "../helper/methodhelper";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    role: "",
  };
  handelSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5555/auth/login", requestOptions)
      .then((response) => {
        if (response.status !== 200) this.props.history.push("/");
      })
      .then((result) => console.log("result", result))
      .catch((error) => console.log("error", error));
  };
  render() {
    if (this.state.loginattempt > 1) alert("login failed");
    return (
      <React.Fragment>
        <Container className="mt-3">
          <Card>
            <Card.Body>
              <Card.Title>Welcome! Please enter login details</Card.Title>
              <Form>
                <Form.Group
                  controlId="username"
                  onChange={handelFormChange.bind(this)}
                >
                  <Form.Label>User Name</Form.Label>
                  <Form.Control placeholder="Enter User Name" />
                </Form.Group>
                <Form.Group
                  controlId="password"
                  onChange={handelFormChange.bind(this)}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" />
                </Form.Group>
                <Link to="/home">
                  <Button
                    type="submit"
                    className="mr-3"
                    onClick={this.handelSubmit}
                  >
                    Submit
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button type="submit" variant="danger">
                    Register
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}
