import * as React from 'react';

import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/LibraryAdd';
import KeyIcon from '@material-ui/icons/VpnKey';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import ServerIcon from '@material-ui/icons/DnsRounded';

import Routes from 'ui/routes/Routes';
import NewConnectionDialog from 'ui/components/Dialogs/NewConnection/NewConnectionDialogContainer';

import NavItemCategory from './components/NavItemCategory';
import NavItem from './components/NavItem';
import SettingsItem from './components/SettingsItem';

const recentItems = [
  { id: 'Production', icon: <ServerIcon /> },
];

const savedItems = [
  { id: 'k1', icon: <KeyIcon /> },
  { id: 'k2', icon: <KeyIcon /> },
  { id: 'k3', icon: <KeyIcon /> },
  { id: 'See All', icon: <MoreIcon /> },
];

// tslint:disable-next-line: typedef
const styles = (theme: Theme) => createStyles({
  drawer: {
    display: 'flex',
    flexDirection: 'column'
  },
  drawerPaper: {
    width: `${theme.navWidth}px`
  },
  header: {
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    fontSize: 20,
    color: theme.palette.common.white,
    cursor: 'pointer'
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
});

interface IProps extends WithStyles<typeof styles> { }

const navbar: React.SFC<IProps> = (props): JSX.Element => {
  const [newDialogIsOpen, setNewDialogIsOpen] = React.useState<boolean>(false);
  const [activeItem, setActiveItem] = React.useState<string>('');

  const clickHandler = (navItem: string, handler: () => void): void => {
    setActiveItem(navItem);
    handler();
  };

  return (
    <>
      <Drawer
        className={props.classes.drawer}
        variant="permanent"
        PaperProps={{ style: { width: '275px' } }}
      >
        <List className="flex-grow-1" disablePadding>

          <ListItem
            className={props.classes.header}
            onClick={(): void => clickHandler('', Routes.goHome)}
          >
            Redis Viewer
          </ListItem>

          <NavItemCategory text="Recent" />
          {recentItems.map(({ id, icon }) => (
            <NavItem
              key={id}
              text={id}
              icon={icon}
              active={activeItem === id}
              onClick={(): void => clickHandler(id, () => { })}
            />
          ))}
          <Divider className={props.classes.divider} />

          <NavItemCategory text="Connections" />
          <NavItem
            text="Manage"
            icon={<AppsIcon />}
            active={activeItem === 'Manage'}
            onClick={(): void => clickHandler('Manage', Routes.goTo.manageConnections)}
          />
          <NavItem
            text="Add New Connection"
            icon={<AddIcon />}
            active={activeItem === 'Add New Connection'}
            onClick={(): void => setNewDialogIsOpen(true)}
          />
          <Divider className={props.classes.divider} />

          <NavItemCategory text="Saved Keys" />
          {savedItems.map(({ id, icon }) => (
            <NavItem
              key={id}
              text={id}
              icon={icon}
              active={activeItem === id}
              onClick={(): void => clickHandler(id, () => { })}
            />
          ))}
          <Divider className={props.classes.divider} />

        </List>
        <SettingsItem />
      </Drawer>

      <NewConnectionDialog
        open={newDialogIsOpen}
        onClose={(result): void => setNewDialogIsOpen(false)}
      />

    </>
  );
};

const styledApp = withStyles(styles)(navbar);

export default styledApp;
