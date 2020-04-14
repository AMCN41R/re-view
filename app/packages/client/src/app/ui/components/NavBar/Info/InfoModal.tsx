import * as React from 'react';

import Modal, { IModalResult } from "ui/components/Modal/Modal";

interface IProps {
  open: boolean;
  onClose: (result: IModalResult) => void;
}

const infoModal: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <Modal
      open={props.open}
      title="About REview"
      onClose={props.onClose}
      position="right"
    >
      <div>INFO</div>
    </Modal>
  );
};

export default infoModal;
