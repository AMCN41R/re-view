import * as React from 'react';

import Routes from '../../Routes';

import CardButton from 'ui/components/CardButton/CardButton';

interface IProps {
  name: string;
  dbInfo: DbInfo[];
}

const gotoDatabase = (name: string, db: string): void => Routes.goTo.database(name, db);

const serverView: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <>
      <div className="flex-grow-1 d-flex-col p-12">
        <div className="m-bottom-12">
          Please select a server and database.
        </div>

        <div className="flex-grow-1 db-grid-container">
          {
            props.dbInfo.map((db, i) => (
              <CardButton
                key={i}
                text={`${db.db} [${db.keys}]`}
                iconClassName="fas fa-database fa-fw"
                className="db-grid-item"
                onClick={() => gotoDatabase(props.name, `${db.db}`)}
              />
            ))
          }
        </div>

      </div>
    </>
  );
};

export default serverView;
