import { connect } from 'react-redux';

import HomePage from './HomePage';

interface IStateProps {
  connections: IRedisConnection[];
}

const connectedHomePage = connect((state: IAppState): IStateProps =>
  ({
    connections: state.connections.connections
  })
)(HomePage);

export default connectedHomePage;
