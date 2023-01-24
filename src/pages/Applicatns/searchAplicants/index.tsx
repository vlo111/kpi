import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const onSearch = (value: any): any => {
  console.log(value);
};

const SearchApplicantsList: React.FC = () => {
  return (
    <>
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
    </>
  );
};

export default SearchApplicantsList;
