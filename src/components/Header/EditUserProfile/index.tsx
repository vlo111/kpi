import React from 'react'
import styled from 'styled-components'
import { AddManagerHandle, ICreateTemplate } from '../../../types/project'
import { AsnModal } from '../../Forms/Modal'
import { AsnButton } from '../../Forms/Button'
import { Form } from '../../Forms/Form'
import AsnInput from '../../Forms/Input'
import { Name } from '../../../helpers/constants'
import { Space } from 'antd'

const UserModal = styled(AsnModal)`
`

const EditProfile: React.FC<ICreateTemplate> = ({
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal
}) => {
  const handleCancel: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false)
  }
  const onCancelClick: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false)
  }
  const [form] = Form.useForm()

  return (
    <UserModal
      footer={false}
      open={isOpenCreateActivityModal}
      title="User Profile"
      onCancel={handleCancel}
      style={{ width: '100%', maxHeight: '90vh', overflowY: 'auto' }}
    >
        <Form
          id="create-template-form"
          form={form}
          layout="vertical"
        >
          <Form.Item {...Name('First Name', ' First Name')} >
            <AsnInput placeholder="First Name" />
          </Form.Item>
          <Form.Item {...Name('Last Name', ' Last Name')}>
            <AsnInput placeholder="Last Name" />
          </Form.Item>
          <Form.Item {...Name('Phone', ' Phone')}>
            <AsnInput placeholder="Phone" />
          </Form.Item>
          <Form.Item {...Name('Organization', ' Organization')}>
            <AsnInput placeholder="Organization" />
          </Form.Item>
          <Form.Item {...Name('Position ', ' Position ')}>
            <AsnInput placeholder="Position " />
          </Form.Item>
        <Space style={{ width: '100%', justifyContent: 'space-evenly' }}>
          <AsnButton onClick={onCancelClick}>Cancel</AsnButton>
          <AsnButton type="primary" htmlType="submit">
          Save changes
          </AsnButton>
        </Space>
      </Form>
    </UserModal>
  )
}

export default EditProfile
