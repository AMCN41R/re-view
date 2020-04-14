import * as React from 'react';

import { KeyValue } from 'ui/services/KeysService';

import Button from "ui/components/Button/Button";
import TextLabel from "ui/components/TextLabel/TextLabel";

import RenameKeyModal from "ui/modals/RenameKey/RenameKeyModal";

interface IProps {
  keyInfo?: KeyValue;
}

const testData = {
  name: "Alex",
  id: 123,
  props: [
    "prop-1",
    "prop-2"
  ],
  data: {
    text: "hello"
  }
};

const keyInfo: React.SFC<IProps> = (props): JSX.Element => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  if (!props.keyInfo) {
    return <div>Please select a key.</div>
  }

  return (
    <>
      <div className="flex-2 d-flex-col p-6">
        <div className="d-flex align-items-center">
          <TextLabel
            label="Key"
            text={props.keyInfo.name}
            className="flex-grow-1"
          />
          <Button type="icon" iconClassName="fas fa-pencil-alt fa-fw" className="m-right-6" onClick={() => setModalOpen(true)} />
          <Button type="icon" iconClassName="fas fa-sync-alt fa-fw" className="m-right-6" />
          <Button type="icon" variant="danger" iconClassName="far fa-trash-alt fa-fw" className="m-right-6" />
        </div>
        <div className="d-flex align-items-center">
          <TextLabel
            label="Type"
            text={props.keyInfo.type}
            className="flex-grow-1"
          />
          <TextLabel
            label="TTL"
            text="-1"
            className="flex-grow-1"
          />
          <Button type="icon" iconClassName="far fa-clock fa-fw" className="m-right-6" />
        </div>
        <div className="flex-grow-1 d-flex-col">
          <textarea
            className="key-data flex-grow-1"
            // value={JSON.stringify(testData, null, 2)}
            value={JSON.stringify(props.keyInfo.value, null, 2)}
            readOnly
          />
          <div className="d-flex">
            <Button text="Edit" className="w-100 m-6" />
          </div>
        </div>
      </div>

      <RenameKeyModal
        currentKey={props.keyInfo.name}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default keyInfo;
