import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Routes from 'ui/routes/Routes';

interface IProps extends WithStyles<typeof styles> {
  connectionName: string;
}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  card: {
    display: 'flex',
    margin: `${theme.spacing.unit}px`,
  },
});

const header: React.SFC<IProps> = (props): JSX.Element => {
  return (
    <Card className={props.classes.card}>
      <CardActions disableActionSpacing>
        <IconButton onClick={(): void => Routes.goBack()}>
          <ChevronLeftIcon />
        </IconButton>
      </CardActions>
      <CardHeader
        title={props.connectionName}
        subheader="Databases"
      />
    </Card>
  );
};

export default withStyles(styles)(header);
