import React from 'react';
import { AutoComplete, Space, Typography } from 'antd';
import { SearchApplicants } from './applicantsTypes';

const { Title } = Typography;

const UseSearch: React.FC<SearchApplicants> = ({ filters, serachData }) => {
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
      </Space>
    </>
  );
};

export default UseSearch;