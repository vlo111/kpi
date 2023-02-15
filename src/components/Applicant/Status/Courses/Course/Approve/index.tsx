import React, { useState } from 'react';
import { Space } from 'antd';
import styled from 'styled-components';

import { AsnButton } from '../../../../../Forms/Button';
import { AsnModal } from '../../../../../Forms/Modal';
import { AsnTextArea } from '../../../../../Forms/Input';

import {
  IApproveModalProps,
  OnNoteHandler
} from '../../../../../../types/applicant';
import { Void } from '../../../../../../types/global';
import useApproveApplicant from '../../../../../../api/Applicant/useApprove';

const AntModal = styled(AsnModal)`
  .ant-modal-content {
    padding: 2rem;

    .ant-modal-header {
      padding-bottom: 0;

      .ant-modal-title {
        color: var(--dark-2);
      }
    }

    .ant-modal-body {
      .name {
        display: flex;
        justify-content: center;
        font-size: var(--base-font-size);
        color: var(--dark-3);
        padding-top: 8px;
      }

      .add-note {
        font-size: var(--font-size-semismall);
        color: var(--dark-2);
      }

      .text-area {
        textarea {
          min-height: 8rem;
          resize: initial;
        }
      }
      
      .buttons {
        display: flex;
        justify-content: center;
        height: 5rem;
        align-items: self-end;
        
        > .ant-space-item {
          display: flex;
          justify-content: center;
          width: 10rem;
        }
        
        button {
          width: 130px;
        }
      }
    }
  }
`;

const ApproveModal: React.FC<IApproveModalProps> = ({
  applicant,
  open,
  onCancel
}) => {
  const [noteText, setNoteText] = useState<string>();
  const { mutate: approveApplicant } = useApproveApplicant();

  const onApprove: Void = () => {
    approveApplicant({
      sectionId: open,
      applicantId: applicant.id,
      note: noteText
    });

    void onCancel();
  };

  const onNoteHandler: OnNoteHandler = (event) => {
    setNoteText(event.target.value);
  };

  return (
    <AntModal
      title="Status Approval"
      onCancel={onCancel}
      open={open !== ''}
      footer={false}
      width="35%"
      closable
      centered
    >
      <Space align="center" className="name">
        <p>{applicant.fullName}</p>
      </Space>
      <Space className="add-note">
        <p>Add note:</p>
      </Space>
      <Space.Compact block className="text-area">
        <AsnTextArea value={noteText} onChange={onNoteHandler}></AsnTextArea>
      </Space.Compact>
      <Space className="buttons">
        <Space>
          <AsnButton className="default" onClick={onCancel}>
            Cancel
          </AsnButton>
        </Space>
        <Space>
          <AsnButton onClick={onApprove} className="primary">Approve</AsnButton>
        </Space>
      </Space>
    </AntModal>
  );
};

export default ApproveModal;