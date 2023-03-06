import React from 'react';
import { AutoComplete, Row, Space, Typography } from 'antd';
import { SearchApplicants } from './applicantsTypes';

const { Title } = Typography;

const UseSearch: React.FC<SearchApplicants> = ({
  filters,
  serachData,
  result
}) => {
  const onChange = (data: string): void => {
    serachData(data);
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
        <AutoComplete
          value={filters?.search}
          style={{ width: 300 }}
          onChange={onChange}
          placeholder="Search..."
        />
        <Row style={{ position: 'absolute', right: '25px', top: '111px', border: '1px solid #D9D9D9', padding: ' 4px 20px' }}>
          Total members: {result?.count}
        </Row>
      </Space>
    </>
  );
};

export default UseSearch;
