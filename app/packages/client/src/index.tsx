// react imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// looking good
import './app/style/sass/index.scss';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from 'style/mui';

// I want store from your store store
import { Provider } from 'react-redux';
import store from 'store/Store';

// get some data
import { DispatchThunk } from 'store/DispatchTypes';
import { requestConnectionsAsync } from 'store/Connections/Actions';
(store.dispatch as DispatchThunk)(requestConnectionsAsync());

// router
import * as H from 'history';
import { Router } from 'react-router-dom';
import { RouterHistory } from 'ui/routes/Routes';
const history: H.History = H.createHashHistory();
RouterHistory.set(history);

// the app
import App from 'App';
import ErrorBoundary from 'ui/components/ErrorBoundary';

// just a test
fetch('/api/test').then(x => x.json()).then(x => console.log(x));

// lets go
ReactDOM.render(
  (
    <ErrorBoundary>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <>
              <CssBaseline />
              <App />
            </>
          </Router>
        </MuiThemeProvider>
      </Provider>
    </ErrorBoundary>
  ),
  document.getElementById('app')
);
