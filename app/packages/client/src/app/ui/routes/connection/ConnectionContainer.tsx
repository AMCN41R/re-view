import * as React from 'react';
import { connect } from 'react-redux';
import {
  RouteComponentProps,
  withRouter
} from 'react-router-dom';

import { DispatchThunk } from 'store/DispatchTypes';

import { RedisApi } from 'api/RedisApi';

import Connection, { IRequiredProps } from './Connection';

interface IOwnProps extends IStateProps, IDispatchProps, RouteComponentProps<{
  name: string;
  db: string;
}> { }

interface IStateProps {
  connection: IRedisConnection;
}

interface IDispatchProps { }

const container: React.SFC<IOwnProps> = (props): JSX.Element => {
  const [keys, setKeys] = React.useState();

  React.useEffect(() => {
    const fetcher = async (): Promise<void> => {
      const k = await RedisApi.getKeys(props.match.params.name, props.match.params.db, {
        pageSize: 100
      });
      setKeys(k.ok
        ? {
          name: `${props.match.params.name} : ${props.match.params.db}`,
          toggled: true,
          children: k.data.items
        }
        : {});
    };
    fetcher();
  }, [props.match.params.db]);

  return (
    <>
      <Connection
        connection={props.connection}
        db={props.match.params.db}
        data={keys}
      />
    </>
  );
};

const connectedConnection = connect<IStateProps, IDispatchProps, IOwnProps>(
  (state: IAppState, props: IOwnProps): IStateProps =>
    ({
      connection: state.connections.connections.find(x => x.name === props.match.params.name),
    }),
  (dispatch: DispatchThunk): IDispatchProps =>
    ({
    })
)(container);

export default withRouter(connectedConnection);
