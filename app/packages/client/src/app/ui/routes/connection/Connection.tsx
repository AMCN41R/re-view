import * as React from 'react';

import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core';

import KeyTree from './components/KeyTree';
import { TreeNode } from 'react-treebeard';

// const testData: TreeNode = {
//   name: 'root',
//   toggled: true,
//   children: [
//     {
//       name: 'parent',
//       children: [
//         { name: 'child1' },
//         { name: 'child2' }
//       ]
//     },
//     {
//       name: 'loading parent',
//       loading: true,
//       children: []
//     },
//     {
//       name: 'parent',
//       children: [
//         {
//           name: 'nested parent',
//           children: [
//             { name: 'nested child 1' },
//             { name: 'nested child 2' }
//           ]
//         }
//       ]
//     }
//   ]
// };

export interface IRequiredProps {
  connection: IRedisConnection;
  db: string;
  data: TreeNode;
}

interface IProps extends IRequiredProps, WithStyles<typeof styles> { }

// tslint:disable-next-line:typedef
const styles = (theme: Theme) => createStyles({

});

const connection: React.SFC<IProps> = (props): JSX.Element => {

  return (
    <div>
      {props.connection && props.connection.name} | {props.db}
      {
        props.data
          ? <KeyTree data={props.data} />
          : <div>Loading...</div>
      }
    </div>
  );
};

export default withStyles(styles)(connection);
