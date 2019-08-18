import { connect } from 'react-redux';

import { DispatchThunk } from 'store/DispatchTypes';

import ManageConnections, { IRequiredProps, IRequiredActions } from './ManageConnections';

interface IStateProps extends IRequiredProps { }

interface IDispatchProps extends IRequiredActions { }

const connectedManageConnections = connect<IStateProps, IDispatchProps>(
  (state: IAppState): IStateProps =>
    ({
      isLoading: state.connections.requestingConnections,
      connections: state.connections.connections
    }),
  (dispatch: DispatchThunk): IDispatchProps =>
    ({
    })
)(ManageConnections);

export default connectedManageConnections;
