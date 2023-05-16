import React from 'react';
import { IColumnsAction, TAction } from '../../types/api/subActivityTable';
import { Button } from './filterPopupStyle';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '13px',
        width: '40px'
      }}
    >
      <Button onClick={(e) => onEditClick(e, record?.subActivity?.id)}>
        <EditIcon />
      </Button>
      <Button onClick={(e) => onDeleteClick(e, record?.id)}>
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default ColumnsAction;
