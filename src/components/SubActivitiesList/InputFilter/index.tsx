import React from 'react';
import styled from 'styled-components';
import { AsnInput } from '../../Forms/Input';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { Button } from '../filterPopupStyle';
import {
  TChangeEventType,
  TSearchPropsType
} from '../../../types/api/subActivityTable';

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

export const getColumnSearchProps: TSearchPropsType = (
  dataIndex,
  setSearchData,
  searchData,
  key
) => {
  const onSearchChange: TChangeEventType = (e) => {
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
    filterDropdown: ({ close }: any) => (
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
          value={searchData[key]}
        />
        <Button onClick={() => close()}>
          <CloseIcon />
        </Button>
      </div>
    )
  };
};
