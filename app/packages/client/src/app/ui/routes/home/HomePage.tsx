import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import { default as ConnectionsList } from './components/ConnectionsListContainer';

interface IProps extends WithStyles<typeof styles> {
  connections: IRedisConnection[];
}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({

});

const homePage: React.SFC<IProps> = (props): JSX.Element => (
  <div>
    <div>Home</div>
    <ConnectionsList />
  </div>
);

export default withStyles(styles)(homePage);
