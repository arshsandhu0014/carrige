import React, { Component } from "react";
import { Form, Col, Button, Card } from "react-bootstrap";
import { handelFormChange } from "../../helper/methodhelper";

export default class AddProduct extends Component {
  state = {
    itemName: "",
    size: 0,
    units: "Kg",
    quantity: 0,
    costPrice: 0,
    sellingPrice: 0,
    currency: "Rupess",
  };
  handelSubmit = (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      itemName: this.state.itemName,
      size: this.state.size,
      units: this.state.units,
      quantity: this.state.quantity,
      costPrice: this.state.costPrice,
      sellingPrice: this.state.sellingPrice,
      currency: this.state.currency,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:5555/products/", requestOptions)
      .then((response) => console.log(response))
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  handelReset = () => {
    this.setState({
      itemName: "",
      size: 0,
      units: "Kg",
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
      currency: "Rupess",
    });
  };
  render() {
    return (
      <React.Fragment>
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Add Product</Card.Title>
            <Form>
              <Form.Group
                controlId="itemName"
                onChange={handelFormChange.bind(this)}
              >
                <Form.Label>Item Name</Form.Label>
                <Form.Control placeholder="Enter Item Name" />
              </Form.Group>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="itemSize"
                  onChange={handelFormChange.bind(this)}
                >
                  <Form.Label>Size</Form.Label>
                  <Form.Control placeholder="Enter Size" />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="quantity"
                  onChange={handelFormChange.bind(this)}
                >
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="Number" placeholder="0" />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="units"
                  onChange={handelFormChange.bind(this)}
                >
                  <Form.Label>Units</Form.Label>
                  <Form.Control as="select" value="Choose...">
                    <option value="Kg">Kg</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  controlId="costPrice"
                  onChange={handelFormChange.bind(this)}
                >
                  <Form.Label>Cost Price</Form.Label>
                  <Form.Control type="Number" placeholder="0.00" />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="sellingPrice"
                  onChange={handelFormChange.bind(this)}
                >
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control type="Number" placeholder="0.00" />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="currency"
                  onChange={handelFormChange.bind(this)}
                >
                  <Form.Label>Currency</Form.Label>
                  <Form.Control as="select" value="Choose...">
                    <option value="Rupess">Rupess</option>
                    <option value="Dolar">Dolar</option>
                    <option value="Euro">Euro</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Button
                  as={Col}
                  type="Submit"
                  className="ml-3"
                  onClick={this.handelSubmit}
                >
                  Submit
                </Button>
                <Button
                  as={Col}
                  type="Reset"
                  variant="danger"
                  className="ml-3"
                  onClick={this.handelReset}
                >
                  Reset
                </Button>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}
