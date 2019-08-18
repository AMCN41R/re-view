import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import DatabaseCard from './DatabaseCard';

export interface IRequiredProps {
  connection: IRedisConnection;
  databases: string[];
}

interface IProps extends IRequiredProps, WithStyles<typeof styles> { }

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    // gridGap: `${theme.spacing.unit}px`,
  }
});

const connection: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <div className={props.classes.grid}>
      {
        props.databases && props.databases.map(x =>
          <DatabaseCard
            key={x}
            id={x}
            keyCount={50}
            connectionName={props.connection.name}
          />)
      }
    </div>
  );
};

export default withStyles(styles)(connection);
