import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { ReactComponent as SubActivitiesFilterIcon } from '../../../assets/icons/sub-activities-filter.svg';
import { ReactComponent as SubActivitiesFilteredDataIcon } from '../../../assets/icons/filtered-data-icon.svg';
import { Calendar } from 'antd';
import moment, { Moment } from 'moment';
import {
  Button,
  ButtonContainer,
  PopupContainer,
  PopupHeader,
  PopupTitle
} from '../filterPopupStyle';
import { AsnButton } from '../../Forms/Button';
import {
  TChangeEventType,
  TColumnCalendarPropsType
} from '../../../types/api/subActivityTable';

const PopupCalendar = styled(Calendar)`
  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
    border-radius: 50% !important;
    background: var(--dark-border-ultramarine) !important;
    ::before {
      border: none !important;
    }
  }
  .ant-picker-cell-inner {
    :hover {
      border-radius: 50% !important;
    }
  }

  .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner:before {
    border: 1px solid var(--dark-border-ultramarine) !important;
    border-radius: 50% !important;
  }

  .ant-picker-calendar-header .ant-select {
    :hover {
      .ant-select-selector {
        border: 1px solid var(--dark-border-ultramarine) !important;
      }
    }
  }
`;

export const getColumnCalendarProps: TColumnCalendarPropsType = (
  dataIndex,
  setSearchData,
  searchData,
  key,
  tablePagination,
  setTablePagination
) => {
  let newDate: string;
  const onCalendarChange = (date: Moment): void => {
    newDate = moment(date).format();
  };

  const onNextClick: TChangeEventType = (close) => {
    if (newDate !== undefined) {
      setSearchData({
        ...searchData,
        [key]: newDate
      });
      close();
      setTablePagination({
        ...tablePagination,
        current: 1
      });
    }
  };

  const onCleanClick: TChangeEventType = (close) => {
    setSearchData({
      ...searchData,
      [key]: undefined
    });
    close();
    setTablePagination({
      ...tablePagination,
      current: 1
    });
  };

  return {
    filterDropdown: ({ close }) => (
      <PopupContainer width="25vw">
        <PopupHeader>
          <PopupTitle>{dataIndex}</PopupTitle>
          <Button onClick={() => close()}>
            <CloseIcon />
          </Button>
        </PopupHeader>
        <PopupCalendar fullscreen={false} onChange={onCalendarChange} />
        <ButtonContainer>
          <AsnButton className="default" onClick={() => onCleanClick(close)}>
            Clean
          </AsnButton>
          <AsnButton className="primary" onClick={() => onNextClick(close)}>
            Next
          </AsnButton>
        </ButtonContainer>
      </PopupContainer>
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
