import * as React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorText from 'ui/components/ErrorText';

import DetailsForm from './DetailsForm';

export interface IDialogProps {
  open: boolean;
  onClose?: (result: IDialogResult) => void;
}

interface IProps extends IDialogProps {
  newStatus: NewConnectionStatus;
  existingConnectionNames: string[];
  onSave: (opts: IRedisConnection) => void;
}

const transition = (props: any): JSX.Element => <Slide direction="up" {...props} />;

const handleClose = (ok: boolean, props: IProps, setState: (s: React.SetStateAction<boolean>) => void): void => {
  setState(false);
  if (props.onClose) {
    props.onClose({
      ok
    });
  }
};

const infoDialog: React.SFC<IProps> = (props): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [opts, setOpts] = React.useState<IRedisConnection>(null);

  React.useEffect((): void => {
    setIsOpen(props.open);
  }, [props.open]);

  React.useEffect((): void => {
    console.log(props.newStatus);
    if (props.newStatus === 'created') {
      handleClose(true, props, setIsOpen);
    }
  }, [props.newStatus]);

  return (
    <Dialog
      open={isOpen}
      fullWidth={true}
      maxWidth="md"
      TransitionComponent={transition}
      keepMounted
      onClose={(): void => handleClose(false, props, setIsOpen)}
    >
      <DialogTitle>
        New Connection
      </DialogTitle>
      <DialogContent>
        <DetailsForm
          existingConnectionNames={props.existingConnectionNames}
          isOpen={isOpen}
          onChange={(opts): void => setOpts(opts)}
        />
        {
          props.newStatus === 'failed' &&
          <ErrorText message="Could not connect to redis server." />
        }
      </DialogContent>
      <DialogActions>
        {
          props.newStatus === 'requesting' && <CircularProgress />
        }
        <Button
          onClick={(): void => handleClose(false, props, setIsOpen)}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={(): void => props.onSave(opts)}
          color="primary"
          disabled={props.newStatus === 'requesting'}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default infoDialog;
