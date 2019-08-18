import * as React from 'react';

import {
  WithStyles,
  Theme,
  createStyles,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide
} from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> {
  open: boolean;
  title?: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onClose?: (result: IDialogResult) => void;
}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({});

const transition = (props: any): JSX.Element => <Slide direction="up" {...props} />;

const confirmDialog: React.SFC<IProps> = (props): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = (ok: boolean): void => {
    setOpen(false);
    if (props.onClose) {
      props.onClose({ ok });
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={transition}
      keepMounted
      onClose={(): void => handleClose(false)}
      fullWidth
    >
      <DialogTitle>
        {props.title || 'Confirm'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.description || 'Are you sure?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(): void => handleClose(false)} color="secondary">
          {props.cancelButtonText || 'Cancel'}
        </Button>
        <Button onClick={(): void => handleClose(true)} color="primary">
          {props.confirmButtonText || 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(confirmDialog);
