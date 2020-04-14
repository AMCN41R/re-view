import * as React from 'react';

interface IProps {
  name: string;
  path: string;
  onClick?: (item: ITreeNodeItem) => void;
}

const treeNodeItem: React.SFC<IProps> = (props): JSX.Element => (
  <div
    className="tree-item"
    onClick={() => props.onClick && props.onClick({ name: props.name, path: props.path })}
  >
    {props.name}
  </div>
);

export default treeNodeItem;

export interface ITreeNodeItem {
  name: string;
  path: string;
}
