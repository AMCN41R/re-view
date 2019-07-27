import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { FetchResponse } from 'api/FetchBase';

export type DispatchThunk = ThunkDispatch<IAppState, void, AnyAction>;

export const fetcher = <T = void>(
  pre: () => IAction,
  req: () => Promise<FetchResponse<T>>,
  success: () => IAction | IActionOf<T>,
  err: (error: string) => IActionOf<string>
): (dispatch: Dispatch) => void => {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      // tell the store we are starting the request
      dispatch(pre());

      // make the request
      const response = await req();

      // raise an error if the request failed
      if (!response.ok) {
        dispatch(err(response.error.status));
      }

      dispatch(success());

    } catch (error) {
      // raise an error if the request failed
      console.error(error);
      dispatch(err(error));
    }
  };
};
