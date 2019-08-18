import * as React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import NotFound from './errors/NotFound';

import HomePage from './home/HomePage';
import ManageConnections from './manage/ManageConnectionsContainer';
import Connection from './connection/ConnectionContainer';

/**
 * Define our routes here.
 */
const router = (): JSX.Element => (
  <Switch>
    <Redirect exact from="/" to="/home" />
    <Route path="/home" component={HomePage} />

    <Route path="/connections/:name/:db" component={Connection} />
    <Route path="/connections" component={ManageConnections} />

    <Route component={NotFound} />
  </Switch>
);

export default router;
