import * as React from 'react';
import clsx from 'clsx';

import Button from '../Button/Button';

interface IProps {
  text: string;
  iconClassName?: string;
  className?: string;
  onClick?: () => void;
  showOptionsButton?: boolean;
  onOptionsClick?: () => void;
}

const cardButton: React.SFC<IProps> = (props): JSX.Element => {
  const cls = clsx("card-button", props.className);

  return (
    <div className={cls} onClick={props.onClick}>
      <div className="card-button-content">
        {
          props.iconClassName &&
          <div className="card-icon m-right-6">
            <i className={props.iconClassName}></i>
          </div>
        }
        <div className="flex-grow-1">
          {props.text}
        </div>
      </div>
      {
        props.showOptionsButton &&
        <div>
          <Button
            type="icon"
            variant="primary"
            iconClassName="fas fa-ellipsis-h fa-fw"
            className="m-right-6"
            onClick={(e) => {
              e.stopPropagation();
              props.onOptionsClick && props.onOptionsClick();
            }}
          />
        </div>
      }
    </div>
  );
};

export default cardButton;
