import React from 'react';
import styled from 'styled-components';

import { AsnButton } from '../../../Forms/Button';
import { AsnModal } from '../../../Forms/Modal';
import { IResulAreaConfirmModal } from '../../../../types/project';

const Modal = styled(AsnModal)`
  &.project-modal-overlay {
    .ant-modal-content {
      padding: 3rem 2rem 2rem;
    }

    .title {
      display: flex;
      justify-content: center;
      font-size: var(--headline-font-size);
      color: var(--dark-3);
    }

    .buttons {
      display: flex;
      justify-content: space-evenly;
      margin-top: 4rem;
    }
  }
`;

export const ConfirmSave: React.FC<IResulAreaConfirmModal> = ({ open, onSave, onCancel, onNotSave }) => {
  return (
    <Modal
      open={open}
      width={'600px'}
      footer={false}
      onCancel={onCancel}
      className="project-modal-overlay"
      centered
    >
      <div className="project-modal">
        <div className="title">Do you want to save changes ?</div>
        <div className="buttons">
          <AsnButton className="primary" onClick={onSave}>
            Save
          </AsnButton>
          <AsnButton className="default" onClick={onNotSave}>
            Don’t Save
          </AsnButton>
          <AsnButton className="default" onClick={onCancel}>
            Cancel
          </AsnButton>
        </div>
      </div>
    </Modal>
  );
};
