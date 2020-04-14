import * as React from 'react';

import Routes from 'ui/routes/Routes';
import AddConnectionModal from "ui/modals/AddConnection/AddConnectionModal";

interface IProps { }

const sidebar: React.SFC<IProps> = (props): JSX.Element => {
  const [addModalOpen, setAddModalOpen] = React.useState<boolean>(false);

  return (
    <div className="sidebar d-flex">
      <div className="d-flex-col flex-grow-1">
        <div style={{
          paddingLeft: "12px",
          paddingTop: "12px",
          cursor: "pointer"
        }}
          onClick={() => Routes.goHome()}
        >
          <img src="/img/brand.png" height="52" alt="RE_VIEW" />
        </div>

        <div className="sidebar-group">
          <div className="sidebar-group-title">Connections</div>
          <div className="sidebar-group-item" onClick={Routes.goHome}>
            <i className="fas fa-th fa-fw"></i>
            <div className="flex-grow-1">Manage Connections</div>
          </div>
          <div className="sidebar-group-item" onClick={() => setAddModalOpen(true)}>
            <i className="fas fa-plus-square fa-fw"></i>
            <div className="flex-grow-1">Add New Connection</div>
          </div>
        </div>

        <div className="sidebar-group">
          <div className="sidebar-group-title">Recent</div>
          <div className="sidebar-group-item">
            <i className="fas fa-server fa-fw"></i>
            <div className="flex-grow-1">Sandstorm</div>
            <i className="fas fa-database fa-fw"></i>
            <div className="m-right-12">[1]</div>
          </div>
          <div className="sidebar-group-item">
            <i className="fas fa-server fa-fw"></i>
            <div className="flex-grow-1">Local</div>
            <i className="fas fa-database fa-fw"></i>
            <div className="m-right-12">[0]</div>
          </div>
        </div>


        {/* <div className="sidebar-group">
        <div className="sidebar-group-title">Saved Keys</div>
        <div className="sidebar-group-item">
          <i className="fas fa-key fa-fw"></i>
          <div className="flex-grow-1">Some:Key</div>
        </div>
        <div className="sidebar-group-item">
          <i className="fas fa-key fa-fw"></i>
          <div className="flex-grow-1">And:another:key</div>
        </div>
        <div className="sidebar-group-item">
          <i className="fas fa-key fa-fw"></i>
          <div className="flex-grow-1">Last:one</div>
        </div>
      </div> */}

        {/* MODALS */}
        <AddConnectionModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
        />

      </div>
    </div>
  );
};

export default sidebar;
