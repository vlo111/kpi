import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import Boxes from '../Boxes';
import { AsnForm } from '../../../Forms/Form';
import { ConfirmModal } from '../../../Forms/Modal/Confirm';

const ExpectedResult: React.FC<{ resultId: number }> = ({ resultId }) => {
  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<boolean>();
  const [selectDeleteId, setSelectDeleteId] = useState<{
    remove: (name: number | number[]) => void
    field: number
  }>();

  const onDelete: (
    remove: (index: number | number[]) => void,
    field: number
  ) => void = (remove, field) => {
    setOpenDeleteResultModal(false);
    setSelectDeleteId({ remove, field });
  };

  return (
    <>
      <div className="panel">
        <AsnForm.List name={[resultId, 'expectedResults']}>
          {(expectedList, { add, remove }) => (
            <Boxes
              type={'expected'}
              key={uuid()}
              add={add}
              onDelete={onDelete}
              remove={remove}
              list={expectedList}
              resultId={resultId}
            />
          )}
        </AsnForm.List>
      </div>
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Delete"
        no="Cancel"
        open={openDeleteResultModal}
        title="Are you sure you want to delete  the field?"
        onSubmit={() => {
          selectDeleteId?.remove(selectDeleteId.field);
          setOpenDeleteResultModal(false);
        }}
        onCancel={() => setOpenDeleteResultModal(false)}
      />
    </>
  );
};

export default ExpectedResult;
