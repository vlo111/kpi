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
import { GeneralInput } from '../../components/Project/Steps/First/GeneralInfo'
import { rules } from '../../utils/ProjectUtils'
import { useGeneralInfo } from '../../hooks/project/useGeneralInfo'

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
        <GeneralInput>
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
                    <Form.Item {...Name('Title')} {...rules(2, 256)}>
                        <AsnInput placeholder="Example: AWDA"/>
                    </Form.Item>
                    <Form.Item {...Name('Description')} {...rules(1, 2048)}>
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
        </GeneralInput>
  )
}
