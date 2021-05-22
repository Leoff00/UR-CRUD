import React from "react";
import { Switch, Route, Redirect } from "react-router";

import Home from "./components/Home/Home";
import Main from "./components/Main/Main";
import Update from "./components/Content/Update";

export default function Routes(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Main} />
      <Route path="/edit/:_id" component={Update} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
