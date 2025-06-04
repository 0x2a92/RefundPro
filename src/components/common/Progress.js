import React from 'react';
import './style.css';

const Progress = (props) => (
  <div
    className="progress-bar"
    style={{
      height: props.height ? props.height : '20px',
      width: '100%',
      overflow: 'hidden'
    }}
  >
    <div
      className="progress-thumb"
      style={{
        height: '100%',
        width: props.progress ? Math.round(props.progress) + '%' : '0%'
      }}
    ></div>
  </div>
);

export default Progress;
