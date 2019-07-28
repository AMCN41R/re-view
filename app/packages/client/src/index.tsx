// react imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './app/style/sass/index.scss';

// I want store from your store store
import { Provider } from 'react-redux';
import store from 'store/Store';

// get some datas
import { DispatchThunk } from 'store/DispatchTypes';
import { requestConnectionsAsync } from 'store/Connections/Actions';
(store.dispatch as DispatchThunk)(requestConnectionsAsync());

// looking good sweetcheeks
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from 'style/mui';

// the app
import App from 'App';
import ErrorBoundary from 'ui/components/ErrorBoundary';

fetch('/api/test').then(x => {
  // console.log('T', x.headers.get('content-type'));
  // console.log('L', x.headers.get('content-length'));
  return x.json();
}).then(x => console.log(x));
// fetch('/redis/databases').then(x => x.json()).then(x => console.log(x));
// fetch('/redis/keys', {
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   method: 'POST',
//   body: JSON.stringify({
//     db: 5
//   })
// }).then(x => x.json()).then(x => console.log(x));
// fetch('/redis/get', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     db: 5,
//     key: '1'
//   })
// }).then(x => x.json()).then(x => console.log(x));

// lets go
ReactDOM.render(
  (
    <ErrorBoundary>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <>
            <CssBaseline />
            <App />
          </>
        </MuiThemeProvider>
      </Provider>
    </ErrorBoundary>
  ),
  document.getElementById('app')
);
