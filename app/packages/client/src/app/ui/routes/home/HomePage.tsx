import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> { }

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({

});

const homePage: React.SFC<IProps> = (props): JSX.Element => (
  <div>
    <div>Home</div>
  </div>
);

export default withStyles(styles)(homePage);
