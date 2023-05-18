import React from 'react';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { ReactComponent as SubActivitiesFilterIcon } from '../../../assets/icons/sub-activities-filter.svg';
import { ReactComponent as SubActivitiesFilteredDataIcon } from '../../../assets/icons/filtered-data-icon.svg';
import { AsnCheckbox } from '../../Forms/Checkbox';
import {
  IStatusItem,
  TSearchPropsCheckboxType
} from '../../../types/api/subActivityTable';
import { AsnButton } from '../../Forms/Button';
import {
  Button,
  ButtonContainer,
  CustomCheckbox,
  PopupContainer,
  PopupHeader,
  PopupTitle
} from '../filterPopupStyle';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

export const getColumnSearchPropsCheckbox: TSearchPropsCheckboxType = (
  dataIndex,
  filteredValue,
  setSearchData,
  searchData,
  key,
  setCheckboxValues,
  checkboxValues,
  setTablePagination
) => {
  if (filteredValue !== undefined && dataIndex === 'Organization') {
    filteredValue = filteredValue?.map((item) => {
      return {
        name: item?.title,
        value: item?.id,
        id: item?.id
      };
    });
  } else if (filteredValue !== undefined && dataIndex === 'Assigned People') {
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
    filteredValue = filteredValue?.map((item) => {
      return {
        name: item?.title,
        value: item?.id,
        id: item?.id
      };
    });
  } else if (filteredValue !== undefined && dataIndex === 'Region') {
    filteredValue = filteredValue?.map((item) => {
      return {
        name: item?.title,
        value: item?.id,
        id: item?.id
      };
    });
  }
  const onCheckboxChange = (value: CheckboxValueType[]): void => {
    setCheckboxValues({
      ...checkboxValues,
      [key]: value
    });
  };

  const onNextClick = (close: { (): void, (): void }): void => {
    if (checkboxValues[key]?.length > 0) {
      setSearchData({
        ...searchData,
        [key]: checkboxValues[key]
      });
      close();
      setTablePagination({
        current: 1,
        pageSize: 20
      });
    } else {
      setSearchData({
        ...searchData,
        [key]: undefined
      });
      close();
      setTablePagination({
        current: 1,
        pageSize: 20
      });
    }
  };

  return {
    filterDropdown: ({ close }) => (
      <PopupContainer>
        <PopupHeader>
          <PopupTitle>{dataIndex}</PopupTitle>
          <Button
            onClick={() => {
              close();
              setCheckboxValues({ ...checkboxValues, [key]: [] });
            }}
          >
            <CloseIcon />
          </Button>
        </PopupHeader>
        <AsnCheckbox.Group
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
          onChange={onCheckboxChange}
          value={checkboxValues[key]}
        >
          {filteredValue?.map((item: IStatusItem) => (
            <CustomCheckbox value={item.value} key={item.id}>
              {item.name}
            </CustomCheckbox>
          ))}
        </AsnCheckbox.Group>
        <ButtonContainer>
          <AsnButton
            className="default"
            onClick={() => {
              close();
              setCheckboxValues({ ...checkboxValues, [key]: [] });
              setSearchData({
                ...searchData,
                [key]: undefined
              });
            }}
          >
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
