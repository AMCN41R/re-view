import * as React from 'react';
import clsx from 'clsx';

interface IProps {
  label: string;
  text: string;
  className?: string;
}

const textLabel: React.SFC<IProps> = (props): JSX.Element => {
  const cls = clsx('text-label', props.className);

  return (
    <div className={cls}>
      <div className="text">{props.text}</div>
      <div className="label">{props.label}</div>
    </div>
  );
};

export default textLabel;
