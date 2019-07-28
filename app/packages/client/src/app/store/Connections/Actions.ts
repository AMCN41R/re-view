import { Dispatch } from 'redux';
import { RedisApi } from 'api/RedisApi';

// Actions
export const actions = {
  REQUEST_CONNECTIONS: 'REQUEST_CONNECTIONS',
  RECEIVED_CONNECTIONS: 'RECEIVED_CONNECTIONS',

  ADD_NEW_CONNECTION_REQUEST: 'ADD_NEW_CONNECTION_REQUEST',
  ADD_NEW_CONNECTION_SUCCESS: 'ADD_NEW_CONNECTION_SUCCESS',
  ADD_NEW_CONNECTION_ERROR: 'ADD_NEW_CONNECTION_ERROR',

  RESET_NEW_CONNECTION: 'RESET_NEW_CONNECTION',
};

// Action Creators
const requestConnections = (): IAction =>
  ({
    type: actions.REQUEST_CONNECTIONS
  });

const receivedConnections = (names: IRedisConnection[]): IActionOf<IRedisConnection[]> =>
  ({
    type: actions.RECEIVED_CONNECTIONS,
    payload: names
  });

const addNewConnectionRequest = (): IAction =>
  ({
    type: actions.ADD_NEW_CONNECTION_REQUEST,
  });

const addNewConnectionSuccess = (opts: IRedisConnection): IActionOf<IRedisConnection> =>
  ({
    type: actions.ADD_NEW_CONNECTION_SUCCESS,
    payload: opts
  });

const addNewConnectionError = (error: string): IActionOf<string> =>
  ({
    type: actions.ADD_NEW_CONNECTION_ERROR,
    payload: error
  });

export const reset = (): IAction =>
  ({
    type: actions.RESET_NEW_CONNECTION
  });


// Thunks
export const addNewConnectionAsync = (opts: IRedisConnection): (dispatch: Dispatch) => void => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      // tell the store we are starting the request
      dispatch(addNewConnectionRequest());

      // make the request
      const response = await RedisApi.createConnection(opts);

      if (!response.ok) {
        dispatch(addNewConnectionError(response.error.status));
        return;
      }

      if (response.data.status === 'failed') {
        dispatch(addNewConnectionError('Connection Failed'));
        return;
      }

      dispatch(addNewConnectionSuccess(opts));

    } catch (error) {
      console.error(error);
      dispatch(addNewConnectionError(error));
    }
  };
};

export const requestConnectionsAsync = (): (dispatch: Dispatch) => void => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(requestConnections());

    const response = await RedisApi.getConnectionNames();

    dispatch(receivedConnections(response.data));
  };
};
