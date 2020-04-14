import * as React from 'react';

import Modal from 'ui/components/Modal/Modal';
import TextBox from 'ui/components/TextBox/TextBox';

interface IProps {
  open: boolean;
  server: RedisConnectionOptions;
  onClose: (result: IAddConnectionResult) => void;
}

const manageConnectionModal: React.SFC<IProps> = (props): JSX.Element => {
  const [details, setDetails] = React.useState<IConnectionDetails>({
    address: "",
    name: "",
    port: "6379"
  });

  return (
    <Modal
      open={props.open}
      position="right"
      title={`Manage: ${props.server && props.server.name}`}
      buttonPrefs={{
        showCancel: true
      }}
      onClose={(e) => props.onClose({ ok: e.ok, details })}
    >
      <div className="d-flex-col">
        <TextBox placeholder="Name" onValueChanged={(v) => setDetails({ ...details, name: v })} />
        <TextBox placeholder="Address" onValueChanged={(v) => setDetails({ ...details, address: v })} />
        <TextBox placeholder="Port" defaultValue="6379" onValueChanged={(v) => setDetails({ ...details, port: v })} />
      </div>
    </Modal>
  )
};

export default manageConnectionModal;

export interface IAddConnectionResult {
  ok: boolean;
  details?: IConnectionDetails;
}

export interface IConnectionDetails {
  name: string;
  address: string;
  port: string;
}
