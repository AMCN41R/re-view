import * as React from 'react';

import {
  WithStyles, Theme, createStyles, withStyles,
  Card,
  CardHeader,
  CardActionArea,
  CardActions,
  Avatar,
  IconButton,
  Collapse,
  CardContent,
} from '@material-ui/core';

import ServerIcon from '@material-ui/icons/DnsRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveFavoriteIcon from '@material-ui/icons/Favorite';
import AddFavouriteIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ContextMenu from 'ui/components/ContextMenu';
import ConfirmDialog from 'ui/components/Dialogs/ConfirmDialog';

import DatabaseGrid from './DatabaseGrid';

interface IProps extends WithStyles<typeof styles> {
  connection: IRedisConnection;
}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  card: {
    // display: 'flex',
    margin: `${theme.spacing.unit}px`,
  },
  cardActions: {
    marginLeft: 'auto',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  content: {
    backgroundColor: theme.palette.grey[200],
    borderTop: '2px solid',
    borderTopColor: theme.palette.grey[400],
  },
});

const databases = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

const server: React.SFC<IProps> = (props): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleExpandClick = (): void => setExpanded(!expanded);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);

  return (
    <>
      <Card className={props.classes.card}>
        <div className="d-flex">
          <CardActionArea onClick={handleExpandClick}>
            <CardHeader
              avatar={
                <Avatar className={props.classes.avatar}>
                  <ServerIcon />
                </Avatar>
              }
              title={props.connection.name}
              subheader="September 14, 2016"
            />
          </CardActionArea>
          <CardActions disableActionSpacing>
            <IconButton className={props.classes.cardActions}>
              {
                props.connection.isFavourite
                  ? <RemoveFavoriteIcon />
                  : <AddFavouriteIcon />
              }
            </IconButton>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </CardActions>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={props.classes.content}>
            <DatabaseGrid databases={databases} connection={props.connection} />
          </CardContent>
        </Collapse>
        <ContextMenu
          anchorEl={anchorEl}
          onClose={handleClose}
          items={[
            { text: 'Edit', icon: <EditIcon />, onClick: (): void => { } },
            { text: 'Delete', icon: <DeleteIcon />, onClick: (): void => setModalOpen(true) },
          ]}
        />
      </Card>

      <ConfirmDialog
        open={modalOpen}
        onClose={(): void => setModalOpen(false)}
      />
    </>
  );
};

export default withStyles(styles)(server);
