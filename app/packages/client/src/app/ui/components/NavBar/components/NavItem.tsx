import * as React from 'react';
import clsx from 'clsx';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface IProps extends WithStyles<typeof styles> {
  text: string;
  icon: JSX.Element;
  active: boolean;
  onClick?: () => void;
}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
  },
});

const navItem: React.SFC<IProps> = (props): JSX.Element => (
  <ListItem
    button
    className={clsx(props.classes.item, props.active && props.classes.itemActiveItem)}
    onClick={props.onClick}
  >
    <ListItemIcon
      className={props.classes.itemIcon}
      classes={{
        root: props.classes.itemIconRoot,
      }}
    >
      {props.icon}
    </ListItemIcon>
    <ListItemText
      classes={{
        primary: props.classes.itemPrimary,
      }}
    >
      {props.text}
    </ListItemText>
  </ListItem>
);

export default withStyles(styles)(navItem);
