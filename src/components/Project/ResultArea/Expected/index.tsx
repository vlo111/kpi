import React, { useState } from 'react';

import Boxes from '../Boxes';
import { AsnForm } from '../../../Forms/Form';
import { ConfirmModal } from '../../../Forms/Modal/Confirm';
import { IProjectResultAreaDelete, OnDeleteExpectedHandler } from '../../../../types/project';
import { Void } from '../../../../types/global';

const ExpectedResult: React.FC<{ resultId: number }> = ({ resultId }) => {
  const form = AsnForm.useFormInstance();

  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<boolean>();
  const [selectDeleteId, setSelectDeleteId] = useState<IProjectResultAreaDelete>();

  const onDelete: OnDeleteExpectedHandler = (remove, field) => {
    setOpenDeleteResultModal(true);
    setSelectDeleteId({ remove, field });
  };

  const onSubmitDelete: Void = () => {
    if (selectDeleteId !== undefined) {
      const { remove, field } = selectDeleteId;

      const deleteName = 'deletedExpectedResultIds';

      const deletedFields = form.getFieldValue(deleteName) ?? [];

      const currentId = form.getFieldsValue().resultAreas[resultId].expectedResults[field ?? ''].id;

      if (currentId !== undefined) {
        const updateDeletedIds = deletedFields.concat(currentId);

        form.setFieldsValue({ [deleteName]: updateDeletedIds });
      }

      remove(field);
    }
    setOpenDeleteResultModal(false);
  };

  return (
    <>
      <div className="panel">
        <AsnForm.List name={[resultId, 'expectedResults']}>
          {(expectedList, { add, remove }) => (
            <Boxes
              type={'expected'}
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
        onSubmit={onSubmitDelete}
        onCancel={() => setOpenDeleteResultModal(false)}
      />
    </>
  );
};

export default ExpectedResult;
