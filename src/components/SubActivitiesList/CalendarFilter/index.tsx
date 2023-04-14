import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { Button } from '../columns';
import { Calendar } from 'antd';
import {
  ButtonContainer,
  PopupContainer,
  PopupHeader,
  PopupTitle
} from '../filterPopupStyle';
import { AsnButton } from '../../Forms/Button';

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

  .ant-picker-calendar-header .ant-select {
    :hover {
      .ant-select-selector {
        border: 1px solid var(--dark-border-ultramarine) !important;
      }
    }
  }
`;

export const getColumnCalendarProps = (dataIndex: string): any => {
  const onPanelChange = (day: any): any => {
    console.log(day, 'onPanelChange');
  };

  const onCalendarChange = (date: any): any => {
    console.log(date, 'onCalendarChange');
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
        <PopupCalendar fullscreen={false} onPanelChange={onPanelChange} onChange={onCalendarChange}/>
        <ButtonContainer>
          <AsnButton className="default" onClick={() => close()}>
            Cancel
          </AsnButton>
          <AsnButton className="primary">Next</AsnButton>
        </ButtonContainer>
      </PopupContainer>
    )
  };
};
