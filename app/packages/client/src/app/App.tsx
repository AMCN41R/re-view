import * as React from 'react';

import AppRouter from 'ui/routes/Router';

import NavBar from "ui/components/NavBar/NavBar";
import Sidebar from "ui/components/Sidebar/Sidebar";

const app: React.SFC = (props): JSX.Element => {

  return (
    <div className="m-top-0">
      <div className="main-view d-flex">
        <Sidebar />
        <div className="flex-grow-1 d-flex-col">
          <NavBar />
          <div className="flex-grow-1">
            <AppRouter />
          </div>
          <div style={{
            height: "18px",
            borderTop: "1px solid #d0d0d0",
          }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default app;
