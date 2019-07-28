import { actions } from './Actions';

export const defaultState: IConnectionsState = {
  requestingConnections: false,
  connections: [],
  newConnection: {
    state: 'none'
  }
};

const requestConnections = (state: IConnectionsState, action: IAction): IConnectionsState =>
  ({
    ...state,
    requestingConnections: true
  });

const receivedConnections = (state: IConnectionsState, action: IActionOf<IRedisConnection[]>): IConnectionsState =>
  ({
    ...state,
    requestingConnections: false,
    connections: action.payload
  });

const addNewConnection = (state: IConnectionsState, action: IActionOf<IRedisConnection>): IConnectionsState =>
  ({
    ...state,
    newConnection: {
      state: 'requesting'
    }
  });

const addNewConnectionSuccess = (state: IConnectionsState, action: IActionOf<IRedisConnection>): IConnectionsState =>
  ({
    ...state,
    connections: [
      ...state.connections,
      action.payload
    ],
    newConnection: {
      state: 'created'
    }
  });

const addNewConnectionError = (state: IConnectionsState, action: IActionOf<string>): IConnectionsState =>
  ({
    ...state,
    newConnection: {
      state: 'failed'
    }
  });

const reset = (state: IConnectionsState, action: IAction): IConnectionsState =>
  ({
    ...state,
    newConnection: {
      state: 'none'
    }
  });

export const reducers = (state: IConnectionsState = defaultState, action: IActionOf<any>): IConnectionsState => {
  switch (action.type) {

    case actions.REQUEST_CONNECTIONS:
      return requestConnections(state, action);

    case actions.RECEIVED_CONNECTIONS:
      return receivedConnections(state, action);

    case actions.ADD_NEW_CONNECTION_REQUEST:
      return addNewConnection(state, action);

    case actions.ADD_NEW_CONNECTION_SUCCESS:
      return addNewConnectionSuccess(state, action);

    case actions.ADD_NEW_CONNECTION_ERROR:
      return addNewConnectionError(state, action);

    case actions.RESET_NEW_CONNECTION:
      return reset(state, action);

    default:
      return state;
  }
};
