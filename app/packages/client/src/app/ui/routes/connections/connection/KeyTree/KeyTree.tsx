import * as React from 'react';

import Tree from 'ui/components/TreeView/Tree';
import TreeNode from 'ui/components/TreeView/TreeNode';
import { ITreeNodeItem } from 'ui/components/TreeView/TreeNodeItem';

interface IProps {
  keys: DbKeySearchResult;

  onItemSelected?: (item: ITreeNodeItem) => void;
}

const keysStyle: React.CSSProperties = {
  flex: 1,
  padding: "12px",
  backgroundColor: "#fff",
  borderRight: "1px solid #d0d0d0"
};

const keyTree: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <div className="d-flex-col" style={keysStyle}>
      <Tree lightMode={false}>
        {
          props.keys.items.map((item, i) => (
            <TreeNode
              key={i}
              name={item.name}
              path={item.path}
              children={item.children}
              onItemSelected={(e) => props.onItemSelected && props.onItemSelected(e)}
            />
          ))
        }
      </Tree>
    </div>
  );
};

export default keyTree;
