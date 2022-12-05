import React from 'react';
import { Result, Space } from 'antd';
import { AsnButton } from '../../components/Forms/Button';
import { ReactComponent as SmileOutlined } from './images/404.svg';
// import { SmileOutlined } from '@ant-design/icons';

const PageNotFound: React.FC = () => {
  return (
    <Result
      icon={<SmileOutlined />}
      title="Error 404 - Page Not Found"
      subTitle={
        <>
          <h3>The page you requested could not be found.</h3>{' '}
          <p>The page you requested could not be found.</p>{' '}
          <p>We’re working on it :)</p>
        </>
      }
      extra={
        <Space size="middle" direction="vertical">
          <AsnButton type="primary" href="/">
            Back Home
          </AsnButton>
        </Space>
      }
    />
  );
};

export default PageNotFound;
