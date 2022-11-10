import React from 'react'
import { Form } from '../../components/Forms/Form'
import {
  Name,
  PlaceHolderDescription,
  VALIDATE_MESSAGES
} from '../../helpers/constants'
import AsnInput, { TextArea } from '../../components/Forms/Input'
import { Pickers } from '../../components/Project/Steps/First/Pickers'
import { AsnButton } from '../../components/Forms/Button'
import { rules } from '../../utils/ProjectUtils'
import { useGeneralInfo } from '../../hooks/project/useGeneralInfo'
import styled from 'styled-components'

export const GeneralInfo = styled.div`
  box-shadow: var(--base-box-shadow);
  justify-content: space-between;
  background: var(--white);
  flex-direction: column;
  border-radius: 20px;
  padding: 32px;
  display: flex;
  width: clamp(16rem, 41.7vw, 60rem);
  margin: 0 auto;

  .title {
    margin: 0 auto;
  }

  .main {
    margin-bottom: 19px;
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
  const {
    title,
    description,
    startDate,
    endDate,
    setTitle,
    setDescription,
    setStartDate,
    setEndDate
  } = useGeneralInfo()

  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    setTitle(values.Title)
    setDescription(values.Description)

    setStartDate(values['Start Date'])
    setEndDate(values['End Date'])
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

  return (
        <GeneralInfo>
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
                        <AsnInput placeholder="Example: AWDA"/>
                    </Form.Item>
                    <Form.Item {...Name('description', 'Description')} {...rules(1, 2048)}>
                        <TextArea placeholder={PlaceHolderDescription}/>
                    </Form.Item>
                    <Pickers form={form}/>
                </div>
                <div className="footer">
                    <AsnButton>Create</AsnButton>
                    <AsnButton type="primary" htmlType="submit">
                        Next
                    </AsnButton>
                </div>
            </Form>
        </GeneralInfo>
  )
}
