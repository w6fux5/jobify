import React from 'react';
import classnames from 'classnames';

const Loading = ({ center }) => {
  return (
    <div
      className={`loading ${classnames({
        'loading-center': center,
      })}`}
    />
  );
};

export default Loading;
