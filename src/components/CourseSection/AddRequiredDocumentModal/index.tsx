import React from 'react';
import { Form, Space } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { AsnModal } from '../../Forms/Modal';
import { AsnButton } from '../../Forms/Button';
import { AsnInput, AsnInputNumber } from '../../Forms/Input';
import { FormFinish } from '../../../types/global';
import { AddManagerHandle, IAddRequiredDocument } from '../../../types/project';
import { VALIDATE_MESSAGES } from '../../../helpers/constants';
import styled from 'styled-components';

const CustomInputNumber = styled(AsnInputNumber)`
  display: flex;
  align-items: center;
  border: 1px solid var(--dark-border-ultramarine) !important;
`;

const AddRequiredDocumentModal: React.FC<IAddRequiredDocument> = ({
  isOpenAddDocumentsModal,
  setIsOpenAddDocumentsModal,
  requiredDocuments,
  setRequiredDocuments
}) => {
  const [modalForm] = Form.useForm();

  const handleCancel: AddManagerHandle = () => {
    setIsOpenAddDocumentsModal(false);
    modalForm.resetFields();
  };

  const onFinish: FormFinish = (values) => {
    setIsOpenAddDocumentsModal(false);
    setRequiredDocuments([...requiredDocuments, { id: uuidv4(), ...values }]);
    modalForm.resetFields();
  };

  const initFields = [
    {
      name: 'documentName',
      value: ''
    },
    {
      name: 'documentCount',
      value: 1
    }
  ];

  return (
    <AsnModal
      footer={false}
      open={isOpenAddDocumentsModal}
      title="Add required document name and quantity"
      onCancel={handleCancel}
      width={'42%'}
    >
      <Space
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Form
          name="dynamic_form_item"
          onFinish={onFinish}
          form={modalForm}
          autoComplete="off"
          validateMessages={VALIDATE_MESSAGES}
          fields={initFields}
        >
          <Space direction="vertical">
            <Space>
              <Form.Item
                name="documentName"
                rules={[
                  {
                    required: true,
                    min: 1,
                    max: 255,
                    message: 'Please enter a valid Field'
                  }
                ]}
              >
                <AsnInput placeholder="example:" />
              </Form.Item>
              <Form.Item name="documentCount">
                <CustomInputNumber min={1} max={100} className="primary" />
              </Form.Item>
            </Space>
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
              <AsnButton onClick={handleCancel} className="default">
                Cancel
              </AsnButton>
              <AsnButton className="primary" htmlType="submit">
                Add
              </AsnButton>
            </Space>
          </Space>
        </Form>
      </Space>
    </AsnModal>
  );
};

export default AddRequiredDocumentModal;
