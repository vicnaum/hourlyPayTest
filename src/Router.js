import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom';
import Main from "./Main";

const Router = () => (
  <HashRouter>
    <Switch>
      <Route path="/:address" component={Main} />
      <Route component={Main} />
    </Switch>
  </HashRouter>
)

export default Router;