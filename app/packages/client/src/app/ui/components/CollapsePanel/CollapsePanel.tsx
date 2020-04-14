import * as React from 'react';
import clsx from 'clsx';

interface IProps {
  title: string;
  className?: string;
}

const collapsePanel: React.SFC<IProps> = (props): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const cls = clsx("collapse-header", props.className);
  return (
    <div>
      <div className={cls} onClick={() => setOpen(!open)}>{props.title}</div>
      {open ? (<div className="collapse-content">{props.children}</div>) : null}
    </div>
  );
}

export default collapsePanel;
