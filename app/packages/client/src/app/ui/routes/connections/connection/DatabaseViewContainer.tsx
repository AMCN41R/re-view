import * as React from 'react';

import {
  RouteComponentProps,
  withRouter
} from 'react-router-dom';

import { ConnectionsService } from 'ui/services/ConnectionsService';
import { KeysService, KeyValue } from 'ui/services/KeysService';

import Loading from 'ui/components/Loading/Loading';

import DatabaseView from './DatabaseView';

interface IProps extends RouteComponentProps<{
  name: string;
  db: string;
}> { }

const databaseViewContainer: React.SFC<IProps> = (props): JSX.Element => {
  const api = new KeysService(
    props.match.params.name,
    props.match.params.db
  );

  const [loading, setLoading] = React.useState<boolean>(true);
  const [dbInfo, setDbInfo] = React.useState<DbInfo>();
  const [keys, setKeys] = React.useState<DbKeySearchResult>();
  const [selectedKey, setSelectedKey] = React.useState<KeyValue>();

  React.useEffect(() => {
    const fetcher = async () => {
      const info = await ConnectionsService.getDbInfo(props.match.params.name);
      setDbInfo(info[props.match.params.db]);

      const keySearch = await api.search(1000);
      setKeys(keySearch);

      setLoading(false);
    }

    fetcher();
  }, []);

  const fetchKey = async (key: string) => {
    var val = await api.getValue(key);
    setSelectedKey(val);
  }

  return (
    <Loading loading={loading}>
      <DatabaseView
        name={props.match.params.name}
        dbInfo={dbInfo}
        keys={keys}
        selectedKey={selectedKey}
        onItemSelected={(e) => {
          console.log(e);
          fetchKey(e.path);
        }}
      />
    </Loading>
  );
};

export default withRouter(databaseViewContainer);
