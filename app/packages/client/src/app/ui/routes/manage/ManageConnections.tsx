import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import { CircularProgress } from '@material-ui/core';

import ServerCard from './components/ServerCard';

export interface IRequiredProps {
  isLoading: boolean;
  connections: IRedisConnection[];
}

export interface IRequiredActions { }

interface IProps extends IRequiredProps, IRequiredActions, WithStyles<typeof styles> { }

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  }
});

const manage: React.SFC<IProps> = (props): JSX.Element => (
  <div className={props.classes.root}>
    {
      props.isLoading
        ? <CircularProgress />
        : props.connections.map((x, idx) => {
          return (
            <ServerCard key={idx} connection={x} />
          );
        })
    }
  </div>
);

export default withStyles(styles)(manage);
