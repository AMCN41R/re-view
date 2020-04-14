import * as React from 'react';

import Button from 'ui/components/Button/Button';
import Input from 'ui/components/Input/Input';

interface IProps {

}

const keyToolbar: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <div className="d-flex align-items-center" style={{
      padding: "12px 6px",
      borderBottom: "1px solid #d0d0d0"
    }}>
      <Button
        type="icon"
        iconClassName="fas fa-sync-alt fa-fw"
        className="h-100"
      />
      <Button
        type="icon"
        iconClassName="fas fa-plus fa-fw"
        className="h-100 m-right-6"
      />
      <Input search className="flex-grow-1" />
    </div>
  );
};

export default keyToolbar;
