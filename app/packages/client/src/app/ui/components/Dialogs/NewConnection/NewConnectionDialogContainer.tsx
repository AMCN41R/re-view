import { connect } from 'react-redux';

import { DispatchThunk } from 'store/DispatchTypes';
import { addNewConnectionAsync } from 'store/Connections/Actions';

import NewConnectionDialog from './NewConnectionDialog';

interface IStateProps {
  newStatus: NewConnectionStatus;
  existingConnectionNames: string[];
}

interface IDispatchProps {
  onSave: (opts: IRedisConnection) => void;
}

const connectedDialog = connect<IStateProps, IDispatchProps>(
  (state: IAppState): IStateProps =>
    ({
      newStatus: state.connections.newConnection.state,
      existingConnectionNames: state.connections.connections.map(x => x.name)
    }),
  (dispatch: DispatchThunk): IDispatchProps =>
    ({
      onSave: (opts): void => dispatch(addNewConnectionAsync(opts))
    })
)(NewConnectionDialog);

export default connectedDialog;
