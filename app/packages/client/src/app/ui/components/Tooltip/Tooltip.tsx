import * as React from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface IProps {
  text: string;
  position?: TooltipPosition;
}

const tooltip: React.SFC<IProps> = (props): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <div
      className="tooltip"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {
        show && <span className="tooltip-text">{props.text}</span>
      }
      {props.children}
    </div>
  );
};

export default tooltip;
