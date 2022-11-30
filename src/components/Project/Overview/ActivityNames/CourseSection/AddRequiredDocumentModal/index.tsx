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
import { VALIDATE_MESSAGES } from '../../../../../../helpers/constants'
import { FormFinish } from '../../../../../../types/global'

const CreateTemplateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const AddRequiredDocumentModal: React.FC<IAddRequiredDocument> = ({
  isOpenAddDocumentsModal,
  setIsOpenAddDocumentsModal,
  requiredDocuments,
  setRequiredDocuments
}) => {
  const [modalForm] = Form.useForm()

  const handleCancel: AddManagerHandle = () => {
    setIsOpenAddDocumentsModal(false)
    modalForm.resetFields()
  }

  const onFinish: FormFinish = (values) => {
    setIsOpenAddDocumentsModal(false)
    setRequiredDocuments([...requiredDocuments, { id: uuidv4(), ...values }])
    modalForm.resetFields()
  }

  const initFields = [
    {
      name: 'documentName',
      value: ''
    },
    {
      name: 'documentCount',
      value: 1
    }
  ]

  return (
    <AsnModal
      footer={false}
      open={isOpenAddDocumentsModal}
      title="Add required document name and quantity"
      onCancel={handleCancel}
      width={'42%'}
    >
      <CreateTemplateContainer>
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
                <AsnNumberInput min={1} max={100} />
              </Form.Item>
            </Space>
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
              <AsnButton onClick={handleCancel}>Cancel</AsnButton>
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
