import React, { Component, useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "react-bootstrap";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams,
//   useRouteMatch,
// } from "react-router-dom";

export default function Test() {
  const componentRef = useRef();
  return (
    <React.Fragment>
      <ReactToPrint
        trigger={() => <Button>Hello</Button>}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} />
      </div>
    </React.Fragment>
  );
}
class ComponentToPrint extends Component {
  render() {
    return <h1>Hello</h1>;
  }
}

// export default function Test() {
//   return (
//     <Router>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>{" "}
//         </li>
//         <li>
//           <Link to="/test">Test</Link>{" "}
//         </li>
//       </ul>
//       <Switch>
//         <Route path="/" exact>
//           <h3>Home</h3>
//         </Route>
//         <Route path="/test">
//           <h3>Please Click a Link</h3>
//           <Links />
//         </Route>
//       </Switch>
//     </Router>
//   );
// }
// function Links() {
//   let { path, url } = useRouteMatch();
//   return (
//     <React.Fragment>
//       <ul>
//         <li>
//           <Link to={`${url}/link1`}>Link1</Link>
//         </li>
//         <li>
//           <Link to={`${url}/link2`}>Link2</Link>
//         </li>
//       </ul>
//       <Switch>
//         <Route path={path} exact />
//         <Route path={`${path}/link1`}>
//           <h3>Link1</h3>
//         </Route>
//         <Route path={`${path}/link2`}>
//           <h3>Link2</h3>
//         </Route>
//       </Switch>
//     </React.Fragment>
//   );
// }
// function Comp() {
//   let { linkId } = useParams();
//   return <h3>{linkId}</h3>;
// }
