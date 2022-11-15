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
    padding: 4.3vh 1.3vw 4.5vh 4.3vh !important;
    background: var(--white);
    border-radius: 20px;

    .ant-modal-body{
      max-height: 62.5vh;
      overflow-y: scroll;
      overflow-x: hidden;
      padding-right: 1.8vw;
    }
    .ant-modal-close{
      top: -25px;
      right: -14px;
    }
    .ant-modal-content{
      box-shadow: none !important;
      position: inherit !important;
      padding: 0;
    }
    .ant-modal-title {
      font-size: var(--headline-font-size);
    }
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
        <Space style={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
