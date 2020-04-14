import * as React from 'react';
import clsx from 'clsx';

type ModalPosition = "top" | "bottom" | "left" | "right";

type ButtonPrefs = {
  okButtonText?: string;
  cancelButtonText?: string;
  okFirst?: boolean;
  showCancel?: boolean;
}

interface IProps {
  open: boolean;
  title: string;
  position: ModalPosition;
  preventClickAway?: boolean;
  buttonPrefs?: ButtonPrefs;
  hideFooter?: boolean;
  onClose: (result: IModalResult) => void;
}

const getPositionClass = (position: ModalPosition): string => {
  switch (position) {
    case "top":
      return "modal-content-top";
    case "bottom":
      return "modal-content-bottom";
    case "left":
      return "modal-content-left";
    case "right":
      return "modal-content-right";
    default:
      return "modal-content-bottom";
  }
}

const modal: React.SFC<IProps> = (props): JSX.Element => {
  if (!props.open) {
    return <div hidden />
  }

  const content = clsx(
    'd-flex-col',
    'modal-content',
    getPositionClass(props.position)
  );

  const close = (ok: boolean) => {
    props.onClose({ ok });
  }

  const okText = (props.buttonPrefs && props.buttonPrefs.okButtonText) || "Ok";
  const cancelText = (props.buttonPrefs && props.buttonPrefs.cancelButtonText) || "Cancel";

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        if (props.preventClickAway) {
          return;
        }

        close(false);
      }}
    >
      <div
        className={content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{props.title}</h2>
        </div>
        <div className="modal-body flex-grow-1">
          {props.children}
        </div>
        {
          !props.hideFooter &&
          <div className="modal-footer d-flex justify-content-end p-6">
            {
              props.buttonPrefs &&
              props.buttonPrefs.showCancel &&
              <button className="btn" onClick={() => close(false)}>{cancelText}</button>
            }
            <button className="btn m-left-6" onClick={() => close(true)}>{okText}</button>
          </div>
        }
      </div>

    </div>
  );
};

export default modal;

export interface IModalResult {
  ok: boolean;
}
