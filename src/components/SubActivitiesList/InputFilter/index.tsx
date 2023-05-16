import React from 'react';
import styled from 'styled-components';
import { AsnInput } from '../../Forms/Input';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { ReactComponent as SubActivitiesFilterIcon } from '../../../assets/icons/sub-activities-filter.svg';
import { ReactComponent as SubActivitiesFilteredDataIcon } from '../../../assets/icons/filtered-data-icon.svg';
import { Button } from '../filterPopupStyle';
import {
  TChangeEventType,
  TOnSearchChange,
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
  key,
  setTablePagination,
  inputValues,
  setInputValues
) => {
  const onSearchKeyPress: TChangeEventType = (close) => {
    if (inputValues[key].length >= 1 && dataIndex !== 'duration') {
      setSearchData({
        ...searchData,
        [key]: inputValues[key]?.trim()
      });
      setTablePagination({
        current: 1,
        pageSize: 20
      });
    } else if (inputValues[key].length > 0 && dataIndex === 'duration') {
      const numberValue =
        inputValues[key].length > 0 ? Number(inputValues[key]?.trim()) : undefined;
      setSearchData({
        ...searchData,
        [key]: numberValue
      });
      setTablePagination({
        current: 1,
        pageSize: 20
      });
    } else if (inputValues[key].length === 0) {
      setSearchData({
        ...searchData,
        [key]: undefined
      });
    }
    close();
  };

  const onSearchChange: TOnSearchChange = (e) => {
    setInputValues({
      ...inputValues,
      [key]: e.target.value
    });
  };
  return {
    filterDropdown: ({ close }) => (
      <div
        style={{
          padding: '8px',
          width: '350px',
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem'
        }}
      >
        <FilterInput
          placeholder={`Search ${dataIndex}`}
          onChange={onSearchChange}
          onPressEnter={() => onSearchKeyPress(close)}
          value={inputValues[key]}
        />
        <Button onClick={() => close()}>
          <CloseIcon />
        </Button>
      </div>
    ),
    filterIcon: () =>
      searchData[key] === undefined
        ? (
        <SubActivitiesFilterIcon />
          )
        : (
        <SubActivitiesFilteredDataIcon />
          )
  };
};
