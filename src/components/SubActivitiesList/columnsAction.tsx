import React from 'react';
import styled from 'styled-components';
import { IColumnsAction, TAction } from '../../types/api/subActivityTable';
import { ButtonActionTable } from './filterPopupStyle';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 13px;
  width: 2.5rem;
`;

const ColumnsAction: React.FC<IColumnsAction> = ({
  setInputActivityId,
  setOpenCreateSubActivity,
  setOpenConfirmModal,
  record
}) => {
  const onDeleteClick: TAction = (e, id) => {
    e.stopPropagation();
    setOpenConfirmModal(true);
    setInputActivityId(id);
  };

  const onEditClick: TAction = (e, id): void => {
    e.stopPropagation();
    setInputActivityId(id);
    setOpenCreateSubActivity(true);
  };
  return (
    <ActionContainer>
      <ButtonActionTable onClick={(e) => onEditClick(e, record?.subActivity?.id)} className='action'>
        <EditIcon />
      </ButtonActionTable>
      <ButtonActionTable onClick={(e) => onDeleteClick(e, record?.id)} className='action'>
        <DeleteIcon />
      </ButtonActionTable>
    </ActionContainer>
  );
};

export default ColumnsAction;
