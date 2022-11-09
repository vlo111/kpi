import React from 'react'
import styled from 'styled-components'
import { AddManagerHandle, ICreateTemplate } from '../../../types/project'
import { AsnModal } from '../../Forms/Modal'
import { AsnButton } from '../../Forms/Button'
import { Form } from '../../Forms/Form'
import AsnInput from '../../Forms/Input'
import { Name } from '../../../helpers/constants'

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
  const CreateTemplateContainer = styled.div`
  .buttonContainer {
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: relative;
    top: 20px;
  }
`

  return (
    <AsnModal
      footer={false}
      open={isOpenCreateActivityModal}
      title="User Profile"
      onCancel={handleCancel}
      style={{ minHeight: '671px', minWidth: '614px', padding: '32px 0px 32px' }}
    >
           <CreateTemplateContainer>
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
        <div className="buttonContainer">
          <AsnButton onClick={onCancelClick}>Cancel</AsnButton>
          <AsnButton type="primary" htmlType="submit">
          Save changes
          </AsnButton>
        </div>
      </Form>
    </CreateTemplateContainer>
    </AsnModal>
  )
}

export default EditProfile
