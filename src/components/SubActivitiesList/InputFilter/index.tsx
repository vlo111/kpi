import React from 'react';
import styled from 'styled-components';
import { AsnInput } from '../../Forms/Input';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import { Button } from '../columns';

// import { AsnButton } from '../../Forms/Button';

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

export const getColumnSearchProps = (dataIndex: string): any => {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }: any) => (
      <div
        style={{
          padding: 8,
          width: '350px',
          display: 'flex',
          flexDirection: 'row',
          gap: '3rem'
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <FilterInput placeholder={`Search ${dataIndex}`} />
        <Button onClick={() => close()}>
          <CloseIcon />
        </Button>
      </div>
    )
  };
};
