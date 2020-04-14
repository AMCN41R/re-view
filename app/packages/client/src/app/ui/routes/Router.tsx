import * as React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import NotFound from './errors/NotFound';

import HomePage from './home/HomePageContainer';

import ServerView from './connections/connection/ServerViewContainer';
import DatabaseView from './connections/connection/DatabaseViewContainer';

/**
 * Define our routes here.
 */
const router: React.SFC = (props): JSX.Element => (
  <Switch>
    <Redirect exact from="/" to="/home" />
    <Route path="/home" component={HomePage} />

    <Route path="/connections/:name/:db" component={DatabaseView} />
    <Route path="/connections/:name" component={ServerView} />

    <Route component={NotFound} />
  </Switch>
);

export default router;
