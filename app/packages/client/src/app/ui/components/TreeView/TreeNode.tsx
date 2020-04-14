import * as React from 'react';

import TreeNodeItem, { ITreeNodeItem } from './TreeNodeItem';

interface IProps {
  name: string;
  path: string;
  children: TreeItem[];
  onItemSelected?: (item: ITreeNodeItem) => void;
}

const TreeNode: React.SFC<IProps> = (props): JSX.Element => {

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const icon = expanded
    ? "fas fa-folder-open fa-fw icon-folder"
    : "fas fa-folder fa-fw icon-folder";

  if (!props.children || props.children.length === 0) {
    return (
      <TreeNodeItem
        name={props.name}
        path={props.path}
        onClick={(e) => props.onItemSelected && props.onItemSelected(e)}
      />
    )
  }

  return (
    <>
      <div
        className="tree-node"
        onClick={() => setExpanded(!expanded)}
      >
        <i className={icon}></i> {props.name}
      </div>
      {
        expanded &&
        <div className="tree-node-children">
          {
            props.children.map((item, i) => {
              if (!item.children || item.children.length === 0) {
                return (
                  <TreeNodeItem
                    key={i}
                    name={item.name}
                    path={item.path}
                    onClick={(e) => props.onItemSelected && props.onItemSelected(e)}
                  />
                )
              }

              return (
                <TreeNode
                  key={i}
                  name={item.name}
                  path={item.path}
                  children={item.children}
                  onItemSelected={(e) => props.onItemSelected && props.onItemSelected(e)}
                />
              )
            })
          }
        </div>
      }
    </>
  );
}

export default TreeNode;
