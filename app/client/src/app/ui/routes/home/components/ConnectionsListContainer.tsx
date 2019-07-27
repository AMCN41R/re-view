import { connect } from 'react-redux';

import { DispatchThunk } from 'store/DispatchTypes';

import ConnectionsList from './ConnectionsList';

interface IStateProps {
  isLoading: boolean;
  connections: IRedisConnection[];
}

interface IDispatchProps {

}

const connectedConnectionsList = connect<IStateProps, IDispatchProps>(
  (state: IAppState): IStateProps =>
    ({
      isLoading: state.connections.requestingConnections,
      connections: state.connections.connections
    }),
  (dispatch: DispatchThunk): IDispatchProps =>
    ({
    })
)(ConnectionsList);

export default connectedConnectionsList;
