import * as React from 'react';

interface IProps {
  loading: boolean;
}

const loading: React.SFC<IProps> = (props): JSX.Element => {

  if (props.loading) {
    return (
      <div className="loading-section">
        <i className="icon fas fa-cog fa-spin"></i>
        {/* <div className="text">Getting things ready...</div> */}
      </div>
    );
  }

  return (
    <>
      {props.children}
    </>
  );
};

export default loading;
