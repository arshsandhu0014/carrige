import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Nav, Col } from "react-bootstrap";

export default class Sidepanel extends Component {
  state = {
    url: this.props.url,
  };
  render() {
    const tabs = this.props.links.map((item) => (
      <Nav.Item id={item.id}>
        <Link to={this.state.url + item.link}>
          <Button className="mt-2" variant="primary" block>
            {item.name}
          </Button>
        </Link>
      </Nav.Item>
    ));
    return (
      <React.Fragment>
        <Container className="mt-3 ml-2 mr-2" fluid="true">
          <div className="nav flex-column nav-pills" role="tablist">
            {tabs}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
