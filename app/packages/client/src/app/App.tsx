import * as React from 'react';

import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

import AppNavBar from 'ui/components/NavBar/NavBar';
import AppRouter from 'ui/routes/Router';

// tslint:disable-next-line: typedef
const styles = (theme: Theme) => createStyles({
  view: {
    backgroundColor: theme.palette.grey[100],
    overflowY: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: `calc(100% - ${theme.navWidth}px)`,
    marginLeft: `${theme.navWidth}px`,
    padding: `${theme.spacing.unit * 2}px`
  },
});

interface IProps extends WithStyles<typeof styles> { }

const app: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <>
      <AppNavBar />
      <div className={props.classes.view}>
        <AppRouter />
      </div>
    </>
  );
};

const styledApp = withStyles(styles)(app);

export default styledApp;
