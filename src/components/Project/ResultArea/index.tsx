import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AsnButton } from '../../Forms/Button';
import InputResult from './InputResult';
import { ConfirmSave } from './Modal';
import { Void } from '../../../types/global';
import { PATHS } from '../../../helpers/constants';
import { IResultsUpdate } from '../../../types/project';

export const InputResultArea: React.FC<IResultsUpdate> = ({ createOrUpdate, isUpdate }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const onSaveModal: Void = () => {
    createOrUpdate();

    if (id !== undefined) {
      const path = `/project/${PATHS.OVERVIEW}`
        .replace(':id', id);

      navigate(path);
    }
  };

  const onCancelModal: Void = () => {
    setOpenConfirmModal(false);
  };

  const onNotSaveModal: Void = () => {
    if (id !== undefined) {
      const path = `/project/${PATHS.OVERVIEW}`
        .replace(':id', id);

      navigate(path);
    }
  };

  const Cancel: Void = () => {
    navigate(-1);
  };

  return (
    <>
      <InputResult />
      <ConfirmSave
        open={openConfirmModal}
        onSave={onSaveModal}
        onCancel={onCancelModal}
        onNotSave={onNotSaveModal}
      />
      <div className="footer">
        {/* eslint-disable-next-line no-constant-condition */}
        {isUpdate
          ? <>
            <AsnButton className="default" onClick={Cancel}>
              Cancel
            </AsnButton>
            <AsnButton className="primary" htmlType="submit">
              Update
            </AsnButton>
          </>
          : <AsnButton className="primary" htmlType="submit">
            Next
          </AsnButton>
        }
      </div>
    </>
  );
};
