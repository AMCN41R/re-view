import * as React from 'react';
import { Treebeard, TreeNode, theme, TreeTheme } from 'react-treebeard';

interface IProps {
  data: TreeNode;
}

const newTheme: TreeTheme = {
  ...theme,
  tree: {
    ...theme.tree,
    base: {
      backgroundColor: 'transparent',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
    }
  }
};

const tree: React.SFC<IProps> = (props): JSX.Element => {
  const [data, setData] = React.useState(props.data);
  const [cursor, setCursor] = React.useState<TreeNode>(null);

  const onToggle = (node: TreeNode, toggled: boolean): void => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData(Object.assign({}, data));
  };

  const onSelect = (node: TreeNode): void => {
    console.log(node);
  };

  return (
    <Treebeard
      data={data}
      onToggle={onToggle}
      onSelect={onSelect}
      style={newTheme}
    />
  );
};

export default tree;
