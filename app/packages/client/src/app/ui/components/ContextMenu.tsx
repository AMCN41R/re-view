import * as React from 'react';

import {
  WithStyles,
  Theme,
  createStyles,
  withStyles,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

type ContextMenuItem = {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
};

interface IProps extends WithStyles<typeof styles> {
  anchorEl: HTMLElement;
  items: ContextMenuItem[];
  onClose: () => void;
}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  menuPaper: {
    width: '200px'
  },
  menuItemRoot: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  itemPrimary: {
    fontSize: '14px',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing.unit,
  },
  itemIconRoot: {
    marginRight: 0,
    '& svg': {
      fontSize: '14px',
    },
  },
});

const contextMenu: React.SFC<IProps> = (props): JSX.Element => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      keepMounted
      open={Boolean(props.anchorEl)}
      onClose={props.onClose}
      disableAutoFocus
      disableAutoFocusItem
      classes={{
        paper: props.classes.menuPaper
      }}
    >
      {
        props.items.map((item, idx) => (
          <MenuItem
            key={idx}
            onClick={(): void => {
              props.onClose();
              item.onClick();
            }}
            classes={{
              root: props.classes.menuItemRoot
            }}
          >
            <ListItemIcon
              className={props.classes.itemIcon}
              classes={{
                root: props.classes.itemIconRoot,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: props.classes.itemPrimary,
              }}
            >
              {item.text}
            </ListItemText>
          </MenuItem>
        ))
      }
    </Menu>
  );
};

export default withStyles(styles)(contextMenu);
