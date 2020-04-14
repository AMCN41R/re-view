import * as React from 'react';
import clsx from 'clsx';

interface IProps {
  lightMode?: boolean;
}

const tree: React.SFC<IProps> = (props): JSX.Element => {
  const cls = clsx("tree", {
    "tree-light": props.lightMode
  })
  return (
    <div className={cls}>
      {props.children}
    </div>
  );
}

export default tree;
