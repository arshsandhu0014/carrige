import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./navbar";
import Sidepanel from "./sidepanel";
import Dashboard from "../body/dashboard";
import Products from "../body/product/products";
import PageNotFound from "../404pagenotfound";
import GenrateBarcode from "../body/barcode/barcode";
import CreateBill from "../body/createBill";

export default function Home() {
  let { path, url } = useRouteMatch();
  const links = [
    { id: 0, name: "Products", link: "/products" },
    { id: 1, name: "Bills", link: "/bills" },
    { id: 2, name: "Create Bill", link: "/createbill" },
    { id: 4, name: "Genrate Barcode", link: "/barcode" },
  ];
  return (
    <React.Fragment>
      <Container fluid="true">
        <Navbar />
        <Container fluid="true">
          <Row>
            <Col lg="2">
              <Sidepanel url={url} links={links} />
            </Col>
            <Col>
              <Switch>
                <Route path={path} exact component={Dashboard} />
                <Route path={`${path}/products`} exact component={Products} />
                <Route
                  path={`${path}/createbill`}
                  exact
                  component={CreateBill}
                />
                <Route
                  path={`${path}/barcode`}
                  exact
                  component={GenrateBarcode}
                />
                <Route path={`${path}/*`} component={PageNotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
}
