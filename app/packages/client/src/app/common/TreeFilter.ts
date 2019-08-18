import { TreeNode } from 'react-treebeard';

// Helper functions for tree node filtering

type TreeNodeMatcher = (filterText: string, node: TreeNode) => boolean;

export const defaultMatcher = (filterText: string, node: TreeNode): boolean => {
  return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

export const findNode = (node: TreeNode, filter: string, matcher: TreeNodeMatcher): boolean => {
  return matcher(filter, node) || // i match
    (node.children && // or i have descendents and one of them match
      node.children.length &&
      !!node.children.find(child => findNode(child, filter, matcher)));
};

export const filterTree = (node: TreeNode, filter: string, matcher: TreeNodeMatcher = defaultMatcher): TreeNode => {
  // If im an exact match then all my children get to stay
  if (matcher(filter, node) || !node.children) {
    return node;
  }
  // If not then only keep the ones that match or have matching descendants
  const filtered = node.children
    .filter(child => findNode(child, filter, matcher))
    .map(child => filterTree(child, filter, matcher));
  // return Object.assign({}, node, { children: filtered });
  return { ...node, children: filtered };
};

export const expandFilteredNodes = (
  node: TreeNode,
  filter: string,
  matcher: TreeNodeMatcher = defaultMatcher
): TreeNode => {
  let children = node.children;
  if (!children || children.length === 0) {
    // return Object.assign({}, node, { toggled: false });
    return { ...node, toggled: false };
  }
  const childrenWithMatches = node.children.filter(child => findNode(child, filter, matcher));
  const shouldExpand = childrenWithMatches.length > 0;
  // If im going to expand, go through all the matches and see if thier children need to expand
  if (shouldExpand) {
    children = childrenWithMatches.map(child => {
      return expandFilteredNodes(child, filter, matcher);
    });
  }
  // return Object.assign({}, node, { children: children, toggled: shouldExpand });
  return { ...node, children: children, toggled: shouldExpand };
};
