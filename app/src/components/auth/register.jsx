import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { handelFormChange } from "../helper/methodhelper";

export default class RegisterUser extends Component {
  state = {
    username: "",
    password: "",
    confirmpassword: "",
  };
  handelSubmit = () => {
    if (this.state.password === this.state.confirmpassword) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        role: "user",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:5555/auth/register", requestOptions)
        .then((response) =>
          response.status === 200 ? (
            <Redirect to="/auth/login" />
          ) : (
            console.log(response)
          )
        )
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } else {
      alert("Password is not matching");
    }
  };
  render() {
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
                <Form.Group
                  controlId="confirmpassword"
                  onChange={handelFormChange.bind(this)}
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-Enter Password"
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="mr-3"
                  onClick={this.handelSubmit}
                >
                  Submit For Approval
                </Button>
                <Link to="/">
                  <Button type="submit" variant="danger">
                    Cancel
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
