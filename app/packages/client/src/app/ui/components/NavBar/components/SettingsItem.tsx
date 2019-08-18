import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SettingsIcon from '@material-ui/icons/Settings';

interface IProps extends WithStyles<typeof styles> {

}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  settings: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemPrimary: {
    fontSize: 'inherit',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing.unit,
  },
  itemIconRoot: {
    color: 'inherit',
    marginRight: 0,
    '& svg': {
      fontSize: 20,
    },
  }
});

const settings: React.SFC<IProps> = (props): JSX.Element => (
  <ListItem className={props.classes.settings}>
    <ListItemIcon
      className={props.classes.itemIcon}
      classes={{
        root: props.classes.itemIconRoot,
      }}
    >
      <SettingsIcon />
    </ListItemIcon>
    <ListItemText
      classes={{
        primary: props.classes.itemPrimary,
      }}
    >
      Settings
    </ListItemText>
  </ListItem>
);

export default withStyles(styles)(settings);
