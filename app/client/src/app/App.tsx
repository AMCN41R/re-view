import * as React from 'react';

import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

import AppNavBar from 'ui/components/NavBar/NavBar';
import HomePageContainer from 'ui/routes/home/HomePageContainer';

// tslint:disable-next-line: typedef
const styles = (theme: Theme) => createStyles({
  view: {
    backgroundColor: theme.palette.grey[50],
    overflowY: 'auto',
    position: 'absolute',
    top: theme.navHeight,
    bottom: 0,
    width: '100%'
  }
});

interface IProps extends WithStyles<typeof styles> { }

const app: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <>
      <AppNavBar />
      <div className={props.classes.view}>
        <HomePageContainer />
      </div>
    </>
  );
};

const styledApp = withStyles(styles)(app);

export default styledApp;
