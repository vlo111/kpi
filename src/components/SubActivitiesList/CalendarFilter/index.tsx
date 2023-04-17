import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { Calendar } from 'antd';
import moment from 'moment';
import {
  Button,
  ButtonContainer,
  PopupContainer,
  PopupHeader,
  PopupTitle
} from '../filterPopupStyle';
import { AsnButton } from '../../Forms/Button';
import { TVoid } from '../../../types/global';

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

  .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner:before{
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

export const getColumnCalendarProps = (
  dataIndex: string,
  setSearchData: any,
  searchData: any,
  key: string
): any => {
  let newDate: string;
  const onCalendarChange = (date: any): any => {
    newDate = moment(date).format();
  };

  const onNextClick: TVoid = (close) => {
    setSearchData({
      ...searchData,
      [key]: newDate
    });
    close();
  };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }: any) => (
      <PopupContainer
        width="25vw"
        onKeyDown={(e: any) => e.stopPropagation()}
        getPopupContainer={(trigger: HTMLElement) =>
          trigger.parentElement as HTMLElement
        }
      >
        <PopupHeader>
          <PopupTitle>{dataIndex}</PopupTitle>
          <Button onClick={() => close()}>
            <CloseIcon />
          </Button>
        </PopupHeader>
        <PopupCalendar fullscreen={false} onChange={onCalendarChange} />
        <ButtonContainer>
          <AsnButton className="default" onClick={() => close()}>
            Cancel
          </AsnButton>
          <AsnButton className="primary" onClick={() => onNextClick(close)}>
            Next
          </AsnButton>
        </ButtonContainer>
      </PopupContainer>
    )
  };
};
