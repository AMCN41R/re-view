import * as React from 'react';
import clsx from 'clsx';

interface IProps {
  placeholder: string;
  defaultValue?: string;
  readonly?: boolean;
  className?: string;
  onValueChanged?: (newValue: string) => void;
}

const textbox: React.SFC<IProps> = (props): JSX.Element => {
  const [val, setVal] = React.useState<string>(props.defaultValue || "");
  const cls = clsx("textbox", props.className);
  return (
    <div className={cls}>
      <input
        type="text"
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          props.onValueChanged && props.onValueChanged(e.target.value);
        }}
        readOnly={props.readonly}
        required
      />
      {
        props.readonly
          ? <div className="label-readonly">{props.placeholder}</div>
          : <label title={props.placeholder} />
      }
    </div>
  )
};

export default textbox;
