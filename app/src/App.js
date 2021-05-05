import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/auth/login";
import Register from "./components/auth/register";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home}/>
        <Route path="/auth/register" exact component={Register} />
      </Switch>
    </Router>
  );
}
