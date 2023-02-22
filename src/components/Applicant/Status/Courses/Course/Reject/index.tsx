import React from 'react';
import { Space, Typography } from 'antd';
import styled from 'styled-components';

import { AsnForm } from '../../../../../Forms/Form';
import { AsnModal } from '../../../../../Forms/Modal';
import { AsnButton } from '../../../../../Forms/Button';
import { AsnTextArea } from '../../../../../Forms/Input';
import { AsnCheckboxGroup } from '../../../../../Forms/Checkbox';

import { FormFinish } from '../../../../../../types/global';
import { IApproveModalProps } from '../../../../../../types/applicant';
import { optionsReason } from '../../../../../../helpers/constants';
import useRejectApplicant from '../../../../../../api/Applicant/useReject';

const { Title } = Typography;

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
      .reason-title {
        font-weight: var(--font-normal);
      }

      .reason-list {
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;

        .ant-checkbox-wrapper {
          margin-bottom: 8px;
        }
      }

      .name {
        display: flex;
        font-size: var(--base-font-size);
        color: var(--dark-3);
        padding-top: 8px;

        flex-wrap: wrap;
        max-height: 200px;
        overflow: auto;
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

        .ant-form-item {
          width: 100%;

          .ant-row {
            width: 100%;
          }
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
  applicants,
  open,
  onCancel
}) => {
  const [form] = AsnForm.useForm();

  const { mutate: rejectApplicant } = useRejectApplicant();

  const onFinish: FormFinish = () => {
    rejectApplicant({
      ...form.getFieldsValue(),
      sectionId: open,
      applicantIds: applicants.map((a) => a.id)
    });

    void onCancel();
  };

  return (
    <AntModal
      title="Status Rejection"
      onCancel={onCancel}
      open={open !== ''}
      footer={false}
      width="35%"
      closable
      centered
    >
      <AsnForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Space
          align="center"
          className="name"
          style={{
            justifyContent: applicants.length === 1 ? 'center' : 'start'
          }}
        >
          {applicants.map((a, index) => (
            <p key={a.id}>{`${a.fullName}${
              applicants.length - 1 !== index ? ',' : ''
            }`}</p>
          ))}
        </Space>
        <Title className="reason-title" level={5}>
          Reasons for rejection*
        </Title>
        <AsnForm.Item name="reasonsForRejection">
          <AsnCheckboxGroup className="reason-list" options={optionsReason} />
        </AsnForm.Item>
        <Space className="add-note">
          <p>Add note:</p>
        </Space>
        <Space.Compact block className="text-area">
          <AsnForm.Item
            name="note"
            rules={[
              { required: true, message: 'Please enter Note' },
              {
                min: 2,
                max: 128,
                message:
                  'The field is required. Must be between 2 and 128 characters.'
              }
            ]}
          >
            <AsnTextArea></AsnTextArea>
          </AsnForm.Item>
        </Space.Compact>
        <Space className="buttons">
          <Space>
            <AsnButton className="default" onClick={onCancel}>
              Cancel
            </AsnButton>
          </Space>
          <Space>
            <AsnButton htmlType="submit" className="primary">
              Reject
            </AsnButton>
          </Space>
        </Space>
      </AsnForm>
    </AntModal>
  );
};

export default ApproveModal;
