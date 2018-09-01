import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProductView } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ProductView} />
  </Switch>
);

export default Routes;
