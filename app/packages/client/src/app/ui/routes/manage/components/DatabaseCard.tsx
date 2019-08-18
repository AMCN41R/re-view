import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';

import StorageIcon from '@material-ui/icons/Storage';

import Routes from 'ui/routes/Routes';

interface IProps extends WithStyles<typeof styles> {
  id: string;
  connectionName: string;
  keyCount: number;
}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  card: {
    display: 'flex',
    margin: `${theme.spacing.unit}px`,
  },
  cardActions: {
    marginLeft: 'auto',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
});

const database: React.SFC<IProps> = (props): JSX.Element => {
  return (
    <Card className={props.classes.card}>
      <CardActionArea onClick={(): void => Routes.goTo.connection(props.connectionName, props.id)}>
        <CardHeader
          avatar={
            <Avatar className={props.classes.avatar}>
              <StorageIcon />
            </Avatar>
          }
          title={props.id}
          subheader={`${props.keyCount} keys`}
        />
      </CardActionArea>
    </Card>
  );
};

export default withStyles(styles)(database);
