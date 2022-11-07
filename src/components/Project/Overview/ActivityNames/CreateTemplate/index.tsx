import React from 'react'
import styled from 'styled-components'
import { AddManagerHandle, ICreateTemplate } from '../../../../../types/project'
import { rules } from '../../../../../utils/ProjectUtils'
import { AsnButton } from '../../../../Forms/Button'
import { Form } from '../../../../Forms/Form'
import AsnInput, { TextArea } from '../../../../Forms/Input'
import { AsnModal } from '../../../../Forms/Modal'

const CreateTemplateContainer = styled.div`
    .buttonContainer{
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

`

const CreateTemplate: React.FC<ICreateTemplate> = ({ isOpenCreateActivityModal, setIsOpenCreateActivityModal }) => {
  const [form] = Form.useForm()

  const onCancelClick: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false)
  }

  const onNextClick: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false)
  }

  const handleCancel: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false)
  }

  return (
        <AsnModal footer={false} open={isOpenCreateActivityModal} title="Create activity Template" onCancel={handleCancel} >
            <CreateTemplateContainer>
                <Form
                    id="create-template-form"
                    form={form}
                    // fields={initFields}
                    layout="vertical"
                // validateMessages={VALIDATE_MESSAGES}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Category" {...rules(2, 256)}><AsnInput value="Courses" /></Form.Item>
                    <Form.Item label="Template Name*" {...rules(2, 256)}><AsnInput placeholder='One section course ' /></Form.Item>
                    <Form.Item label="Description" {...rules(2, 2048)}><TextArea placeholder="Activity Template for long-term courses. The course has one section." /></Form.Item>
                    <div className='buttonContainer'>
                        <AsnButton onClick={onCancelClick}>Cancel</AsnButton>
                        <AsnButton type='primary' onClick={onNextClick}>Next</AsnButton>
                    </div>
                </Form>
            </CreateTemplateContainer>
        </AsnModal>
  )
}

export default CreateTemplate
