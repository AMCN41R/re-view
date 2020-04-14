import * as React from 'react';

import {
  RouteComponentProps,
  withRouter
} from 'react-router-dom';

import { ConnectionsService } from 'ui/services/ConnectionsService';

import Loading from 'ui/components/Loading/Loading';

import HomePage from './HomePage';

interface IProps extends RouteComponentProps<{}> { }

const homePageContainer: React.SFC<IProps> = (props): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [connections, setConnections] = React.useState<RedisConnectionOptions[]>([]);

  React.useEffect(() => {
    const fetcher = async () => {
      const con = await ConnectionsService.getConnections();
      setConnections(con);
      setLoading(false);
    }

    fetcher();
  }, []);

  return (
    <Loading loading={loading}>
      <HomePage connections={connections} />
    </Loading>
  );
};

export default withRouter(homePageContainer);
