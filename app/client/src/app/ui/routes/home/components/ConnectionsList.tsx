import * as React from 'react';
import { CircularProgress } from '@material-ui/core';

interface IProps {
  isLoading: boolean;
  connections: IRedisConnection[];
}

const connectionsList: React.SFC<IProps> = (props): JSX.Element => (
  <div>
    {
      props.isLoading
        ? <CircularProgress />
        : props.connections.map((x, idx) => {
          return (
            <div key={idx}>
              {x.name}
            </div>
          );
        })
    }
  </div>
);

export default connectionsList;
