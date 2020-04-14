import * as React from 'react';

import Routes from '../Routes';

import CardButton from 'ui/components/CardButton/CardButton';
import ManageConnectionModal from 'ui/modals/ManageConnection/ManageConnectionModal';

interface IProps {
  connections: RedisConnectionOptions[];
}

const gotoServer = (name: string): void => Routes.goTo.server(name);

const homePage: React.SFC<IProps> = (props): JSX.Element => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedServer, setSelectedServer] = React.useState<RedisConnectionOptions>();

  return (
    <>
      <div className="flex-grow-1 p-12">
        <div className="m-bottom-12">
          Please select a server and database.
        </div>

        {
          props.connections.map((con, i) => (
            <CardButton
              key={i}
              text={con.name}
              iconClassName="fas fa-server fa-fw"
              className="m-bottom-12"
              onClick={() => gotoServer(con.name)}
              showOptionsButton={true}
              onOptionsClick={() => {
                setSelectedServer(con);
                setModalOpen(true);
              }}
            />
          ))
        }

      </div>

      {/* MODALS */}
      <ManageConnectionModal
        open={modalOpen}
        server={selectedServer}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default homePage;
