import React from 'react'
import { useProject } from '../../../../hooks/useProject'
import styled from 'styled-components'
import { Form } from '../../../Forms/Form'
import { Name, PlaceHolderDescription, VALIDATE_MESSAGES } from '../../../../helpers/constants'
import AsnInput, { TextArea } from '../../../Forms/Input'
import { Pickers } from './Pickers'
import { Rules } from '../../../../types/project'
import { AsnButton } from '../../../Forms/Button'

const GeneralInput = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--base-box-shadow);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .ant-form-item-label {
    padding: 0;
  }
`

const rules: Rules = (min, max) => ({ rules: [{ required: true, min, max }] })

export const First: React.FC = () => {
  const { nextCurrent } = useProject()
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'finish')
    nextCurrent()
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }
  console.log({ ...rules(2, 256) })

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
                    <Form.Item
                        {...Name('Title')}
                        {...rules(2, 256)}
                    >
                        <AsnInput placeholder="Example: AWDA"/>
                    </Form.Item>
                    <Form.Item
                        {...Name('Description')}
                        {...rules(1, 2048)}
                    >
                        <TextArea placeholder={PlaceHolderDescription}/>
                    </Form.Item>
                    <Pickers />
                </div>
                <div className="footer">
                    <AsnButton className="primary">next</AsnButton>
                </div>
            </Form>
        </GeneralInput>
  )
}
