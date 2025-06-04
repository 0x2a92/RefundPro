import React, { useState } from 'react';
import { Result } from 'antd';
import './style.css';

const CheckForm = (props) => {
  return (
    <section className="main-container">
      <Result status="success" title="Let me know what I have to do next" />
    </section>
  );
};

export default CheckForm;
