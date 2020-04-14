// react imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// looking good
import './app/style/_index.scss';

// router
import * as H from 'history';
import { Router } from 'react-router-dom';
import { RouterHistory } from 'ui/routes/Routes';
const history: H.History = H.createHashHistory();
RouterHistory.set(history);

// the app
import App from 'App';
import ErrorBoundary from 'ui/components/ErrorBoundary';

// lets go
ReactDOM.render(
  (
    <ErrorBoundary>
      <Router history={history}>
        <App />
      </Router>
    </ErrorBoundary>
  ),
  document.getElementById('app')
);
