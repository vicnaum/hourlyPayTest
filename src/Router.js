import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from "./Main";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/contract/:address" component={Main} />
      <Route component={Main} />
    </Switch>
  </BrowserRouter>
)

export default Router;