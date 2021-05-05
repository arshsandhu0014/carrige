import React, { Component } from "react";
import {
  Card,
  Form,
  FormControl,
  Button,
  FormGroup,
  Container,
  Table,
} from "react-bootstrap";
import ReactToPrint from "react-to-print";
import { handelFormChange } from "../helper/methodhelper";

export default class CreateBill extends Component {
  state = {
    products: [],
    billproducts: [],
    searchdropdown: "productcode",
    search: "",
  };
  render() {
    let count = 0;
    const data = this.state.products.filter((item) =>
      item.productCode.includes(this.state.search)
    );
    let rows = data.map((item) =>
      count++ < 2 ? (
        <tr key={item._id}>
          <td>{item.productCode}</td>
          <td>{item.itemName}</td>
          <td>{item.size}</td>
          <td>{item.sellingPrice}</td>
          <td>
            <Button
              size="sm"
              onClick={() => {
                let billproducts = this.state.billproducts;
                let existing = billproducts.findIndex(
                  (product) => product.productCode == item.productCode
                );
                if (existing > -1) {
                  billproducts[existing].quantity++;
                } else {
                  billproducts.push({
                    productCode: item.productCode,
                    itemName: item.itemName,
                    size: item.size,
                    sellingPrice: item.sellingPrice,
                    quantity: 1,
                  });
                }
                this.setState({
                  billproducts: billproducts,
                });
              }}
            >
              +
            </Button>
          </td>
        </tr>
      ) : null
    );
    return (
      <React.Fragment>
        <Form inline className="mt-3 ml-5">
          <FormGroup controlId="searchdropdown">
            <Form.Control as="select" onChange={handelFormChange.bind(this)}>
              <option value="productcode">Product#</option>
              <option value="itemname">Item Name</option>
              <option value="quantity">Quantity</option>
            </Form.Control>
          </FormGroup>
          <FormGroup controlId="search">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2 ml-2"
              onChange={handelFormChange.bind(this)}
            />
          </FormGroup>
          <Button variant="outline-success">Search</Button>
        </Form>
        <Container className="mt-3 mr-2">
          <Table striped bordered hover size="sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Product#</th>
                <th scope="col">Name</th>
                <th scope="col">Size</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
        <Container className="mt-3 mr-2">
          <ComponentToPrint
            data={this.state.billproducts}
            ref={(el) => (this.componentRef = el)}
          />
        </Container>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
          documentTitle = "Biil"
        />
      </React.Fragment>
    );
  }
  componentDidMount() {
    fetch("http://localhost:5555/products/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ products: json });
      });
  }
  componentDidUpdate() {
    console.log(this.state.search);
  }
}

class ComponentToPrint extends Component {
  render() {
    const data = this.props.data;
    let count = 0;
    const rows = data.map((item) => (
      <tr key={item.productCode}>
        <td>{++count}</td>
        <td>{item.itemName}</td>
        <td>{item.size}</td>
        <td>{item.sellingPrice}</td>
        <td>{item.quantity}</td>
        <td>{item.quantity * item.sellingPrice}</td>
      </tr>
    ));
    return (
      <React.Fragment>
        <Table striped bordered hover size="sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Size</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </React.Fragment>
    );
  }
}
