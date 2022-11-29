import { Alert } from 'antd';
import React from 'react';
import { IAnsAlert } from '../../types/global';

const ErrorBeckend: React.FC<IAnsAlert> = ({ message, type }) => {
  return (
    <Alert message={message} type={type} showIcon style={{ marginBottom: '24px' }} />
  );
};

export default ErrorBeckend;
