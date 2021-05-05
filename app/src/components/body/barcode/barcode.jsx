import React, { Component } from "react";
import {
  Card,
  Form,
  FormControl,
  Button,
  FormGroup,
  Container,
} from "react-bootstrap";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import { handelFormChange } from "../../helper/methodhelper";
import AutoGenrateBarcode from "./autogenratebarcode";

export default class GenrateBarcode extends Component {
  state = {
    noOfBarcodes: 1,
    list: [],
    printlist: [],
    searchdropdown: "productcode",
    search: "",
  };
  render() {
    let count = 0;
    let rowcount = 0;
    let data = this.state.list.filter((item) => {
      if (item.productCode.startsWith(this.state.search)) return item;
    });
    let rows = data.map((item) =>
      rowcount++ < 5 ? (
        <tr key={item._id}>
          <th scope="row">{++count}</th>
          <td>{item.itemName}</td>
          <td>{item.itemCode}</td>
          <td>{item.size}</td>
          <td>{item.quantity}</td>
          <td>
            <Form inline>
              <FormControl
                type="text"
                placeholder={1}
                className="mr-2"
                onChange={handelFormChange.bind(this)}
              />
              <Button
                size="sm"
                onClick={() => {
                  let print = this.state.printlist;
                  print.push({
                    _id: item._id,
                    productCode: item.productCode,
                    itemname: item.itemName,
                    price: item.sellingPrice,
                    currency: item.currency,
                    noOfBarcodes: this.state.noOfBarcodes,
                  });
                  this.setState({
                    printlist: print,
                    noOfBarcodes: 1,
                  });
                }}
              >
                Add
              </Button>
            </Form>
          </td>
        </tr>
      ) : null
    );
    return (
      <React.Fragment>
        <Form inline className="mt-3 ml-5">
          <FormGroup controlId="searchdropdown">
            <Form.Control
              as="select"
              onChange={handelFormChange.bind(this)}
            >
              <option value="productcode">Product#</option>
              <option value="itemname">Item Name</option>
              <option value="quantity">Quantity</option>
            </Form.Control>
          </FormGroup>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-2 ml-2"
            onChange={handelFormChange.bind(this)}
          />
          <Button variant="outline-success">Search</Button>
          <Button className="ml-2" onClick={() => <AutoGenrateBarcode />}>
            Auto Genrate Barcodes
          </Button>
        </Form>
        <Container className="mt-3 mr-2">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Item#</th>
                <th scope="col">Size</th>
                <th scope="col">Quantity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </Container>
        <ComponentToPrint data={this.state.printlist}></ComponentToPrint>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <div style={{ display: "none" }}>
          <PrintIt
            data={this.state.printlist}
            ref={(el) => (this.componentRef = el)}
          />
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    fetch("http://localhost:5555/products/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ list: json });
      });
  }
}

class ComponentToPrint extends Component {
  render() {
    const data = this.props.data;
    let count = 0;
    const rows = data.map((item) => (
      <tr key={item._id}>
        <th scope="row">{++count}</th>
        <td>{item.itemname}</td>
        <td>{item.productcode}</td>
        <td>{item.price}</td>
        <td>{item.currency}</td>
      </tr>
    ));
    return (
      <React.Fragment>
        <Container className="mt-3 mr-2">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Item#</th>
                <th scope="col">Size</th>
                <th scope="col">Quantity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </Container>
      </React.Fragment>
    );
  }
}
class PrintIt extends Component {
  render() {
    let barcodes = [];
    this.props.data.map((item) => {
      for (let i = 0; i < item.noOfBarcodes; i++) barcodes.push(item);
    });
    const barcodestoprint = barcodes.map((item) => (
      <tr>
        <td>
          <Card className="mt-2 mb-2 ml-5">
            <Card.Body>
              <Card.Title>Shop Name</Card.Title>
              <Barcode width={4} height={80} value={item.productCode}></Barcode>
              <Card.Subtitle className="mt-2">
                Name : {item.itemname}
              </Card.Subtitle>
              <Card.Text>
                Price : {item.price} {item.currency}
              </Card.Text>
            </Card.Body>
          </Card>
        </td>
      </tr>
    ));
    return (
      <React.Fragment>
        <table>
          <tbody key="tbody">{barcodestoprint}</tbody>
        </table>
      </React.Fragment>
    );
  }
}
