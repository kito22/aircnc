import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login/index';
import Dashboard from './pages/Dashboard/index';
import Spot from './pages/Spot/index';

export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/new" exact component={Spot} />
      </Switch>
    </BrowserRouter>
  );
}
