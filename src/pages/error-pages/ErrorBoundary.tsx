import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Result, Space } from 'antd';
import AsnButton from '../../components/Forms/Button';
import { ReactComponent as SmileOutlined } from './images/500.svg';

const ErrorBoundary: React.FC = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <Result
      icon={<SmileOutlined />}
      title="We are sorry, "
      subTitle={<p>AN INTERNET SERVER ERROR HAS OCCURED.</p>}
      extra={<Space size="middle" direction="vertical"><AsnButton type="primary" href='/' > Back Home</AsnButton ></Space>}
    />
  );
};

export default ErrorBoundary;
