import React from "react";
import { Navbar } from "react-bootstrap";

export default function Navigationbar() {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Admin</Navbar.Brand>
      </Navbar>
    </React.Fragment>
  );
}
