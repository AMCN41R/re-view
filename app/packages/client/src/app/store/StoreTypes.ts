interface IAction {
  type: string;
}

interface IActionOf<T> extends IAction {
  payload: T;
}

interface IAppState {
  connections: IConnectionsState;
}
