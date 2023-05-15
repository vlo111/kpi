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
  assignCheckboxValues,
  setAssignCheckboxValues
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
  }

  const onCheckboxChange = (value: CheckboxValueType[]): void => {
    if (dataIndex === 'Assigned People') {
      setAssignCheckboxValues(value);
    } else {
      setCheckboxValues(value);
    }
  };

  const onNextClick = (close: any): void => {
    if (checkboxValues?.length > 0 || assignCheckboxValues?.length > 0) {
      setSearchData({
        ...searchData,
        [key]:
          dataIndex === 'Assigned People'
            ? assignCheckboxValues
            : checkboxValues
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
    filterDropdown: ({ close }) => (
      <PopupContainer>
        <PopupHeader>
          <PopupTitle>{dataIndex}</PopupTitle>
          <Button
            onClick={() => {
              close();
              setCheckboxValues([]);
              setAssignCheckboxValues([]);
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
          value={
            dataIndex === 'Assigned People'
              ? assignCheckboxValues
              : checkboxValues
          }
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
              setCheckboxValues([]);
            }}
          >
            Cancel
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
