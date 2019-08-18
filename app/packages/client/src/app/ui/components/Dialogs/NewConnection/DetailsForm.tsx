import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles, FormControlLabel, Checkbox } from '@material-ui/core';

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
  password?: string;
  useSsl: boolean;
}

const defaultDetails = {
  host: '',
  name: '',
  password: '',
  port: 6379,
  useSsl: false
};

const handleChange = (
  name: keyof IConnectionDetails,
  props: IProps,
  state: IConnectionDetails,
  setState: (s: React.SetStateAction<IConnectionDetails>) => void
): (event: React.ChangeEvent<HTMLInputElement>) => void =>
  (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (name === 'useSsl') {
      console.log("STATE", state.useSsl);
      console.log("CHECKED", event.target.checked);
      console.log("VALUE", event.target.value);
    }
    const newState = {
      ...state,
      // [name]: event.target.value
      [name]: name === 'useSsl' ? event.target.checked : event.target.value
    };
    setState(newState);
    if (props.onChange) {
      props.onChange({
        host: newState.host,
        name: newState.name,
        port: newState.port,
        password: newState.password,
        useSsl: newState.useSsl,
        isFavourite: false
      });
    }
  };

const detailsForm: React.SFC<IProps> = (props): JSX.Element => {
  const [details, setDetails] = React.useState<IConnectionDetails>(defaultDetails);
  const [nameInUse, setNameInUse] = React.useState<boolean>(false);
  const [useSsl, setUseSsl] = React.useState<boolean>(false);

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
        id="connection-password"
        label="Password (optional)"
        className={props.classes.textField}
        value={details.password}
        onChange={handleChange('password', props, details, setDetails)}
        margin="normal"
        helperText="The password (of required)."
        required={false}
        type="password"
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
      <FormControlLabel
        control={
          <Checkbox
            checked={details.useSsl}
            onChange={handleChange('useSsl', props, details, setDetails)}
            value={`${useSsl}`}
            color="primary"
          />
        }
        label="Use SSL"
      />
    </div>
  );
};

export default withStyles(styles)(detailsForm);
