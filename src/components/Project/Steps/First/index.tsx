import React from 'react'
import { useProject } from '../../../../hooks/project/useProject'
import { Form } from '../../../Forms/Form'
import {
  Name,
  PlaceHolderDescription,
  VALIDATE_MESSAGES
} from '../../../../helpers/constants'
import AsnInput, { TextArea } from '../../../Forms/Input'
import { Pickers } from './Pickers'
import { AsnButton } from '../../../Forms/Button'
import { GeneralInput } from './GeneralInfo'
import Managers from './Managers'
import { rules } from '../../../../utils/ProjectUtils'
import { useGeneralInfo } from '../../../../hooks/project/useGeneralInfo'

export const FirstStep: React.FC = () => {
  const { nextCurrent } = useProject()
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

    nextCurrent()
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
                    <Managers/>
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
