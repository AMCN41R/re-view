import * as React from 'react';

import Modal, { IModalResult } from "ui/components/Modal/Modal";

interface IProps {
  open: boolean;
  onClose: (result: IModalResult) => void;
}

const settingsModal: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <Modal
      open={props.open}
      title="Application Settings"
      onClose={props.onClose}
      position="right"
    >
      <div>SETTINGS</div>
    </Modal>
  );
};

export default settingsModal;
