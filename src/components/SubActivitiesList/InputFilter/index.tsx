import React from 'react';
import styled from 'styled-components';
import { AsnInput, AsnInputNumber } from '../../Forms/Input';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { ReactComponent as SubActivitiesFilterIcon } from '../../../assets/icons/sub-activities-filter.svg';
import { ReactComponent as SubActivitiesFilteredDataIcon } from '../../../assets/icons/filtered-data-icon.svg';
import { Button } from '../filterPopupStyle';
import {
  TChangeEventType,
  TOnSearchChange,
  TOnSearchChangeNumber,
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
const FilterInputNumber = styled(AsnInputNumber)`
  width: 100% !important;
  box-shadow: inset 3px 0px 6px rgba(42, 85, 120, 0.16);
  border-radius: 10px;
  border: none !important;

  input {
    height: 44px !important;
  }
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
  tablePagination,
  inputValues,
  setInputValues
) => {
  const onSearchKeyPress: TChangeEventType = (close) => {
    if (dataIndex !== 'duration' && inputValues[key].length >= 1) {
      setSearchData({
        ...searchData,
        [key]: inputValues[key]?.trim()
      });
      setTablePagination({
        ...tablePagination,
        current: 1
      });
    } else if (dataIndex === 'duration') {
      if (
        typeof inputValues.duration === 'number' &&
        inputValues.duration > 0
      ) {
        setSearchData({
          ...searchData,
          [key]: inputValues.duration
        });
      } else {
        setSearchData({
          ...searchData,
          [key]: undefined
        });
      }
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

  const onSearchChangeNumber: TOnSearchChangeNumber = (value) => {
    setInputValues({
      ...inputValues,
      [key]: value
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
        {key === 'duration'
          ? (
          <FilterInputNumber
            placeholder={`Search ${dataIndex}`}
            onChange={onSearchChangeNumber}
            onPressEnter={() => onSearchKeyPress(close)}
            value={inputValues[key]}
            min={0}
          />
            )
          : (
          <FilterInput
            placeholder={`Search ${dataIndex}`}
            onChange={onSearchChange}
            onPressEnter={() => onSearchKeyPress(close)}
            value={inputValues[key]}
          />
            )}
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
