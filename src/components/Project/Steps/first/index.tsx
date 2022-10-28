import React from 'react'
import { useProject } from '../../../../hooks/useProject'
import { Form } from '../../../Forms/Form'
import {
  Name,
  PlaceHolderDescription,
  VALIDATE_MESSAGES
} from '../../../../helpers/constants'
import AsnInput, { TextArea } from '../../../Forms/Input'
import { Pickers } from './Pickers'
import { Rules } from '../../../../types/project'
import { AsnButton } from '../../../Forms/Button'
import { GeneralInput } from './GeneralInput'
import Managers from './Managers'

const rules: Rules = (min, max) => ({ rules: [{ required: true, min, max }] })

export const FirstStep: React.FC = () => {
  const { nextCurrent } = useProject()
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'finish')
    nextCurrent()
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }

  return (
    <GeneralInput>
      <Form
        form={form}
        layout="vertical"
        validateMessages={VALIDATE_MESSAGES}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="main">
          <Form.Item {...Name('Title')} {...rules(2, 256)}>
            <AsnInput placeholder="Example: AWDA" />
          </Form.Item>
          <Form.Item {...Name('Description')} {...rules(1, 2048)}>
            <TextArea placeholder={PlaceHolderDescription} />
          </Form.Item>
          <Pickers />
          <Managers />
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
