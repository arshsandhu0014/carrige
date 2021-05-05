import React, { Component } from "react";
import { Card } from "react-bootstrap";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";

export default class AutoGenrateBarcode extends Component {
  render() {
    return (
      <React.Fragment>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
      </React.Fragment>
    );
  }
}

class ComponentToPrint extends Component {
  state = {
    list: [],
  };
  render() {
    let barcodes = [];
    this.state.list.map((item) => {
      if (item.isnew) {
        for (let i = 0; i < item.quantity; i++) {
          barcodes.push(item);
        }
      }
    });
    const barcodestoprint = barcodes.map((item) => (
      <tr>
        <td>
          <Card className="mt-2 mb-2 ml-5">
            <Card.Body>
              <Card.Title>Shop Name</Card.Title>
              <Barcode width={4} height={80} value={item.productCode}></Barcode>
              <Card.Subtitle className="mt-2">
                Name : {item.itemName}
              </Card.Subtitle>
              <Card.Text>
                Price : {item.sellingPrice} {item.currency}
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
