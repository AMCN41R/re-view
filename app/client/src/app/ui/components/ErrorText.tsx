import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface IProps {
  message: string;
  className?: string;
}

const errorText: React.SFC<IProps> = (props): JSX.Element => (
  <div className={props.className}>
    <Typography color="error" variant="caption">
      {props.message}
    </Typography>
  </div>
);

export default errorText;
