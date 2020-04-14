import * as React from 'react';

import {
  RouteComponentProps,
  withRouter
} from 'react-router-dom';

import { ConnectionsService } from 'ui/services/ConnectionsService';

import Loading from 'ui/components/Loading/Loading';

import ServerView from './ServerView';

interface IProps extends RouteComponentProps<{
  name: string;
}> { }

const serverViewContainer: React.SFC<IProps> = (props): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [dbs, setDbs] = React.useState<DbInfo[]>([]);

  React.useEffect(() => {
    const fetcher = async () => {
      const info = await ConnectionsService.getDbInfo(props.match.params.name);
      setDbs(info);
      setLoading(false);
    }

    fetcher();
  }, []);

  return (
    <Loading loading={loading}>
      <ServerView name={props.match.params.name} dbInfo={dbs} />
    </Loading>
  );
};

export default withRouter(serverViewContainer);
