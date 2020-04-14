export const convertToTree = (
  items: string[],
  separator: string = ':'
): TreeItem[] =>
  trimTree(toTree(flatten(items, separator)));

type FlatItem = {
  name: string;
  id: number;
  parentId: number;
  path: string;
};

type FullTreeItem = {
  name: string;
  id: number;
  parentId: number;
  path: string;
  children?: FullTreeItem[];
};

const flatten = (keys: string[], separator: string): FlatItem[] => {
  const results: FlatItem[] = [];
  const map = new Map<string, { name: string; id: number }>();
  let idGen = 1;
  keys.forEach(key => {
    const parts = key.split(separator);
    parts.reduce<FlatItem | null>((prev, part) => {
      let pid = 0;
      const id = idGen;

      if (!prev) {
        // the first iteration
        const first = map.get(part);
        if (!first) {
          results.push({ name: part, path: part, parentId: 0, id });
          map.set(part, { name: part, id });
          idGen++;
          return { name: part, id, path: part, parentId: 0 };
        } else {
          return { name: part, id: first.id, path: part, parentId: 0 };
        }
      }

      // 2nd iteration onwards
      const path = `${prev.path}:${part}`;
      const mapped = map.get(path);
      if (!mapped) {
        pid = prev.id;
        results.push({ name: part, path, parentId: pid, id });
        map.set(path, { name: part, id });
        idGen++;
        return { name: part, id, path, parentId: pid };
      } else {
        return { name: part, id: mapped.id, path, parentId: pid };
      }
    }, null);
  });

  return results;
};

const toTree = (array: FullTreeItem[], parent?: FullTreeItem): FullTreeItem[] => {

  let tree: FullTreeItem[] = [];
  parent = parent || { id: 0, name: 'root', parentId: -1, path: '' };

  const children = array.filter((child) => parent && child.parentId === parent.id);

  if (children.length) {
    if (parent.id === 0) {
      tree = children;
    } else {
      parent.children = children;
    }
    children.forEach((child) => toTree(array, child));
  }

  return tree;
};

const trimTree = (tree: FullTreeItem[]): TreeItem[] => {
  return tree.map(x => ({
    name: x.name,
    path: x.path,
    children: x.children && trimTree(x.children)
  }));
};
