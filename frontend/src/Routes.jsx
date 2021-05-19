import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Home from "./components/Home/Home";
import Main from "./components/Main/Main";

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Main} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
