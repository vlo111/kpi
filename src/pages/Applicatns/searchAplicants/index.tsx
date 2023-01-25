import React from 'react';
import { AutoComplete, Space, Typography } from 'antd';

const { Title } = Typography;
interface SearchApplicants {
  search: any
  setSearch: any
}

const SearchApplicantsList: React.FC<SearchApplicants> = ({ search, setSearch }) => {
  const onChange = (data: string): void => {
    setSearch(data);
  };

  return (
    <>
    <Space size={[15, 0]} style={{ padding: '0 18px' }}>
<Title level={4} style={{ color: '#2A5578' }}>Applicants</Title>
<AutoComplete
          value={search}
          style={{ width: 300 }}
          onChange={onChange}
          placeholder="Search..."
        />
    </Space>
    </>
  );
};

export default SearchApplicantsList;
