import React from 'react';
import styled from 'styled-components';
import { AsnInput } from '../../Forms/Input';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { Button } from '../filterPopupStyle';

const FilterInput = styled(AsnInput)`
  width: 100% !important;
  box-shadow: inset 3px 0px 6px rgba(42, 85, 120, 0.16);
  border-radius: 10px;
  border: none !important;
  :hover {
    border: none !important;
  }
  :focus {
    box-shadow: inset 3px 0px 6px rgba(42, 85, 120, 0.16) !important;
  }
`;

export const getColumnSearchProps = (
  dataIndex: string,
  setSearchData: any,
  searchData: any,
  key: string
): any => {
  const onSearchChange = (e: any): void => {
    if (e.target.value.length >= 3) {
      setSearchData({
        ...searchData,
        [key]: e.target.value
      });
    } else if (e.target.value.length === 0) {
      setSearchData({
        ...searchData,
        [key]: undefined
      });
    }
  };
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }: any) => (
      <div
        style={{
          padding: 8,
          width: '350px',
          display: 'flex',
          flexDirection: 'row',
          gap: '3rem'
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.code === 'Enter') {
            close();
          }
        }}
      >
        <FilterInput
          placeholder={`Search ${dataIndex}`}
          onChange={onSearchChange}
          defaultValue={searchData[key]}
        />
        <Button onClick={() => close()}>
          <CloseIcon />
        </Button>
      </div>
    )
  };
};
