import React from 'react';
import { AutoComplete, Space, Typography } from 'antd';
import { SearchApplicants } from './applicantsTypes';

const { Title } = Typography;

const ApplicantsSearch: React.FC<SearchApplicants> = ({ filters, serachData }) => {
  const onChange = (data: any): void => {
    serachData(data);
  };

  return (
    <>
    <Space size={[15, 0]} style={{ padding: '40px 18px' }}>
<Title level={4} style={{ color: 'var(--dark-border-ultramarine)' }}>Applicants</Title>
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

export default ApplicantsSearch;
