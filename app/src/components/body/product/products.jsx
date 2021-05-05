import React, { Component } from "react";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import {
  Container,
  Card,
  ButtonGroup,
  Button,
  Modal,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import { handelFormChange } from "../../helper/methodhelper";
import AddProduct from "./addproduct";
import Pagination from "react-js-pagination";

export default class Products extends Component {
  state = {
    list: [],
    modalshow: false,
    itemname: "ItemName",
    productcode: "00",
    price: 0.0,
    quantity: 0,
    currency: "Rupess",
    noOfBarcodeToPrint: 1,
    addproductmodal: false,
    activepage: 1,
  };
  handleGenrateGarCodeClick = (
    itemName,
    productcode,
    price,
    quantity,
    currency
  ) => {
    this.setState({
      modalshow: true,
      itemname: itemName,
      productcode: productcode,
      price: price,
      quantity: quantity,
      currency: currency,
    });
  };
  toogleModal = () => {
    this.setState({ modalshow: !this.state.modalshow, noOfBarcodeToPrint: 1 });
  };
  toogleAddProductModal = () => {
    this.setState({ addproductmodal: !this.state.addproductmodal });
  };
  render() {
    let count = 0;
    const product = this.state.list.map((item) => (
      <tr key={item._id}>
        <th scope="row">{++count}</th>
        <td>{item.itemName}</td>
        <td>{item.itemCode}</td>
        <td>{item.size}</td>
        <td>{item.quantity}</td>
        <td>
          <ButtonGroup size="sm">
            <Button
              onClick={() => {
                const i = { item };
                let itemname = i.item.itemName;
                let productcode = i.item.productCode;
                let price = i.item.costPrice;
                let quantity = i.item.quantity;
                let currency = i.item.currency;
                this.setState({
                  modalshow: true,
                  itemname: itemname,
                  productcode: productcode,
                  price: price,
                  quantity: quantity,
                  currency: currency,
                });
              }}
            >
              Code
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    ));
    return (
      <React.Fragment>
        <Modal size="lg" show={this.state.modalshow} onHide={this.toogleModal}>
          <Modal.Body>
            <Card className="mt-2 mb-2 ml-3">
              <Card.Body>
                <Card.Title>Shop Name</Card.Title>
                <Barcode
                  width={4}
                  height={80}
                  value={this.state.productcode}
                ></Barcode>
                <Card.Subtitle className="mt-2">
                  Name : {this.state.itemname}
                </Card.Subtitle>
                <Card.Text>
                  Price : {this.state.price} {this.state.currency}
                </Card.Text>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              size="sm"
              onClick={() =>
                this.setState({
                  noOfBarcodeToPrint: this.state.noOfBarcodeToPrint + 1,
                })
              }
            >
              +
            </Button>
            <h3>{this.state.noOfBarcodeToPrint}</h3>
            <Button
              variant="danger"
              size="sm"
              onClick={() =>
                this.setState({
                  noOfBarcodeToPrint: this.state.noOfBarcodeToPrint - 1,
                })
              }
            >
              -
            </Button>
            <Button variant="danger" onClick={this.toogleModal}>
              Close
            </Button>
            <ReactToPrint
              trigger={() => <Button variant="primary">Print</Button>}
              content={() => this.componentRef}
            />
            <div style={{ display: "none" }}>
              <ComponentToPrint
                itemname={this.state.itemname}
                productcode={this.state.productcode}
                price={this.state.price}
                quantity={this.state.quantity}
                currency={this.state.currency}
                noOfBarcodeToPrint={this.state.noOfBarcodeToPrint}
                ref={(el) => (this.componentRef = el)}
              />
            </div>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.addproductmodal}
          onHide={this.toogleAddProductModal}
        >
          <Modal.Body>
            <AddProduct></AddProduct>
          </Modal.Body>
        </Modal>
        <Form inline className="mt-3 ml-5">
          <FormGroup controlId="searchdropdown">
            <Form.Control as="select" onChange={handelFormChange.bind(this)}>
              <option value="productcode">Product#</option>
              <option value="itemname">Item Name</option>
              <option value="quantity">Quantity</option>
            </Form.Control>
          </FormGroup>
          <FormControl type="text" placeholder="Search" className="mr-2 ml-2" />
          <Button variant="outline-success">Search</Button>
          <Button className="ml-2" onClick={this.toogleAddProductModal}>
            Add Product
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
            <tbody>{product}</tbody>
          </table>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            onChange={() => {}}
          ></Pagination>
        </Container>
      </React.Fragment>
    );
  }
  async callApi() {
    fetch("http://localhost:5555/products/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ list: json });
      });
  }
  componentDidMount() {
    this.callApi();
  }
}
class ComponentToPrint extends Component {
  render() {
    const barcodes = [];
    for (let i = 0; i < this.props.noOfBarcodeToPrint; i++) {
      barcodes.push(
        <Card className="mt-2 mb-2 ml-3">
          <Card.Body>
            <Card.Title>Shop Name</Card.Title>
            <Barcode
              width={4}
              height={80}
              value={this.props.productcode}
            ></Barcode>
            <Card.Subtitle className="mt-2">
              Name : {this.props.itemname}
            </Card.Subtitle>
            <Card.Text>
              Price : {this.props.price} {this.props.currency}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
    return (
      <React.Fragment>
        {barcodes.map((item) => item)}
        {console.log(barcodes, this.props.noOfBarcodeToPrint)}
      </React.Fragment>
    );
  }
}
