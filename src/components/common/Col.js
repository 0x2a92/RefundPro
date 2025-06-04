import React from 'react';

const Col = (props) => (
  <div
    className={
      'col col-md-' +
      props.span +
      ' ' +
      (props.className ? props.className : '')
    }
  >
    {props.children}
  </div>
);

export default Col;
