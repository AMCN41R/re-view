import * as React from 'react';
import clsx from 'clsx';

interface IProps {
  type?: string;
  search?: boolean;
  placeholder?: string;
  className?: string;
  onChange?: (newValue: string) => void;
}

const inputField: React.SFC<IProps> = (props): JSX.Element => {
  const cls = clsx(
    'input-box',
    props.search && 'input-box-search',
    props.className
  );

  return (
    <input
      className={cls}
      placeholder={props.placeholder}
      type={props.type || "text"}
      onChange={(e) => props.onChange && props.onChange(e.target.value)}
    />
  );
};

export default inputField;
