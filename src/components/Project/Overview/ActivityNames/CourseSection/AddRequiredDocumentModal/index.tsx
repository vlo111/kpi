import React from 'react'
import styled from 'styled-components'
import { Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import {
  AddManagerHandle,
  IAddRequiredDocument
} from '../../../../../../types/project'
import { AsnButton } from '../../../../../Forms/Button'
import { Form } from '../../../../../Forms/Form'
import AsnInput, { AsnNumberInput } from '../../../../../Forms/Input'
import { AsnModal } from '../../../../../Forms/Modal'

const CreateTemplateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const AddRequiredDocumentModal: React.FC<IAddRequiredDocument> = ({
  isOpenAddDocumentsModal,
  setIsOpenAddDocumentsModal,
  requiredDocuments,
  setRequiredDocuments,
  restField,
  name
}) => {
  const [modalForm] = Form.useForm()
  const onCancelClick: AddManagerHandle = () => {
    setIsOpenAddDocumentsModal(false)
  }

  const handleCancel: AddManagerHandle = () => {
    setIsOpenAddDocumentsModal(false)
    modalForm.resetFields()
  }

  const onFinish = (values: any): void => {
    setIsOpenAddDocumentsModal(false)
    setRequiredDocuments([...requiredDocuments, { id: uuidv4(), ...values }])
    modalForm.resetFields()
  }

  return (
    <AsnModal
      footer={false}
      open={isOpenAddDocumentsModal}
      title="Add required document name and quantity"
      onCancel={handleCancel}
      width={'42%'}
    >
      <CreateTemplateContainer>
        <Form name="dynamic_form_item" onFinish={onFinish} form={modalForm} autoComplete="off"
>
          <Space direction="vertical">
            <Space>
              <Form.Item
                name="documentName"
              >
                <AsnInput />
              </Form.Item>
              <Form.Item name="documentCount">
                <AsnNumberInput />
              </Form.Item>
            </Space>
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
              <AsnButton onClick={onCancelClick}>Cancel</AsnButton>
              <AsnButton type="primary" htmlType="submit">
                Add
              </AsnButton>
            </Space>
          </Space>
        </Form>
      </CreateTemplateContainer>
    </AsnModal>
  )
}

export default AddRequiredDocumentModal
