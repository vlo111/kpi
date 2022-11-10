import React, { useState } from 'react'
import { Form } from '../../components/Forms/Form'
import {
  Name,
  PlaceHolderDescription,
  VALIDATE_MESSAGES
} from '../../helpers/constants'
import AsnInput, { TextArea } from '../../components/Forms/Input'
import { AsnButton } from '../../components/Forms/Button'
import { rules } from '../../utils/ProjectUtils'
import styled from 'styled-components'
import { ConfirmModal } from '../../components/Forms/Modal/ConfirmModal'
import { AsnPickers } from '../../components/AsnDataPickers'
import { useNavigate } from 'react-router-dom'
import { Date } from '../../types/project'
import { v4 as uuidv4 } from 'uuid'

export const GeneralInfo = styled.div`
  width: clamp(16rem, 41.7vw, 60rem);
  margin: 4.5rem auto 0;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  gap: 3rem;

  form {
    box-shadow: var(--base-box-shadow);
    background: var(--white);
    padding: 32px;
    border-radius: 20px;
  }

  .title {
    font-size: var(--headline-font-size);
    color: var(--dark-2);
  }

  .main {
    margin-bottom: 4rem;

    .ant-form-item {
      margin-bottom: 1rem;
    }

    .ant-form-item-label {
      padding: 0;
    }
  }

  .footer {
    display: flex;
    justify-content: space-evenly;

    button {
      width: 133px;
      height: 44px !important;
      border-radius: 10px !important;
    }
  }
`

export const CreateProject: React.FC = () => {
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()

  const [startDate, setStartDate] = useState<Date>(null)
  const [endDate, setEndDate] = useState<Date>(null)

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const [form] = Form.useForm()

  const navigate = useNavigate()

  const onFinish: any = (values: any) => {
    setTitle(values.Title)
    setDescription(values.Description)

    setStartDate(values['Start Date'])
    setEndDate(values['End Date'])

    setOpenDeleteModal(!openDeleteModal)
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }

  const initFields = [
    {
      name: ['Title'],
      value: title
    },
    {
      name: ['Description'],
      value: description
    },
    {
      name: ['Start Date'],
      value: startDate
    },
    {
      name: ['End Date'],
      value: endDate
    }
  ]

  const onRedirectToUser: () => void = () => {
    navigate('/teams')
  }

  const onSkipUser: () => void = () => {
    navigate(`/project/overview/${uuidv4()}`)
  }

  return (
    <>
      <GeneralInfo>
        <div className="title">
          To create a new project, please fill in the following information
        </div>
        <Form
          id="general-info-form"
          form={form}
          fields={initFields}
          layout="vertical"
          validateMessages={VALIDATE_MESSAGES}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="main">
            <Form.Item {...Name('title', 'Title')} {...rules(2, 256)}>
              <AsnInput placeholder="Example: AWDA" />
            </Form.Item>
            <Form.Item
              {...Name('description', 'Description')}
              {...rules(1, 2048)}
            >
              <TextArea placeholder={PlaceHolderDescription} />
            </Form.Item>
            <AsnPickers form={form} />
          </div>
          <div className="footer">
            <AsnButton>Cancel</AsnButton>
            <AsnButton type="primary" htmlType="submit">
              Create
            </AsnButton>
          </div>
        </Form>
      </GeneralInfo>
      <ConfirmModal
        styles={{ gap: '3rem' }}
        yes="Add"
        no="Skip"
        open={openDeleteModal}
        title="Do you want to add users?"
        onSubmit={onRedirectToUser}
        onCancel={onSkipUser}
      />
    </>
  )
}
