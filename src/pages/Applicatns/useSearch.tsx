import React from 'react';
import { Input, Row, Space, Typography } from 'antd';
import { SearchApplicants } from './applicantsTypes';

const { Title } = Typography;

const UseSearch: React.FC<SearchApplicants> = ({
  serachData,
  result,
  setOffset
}) => {
  const onChange = (data: React.ChangeEvent<HTMLInputElement>): void => {
    if (data.target.value === '') {
      serachData(undefined);
      setOffset(0);
    }
  };

  const onPressEnter = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      serachData(e.currentTarget.value.trim());
      setOffset(0);
    }
  };

  return (
    <>
      <Space
        size={[15, 0]}
        style={{ padding: '30px 18px 4px', display: 'flex' }}
      >
        <Title level={4} style={{ color: 'var(--dark-border-ultramarine)' }}>
          Applicants
        </Title>
        <Input
          style={{ width: 300 }}
          onChange={onChange}
          onPressEnter={onPressEnter}
          placeholder="Search..."
        />
        <Row style={{ position: 'absolute', right: '25px', top: '111px', border: '1px solid #D9D9D9', padding: ' 4px 20px' }}>
          Total: {result?.count}
        </Row>
      </Space>
    </>
  );
};

export default UseSearch;
