import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Name, PATHS, VALIDATE_MESSAGES } from '../../../../../helpers/constants'
import {
  AddManagerHandle,
  ICreateTemplate
} from '../../../../../types/project'
import { rules } from '../../../../../utils/ProjectUtils'
import { AsnButton } from '../../../../Forms/Button'
import { Form } from '../../../../Forms/Form'
import AsnInput, { TextArea } from '../../../../Forms/Input'
import { AsnModal } from '../../../../Forms/Modal'

const CreateTemplateContainer = styled.div`
  .buttonContainer {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`

const CreateTemplate: React.FC<ICreateTemplate> = ({
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal
}) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onCancelClick: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false)
  }

  const handleCancel: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false)
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }

  const onFinish: any = (values: any) => {
    console.log(values, 'failed')
  }

  const onNextClick = (): void => {
    navigate(PATHS.TEMPLATECREATE)
  }

  const initFields = [
    {
      name: ['category'],
      value: 'Courses'
    },
    {
      name: ['templateName'],
      value: 'templateName'
    },
    {
      name: ['description'],
      value: 'description'
    }
  ]

  return (
    <AsnModal
      footer={false}
      open={isOpenCreateActivityModal}
      title="Create activity Template"
      onCancel={handleCancel}
    >
      <CreateTemplateContainer>
        <Form
          id="create-template-form"
          form={form}
          fields={initFields}
          layout="vertical"
          validateMessages={VALIDATE_MESSAGES}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item {...Name('category', 'Category')}>
            <AsnInput />
          </Form.Item>
          <Form.Item
            {...Name('templateName', 'Template Name')}
            {...rules(2, 256)}
          >
            <AsnInput placeholder="One section course " />
          </Form.Item>
          <Form.Item
            {...Name('description', 'Description')}
            rules={[{ min: 0, max: 2048 }]}
          >
            <TextArea placeholder="Activity Template for long-term courses. The course has one section." />
          </Form.Item>
          <div className="buttonContainer">
            <AsnButton onClick={onCancelClick}>Cancel</AsnButton>
            <AsnButton type="primary" htmlType="submit" onClick={onNextClick}>
              Next
            </AsnButton>
          </div>
        </Form>
      </CreateTemplateContainer>
    </AsnModal>
  )
}

export default CreateTemplate
