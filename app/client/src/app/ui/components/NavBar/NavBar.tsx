import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Settings from '@material-ui/icons/Settings';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

import NewConnectionDialog from 'ui/components/Dialogs/NewConnection/NewConnectionDialogContainer';

interface IProps extends WithStyles<typeof styles> {

}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({

});

const nav: React.SFC<IProps> = (props): JSX.Element => {
  const [newDialogIsOpen, setNewDialogIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className="pointer"
          >
            Redis Viewer
          </Typography>
          <div className="flex-grow-1" />
          <Tooltip title="New Connection">
            <IconButton
              onClick={(): void => setNewDialogIsOpen(true)}
              color="inherit"
            >
              <LibraryAdd />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton
              onClick={(e): void => console.log('Settings')}
              color="inherit"
            >
              <Settings />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <NewConnectionDialog
        open={newDialogIsOpen}
        onClose={(result): void => setNewDialogIsOpen(false)}
      />
    </>
  );
};

export default withStyles(styles)(nav);
