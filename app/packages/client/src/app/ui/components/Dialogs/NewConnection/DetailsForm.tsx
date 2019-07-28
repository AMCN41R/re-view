import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';

interface IProps extends WithStyles<typeof styles> {
  existingConnectionNames: string[];
  isOpen: boolean;
  onChange?: (opts: IRedisConnection) => void;
}

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

interface IConnectionDetails {
  name: string;
  host: string;
  port: number;
}

const defaultDetails = {
  host: '',
  name: '',
  port: 6379
};

const handleChange = (
  name: keyof IConnectionDetails,
  props: IProps,
  state: IConnectionDetails,
  setState: (s: React.SetStateAction<IConnectionDetails>) => void
): (event: React.ChangeEvent<HTMLInputElement>) => void =>
  (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newState = { ...state, [name]: event.target.value };
    setState(newState);
    if (props.onChange) {
      props.onChange(newState);
    }
  };

const detailsForm: React.SFC<IProps> = (props): JSX.Element => {
  const [details, setDetails] = React.useState<IConnectionDetails>(defaultDetails);
  const [nameInUse, setNameInUse] = React.useState<boolean>(false);

  React.useEffect((): void => {
    if (!props.isOpen) {
      setDetails(defaultDetails);
    }
  }, [props.isOpen]);

  React.useEffect((): void => {
    setNameInUse(props.existingConnectionNames.indexOf(details.name) !== -1);
  }, [details.name]);

  return (
    <div className={props.classes.container}>
      <TextField
        id="connection-name"
        label="Connection Name"
        className={props.classes.textField}
        value={details.name}
        onChange={handleChange('name', props, details, setDetails)}
        margin="normal"
        helperText={nameInUse ? 'This name is already in use.' : 'A unique name for the connection.'}
        error={nameInUse}
        required={true}
      />
      <TextField
        id="connection-host"
        label="Host"
        className={props.classes.textField}
        value={details.host}
        onChange={handleChange('host', props, details, setDetails)}
        margin="normal"
        helperText="The redis host."
        required={true}
      />
      <TextField
        id="connection-port"
        label="Port"
        className={props.classes.textField}
        value={details.port}
        onChange={handleChange('port', props, details, setDetails)}
        margin="normal"
        type="number"
      />
    </div>
  );
};

export default withStyles(styles)(detailsForm);
