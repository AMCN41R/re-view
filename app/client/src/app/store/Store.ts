import {
  applyMiddleware,
  createStore,
  combineReducers,
  compose
} from 'redux';

// for async actions
import thunk from 'redux-thunk';

// import the reducers and default state
import * as connections from './Connections/Reducers';

// combine the initial state
const initialState: IAppState = {
  connections: connections.defaultState
};

// combine the reducers
const reducers = combineReducers<IAppState>({
  connections: connections.reducers
});

// setup the middleware
const middleware = [thunk];

// create the store
const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware)));

export default store;
