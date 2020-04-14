import * as React from 'react';

import InfoModal from "./Info/InfoModal";
import SettingsModal from "./Settings/SettingsModal";

const navbar: React.SFC = (props): JSX.Element => {
  const [infoOpen, setInfoOpen] = React.useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false);

  return (
    <>
      <ul className="nav d-flex">
        <li className="flex-grow-1" />
        <li className="nav-item">
          <a href="https://github.com/AMCN41R/re-view" target="_blank">
            <i className="fab fa-github fa-fw"></i>
          </a>
        </li>
        <li className="nav-item">
          <a onClick={() => setInfoOpen(true)}>
            <i className="fas fa-info fa-fw"></i>
          </a>
        </li>
        <li className="nav-item">
          <a onClick={() => setSettingsOpen(true)}>
            <i className="fas fa-cog fa-fw"></i>
          </a>
        </li>

        {/* MODALS */}
        <InfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />
        <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </ul>
    </>
  );
};

export default navbar;
