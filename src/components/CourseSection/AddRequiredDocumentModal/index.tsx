import React from 'react';
import { Form, Space } from 'antd';
import { AsnModal } from '../../Forms/Modal';
import { AsnButton } from '../../Forms/Button';
import { AsnInput, AsnInputNumber } from '../../Forms/Input';
import { FormFinish } from '../../../types/global';
import { AddManagerHandle, IAddRequiredDocument } from '../../../types/project';
import { VALIDATE_MESSAGES } from '../../../helpers/constants';
import styled from 'styled-components';
import useCreateRequiredDocs from '../../../api/Activity/Template/Sections/useCreateRequiredDocs';

const CustomInputNumber = styled(AsnInputNumber)`
  display: flex;
  align-items: center;
  border: 1px solid var(--dark-border-ultramarine) !important;
`;

const AddRequiredDocumentModal: React.FC<IAddRequiredDocument> = ({
  isOpenAddDocumentsModal,
  setIsOpenAddDocumentsModal,
  sectionId,
  refetch
}) => {
  const [modalForm] = Form.useForm();
  const { mutate: createRequiredDocs } = useCreateRequiredDocs({
    onSuccess: () => {
      refetch();
    }
  });

  const handleCancel: AddManagerHandle = () => {
    setIsOpenAddDocumentsModal(false);
    modalForm.resetFields();
  };

  const onFinish: FormFinish = (values) => {
    createRequiredDocs({
      id: sectionId,
      data: {
        title: values.documentName,
        count: values.documentCount
      }
    });

    setIsOpenAddDocumentsModal(false);
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
                <AsnInput placeholder="CV.docx" />
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
