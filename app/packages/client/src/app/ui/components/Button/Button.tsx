import * as React from 'react';
import clsx from 'clsx';

export type ButtonType = 'button' | 'outline' | 'icon';

export type ButtonVariant = 'primary' | 'alt' | 'success' | 'danger';

interface IProps {
  text?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  iconClassName?: string;
  className?: string;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const buttonClass = (props: IProps): string => {
  const type =
    props.type === 'outline' ? 'btn-outline'
      : props.type === 'icon' ? 'btn-icon'
        : 'btn';

  const variant =
    props.variant === 'alt' ? 'alt'
      : props.variant === 'success' ? 'success'
        : props.variant === 'danger' ? 'danger'
          : null;

  return variant === null ? type : `${type}-${variant}`;
}

const button: React.SFC<IProps> = (props): JSX.Element => {
  const cls = clsx(
    buttonClass(props),
    props.fullWidth && 'w-100',
    props.className
  );

  return (
    <button
      className={cls}
      onClick={(e) => props.onClick && props.onClick(e)}
    >
      {
        props.type && props.type === 'icon'
          ? <i className={props.iconClassName}></i>
          : props.text
      }
    </button>
  );
};

export default button;
