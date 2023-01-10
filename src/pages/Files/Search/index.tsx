import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import styled from 'styled-components';
import { UploadDocument } from '../Upload';

const SearchImportData = styled.div`
    width: 100%;
    .ant-select-show-search.ant-select:not(.ant-select-customize-input) .ant-select-selector{
      border-radius: 10px;
      color: var(--dark-4);
    }
`;
const Upload = styled.div`
    width: 100%;
    height: calc(100vh - 188px);
    background: var(--white);

`;

const Search = styled.div`
  background-color: var(--primary-light-3);
    height: 72px;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 0 10px;
`;
export const SearchImport: React.FC = () => {
  const [value, setValue] = useState('');

  const onSelect = (data: string): void => {
    console.log('onSelect', value);
  };

  const onChange = (data: string): void => {
    setValue(data);
  };

  return (
    <SearchImportData>
      <Search>
      <AutoComplete
        value={value}
        style={{ width: 200 }}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="Search..."
      /></Search>
      <Upload><UploadDocument/></Upload>
    </SearchImportData>
  );
};
