import React from 'react';
import styled from 'styled-components';
import { AsnModal } from '..';
import { ConfirmModalType } from '../../../../types/global';
import { AsnButton } from '../../Button';

const ConfirmModalWrapper = styled(AsnModal)`
  .ant-modal-content {
    padding: 70px 96px 60px 96px !important;
  }
  .wrapper {
    display: flex;
    flex-direction: column;

    .title {
      font-size: var(--headline-font-size);
      color: var(--dark-2);
      text-align: center;
    }

    .buttons {
      display: flex;
      justify-content: space-around;

      button {
        border-radius: 10px !important;
      }
    }
  }
`;

export const ConfirmModal: React.FC<ConfirmModalType> = ({
  open,
  title,
  onSubmit,
  onClose,
  onCancel,
  yes,
  no,
  closable = false,
  styles
}) => {
  return (
    <ConfirmModalWrapper
      open={Boolean(open)}
      width={'600px'}
      onCancel={onClose ?? undefined}
      footer={false}
      closable={closable}
      centered
    >
      <div className="wrapper" style={styles}>
        <div className="title">{title}</div>
        <div className="buttons">
          <AsnButton className="default" onClick={onCancel}>
            {no}
          </AsnButton>
          <AsnButton className="primary" onClick={onSubmit}>
            {yes}
          </AsnButton>
        </div>
      </div>
    </ConfirmModalWrapper>
  );
};
