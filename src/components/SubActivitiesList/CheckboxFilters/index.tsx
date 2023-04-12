import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { Button } from '../columns';
import { AsnCheckbox } from '../../Forms/Checkbox';
import { Typography } from 'antd';
import { IStatusItem } from '../../../types/api/subActivityTable';
import { AsnButton } from '../../Forms/Button';

const { Title } = Typography;

const PopupContainer = styled.div`
  padding: 1rem 1rem 2rem;
  width: 25vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CustomCheckbox = styled(AsnCheckbox)`
  margin-left: 0px !important;
`;

const PopupTitle = styled(Title)`
  font-size: var(--headline-font-size) !important;
  font-weight: var(--font-semibold) !important;
`;

const PopupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 3rem;
`;

export const getColumnSearchPropsCheckbox = (
  dataIndex: string,
  filteredValue: IStatusItem[]
): any => {
  if (filteredValue !== undefined && dataIndex === 'Organization') {
    filteredValue = filteredValue?.map((item: any) => {
      return {
        name: item.title,
        value: item.title,
        id: item.id
      };
    });
  } else if (filteredValue !== undefined && dataIndex === 'Assigned People') {
    filteredValue = filteredValue?.map((item: any) => {
    //   const name = `${item.firstname} ${item.lastname}`;
      return {
        name: item?.firstname,
        value: item.id,
        id: item.id
      };
    });
  }

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }: any) => (
      <PopupContainer onKeyDown={(e) => e.stopPropagation()}>
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
        >
          {filteredValue?.map((item: IStatusItem) => (
            <CustomCheckbox value={item.value} key={item.id}>
              {item.name}
            </CustomCheckbox>
          ))}
        </AsnCheckbox.Group>
        <ButtonContainer>
          <AsnButton className="default">Cancel</AsnButton>
          <AsnButton className="primary">Next</AsnButton>
        </ButtonContainer>
      </PopupContainer>
    )
  };
};
