import React from 'react';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { AsnCheckbox } from '../../Forms/Checkbox';
import { IStatusItem } from '../../../types/api/subActivityTable';
import { AsnButton } from '../../Forms/Button';
import {
  Button,
  ButtonContainer,
  CustomCheckbox,
  PopupContainer,
  PopupHeader,
  PopupTitle
} from '../filterPopupStyle';

export const getColumnSearchPropsCheckbox = (
  dataIndex: string,
  filteredValue: IStatusItem[],
  setSearchData: any,
  searchData: any,
  key: string
): any => {
  let checkboxValue: any;
  if (filteredValue !== undefined && dataIndex === 'Organization') {
    filteredValue = filteredValue?.map((item: any) => {
      return {
        name: item?.title,
        value: item?.id,
        id: item?.id
      };
    });
  } else if (filteredValue !== undefined && dataIndex === 'Assigned People') {
    filteredValue = filteredValue?.map((item: any) => {
      const fullName: string = `${item?.firstname as string} ${
        item?.lastname as string
      }`;
      return {
        name: fullName,
        value: item?.id,
        id: item?.id
      };
    });
  } else if (
    filteredValue !== undefined &&
    dataIndex === 'Sub Activities manager'
  ) {
    filteredValue = filteredValue?.map((item) => {
      const fullName: string = `${item?.firstname as string} ${
        item?.lastname as string
      }`;
      return {
        name: fullName,
        value: item?.id,
        id: item?.id
      };
    });
  } else if (filteredValue !== undefined && dataIndex === 'Sector') {
    filteredValue = filteredValue?.map((item: any) => {
      return {
        name: item?.title,
        value: item?.id,
        id: item?.id
      };
    });
  }

  const onCheckboxChange = (value: any): void => {
    checkboxValue = value;
  };

  const onNextClick = (close: any): void => {
    if (checkboxValue?.length > 0) {
      setSearchData({
        ...searchData,
        [key]: checkboxValue
      });
      close();
    } else {
      setSearchData({
        ...searchData,
        [key]: undefined
      });
      close();
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
      <PopupContainer onKeyDown={(e: any) => e.stopPropagation()}>
        <PopupHeader>
          <PopupTitle>{dataIndex}</PopupTitle>
          <Button onClick={() => close()}>
            <CloseIcon />
          </Button>
        </PopupHeader>
        <AsnCheckbox.Group
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
          onChange={onCheckboxChange}
        >
          {filteredValue?.map((item: IStatusItem) => (
            <CustomCheckbox value={item.value} key={item.id}>
              {item.name}
            </CustomCheckbox>
          ))}
        </AsnCheckbox.Group>
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
