import * as React from 'react';

import { KeyValue } from 'ui/services/KeysService';

import { ITreeNodeItem } from 'ui/components/TreeView/TreeNodeItem';

import KeyToolbar from './KeyToolbar/KeyToolbar'
import KeyTree from './KeyTree/KeyTree';
import KeyInfo from './KeyInfo/KeyInfo';

interface IProps {
  name: string;
  dbInfo: DbInfo;
  keys: DbKeySearchResult;
  selectedKey?: KeyValue;
  onItemSelected?: (item: ITreeNodeItem) => void;
}

const databaseView: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <div className="d-flex-col h-100">
      <div className="d-flex">
        <i className="fas fa-server fa-fw"></i>
        <div className="flex-grow-1">{props.name}</div>
        <i className="fas fa-database fa-fw"></i>
        <div className="m-right-12">{`[${props.dbInfo.db}]`}</div>
      </div>
      <KeyToolbar />
      <div className="flex-grow-1 d-flex">
        <KeyTree keys={props.keys} onItemSelected={(e) => props.onItemSelected && props.onItemSelected(e)} />
        <KeyInfo keyInfo={props.selectedKey} />
      </div>
    </div>
  );
};

export default databaseView;
