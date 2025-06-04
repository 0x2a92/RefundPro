import React from 'react';

const Row = (props) => (
  <div className={'row ' + (props.className ? props.className : '')}>
    {props.children}
  </div>
);

export default Row;
