import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface IProps extends WithStyles<typeof styles> {
  text: string;
}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  categoryHeader: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
});

const category: React.SFC<IProps> = (props): JSX.Element => (
  <ListItem className={props.classes.categoryHeader}>
    <ListItemText
      classes={{
        primary: props.classes.categoryHeaderPrimary,
      }}
    >
      {props.text}
    </ListItemText>
  </ListItem>
);

export default withStyles(styles)(category);
