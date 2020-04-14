import * as React from 'react';

import Modal from 'ui/components/Modal/Modal';
import TextBox from 'ui/components/TextBox/TextBox';

interface IProps {
  currentKey: string;
  open: boolean;
  onClose: (result: IRenameKeyResult) => void;
}

const renameKeyModal: React.SFC<IProps> = (props): JSX.Element => {
  const [newName, setNewName] = React.useState<string>(null);

  return (
    <Modal
      open={props.open}
      position="top"
      title="Rename Key"
      buttonPrefs={{
        showCancel: true
      }}
      onClose={(e) => props.onClose({ ok: e.ok, newName })}
    >
      <div className="d-flex-col">
        <div>
          {props.currentKey}
        </div>
        <TextBox placeholder="Name" onValueChanged={(v) => setNewName(v)} />
      </div>
    </Modal>
  )
};

export default renameKeyModal;

export interface IRenameKeyResult {
  ok: boolean;
  newName?: string;
}
