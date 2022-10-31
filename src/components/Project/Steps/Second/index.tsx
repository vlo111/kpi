import React from 'react'
import InputResult from './InputResult'
import { useProject } from '../../../../hooks/useProject'
import { VALIDATE_MESSAGES_PROJECT_INPUT } from '../../../../helpers/constants'
import { Row } from 'antd'
import { AsnButton } from '../../../Forms/Button'
import { Form } from '../../../Forms/Form'
import { ProjectInputForm } from '../../../Forms/ProjectInputForm'
import { initFields } from '../../../../utils/ProjectUtils'

export const Second: React.FC = () => {
  const { nextCurrent, resultArea } = useProject()
  const [form] = Form.useForm()

  const fields = initFields(resultArea)

  const onFinish: any = (values: any) => {
    console.log(values, 'finish')
    nextCurrent()
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }

  return (
        <ProjectInputForm
            form={form}
            layout="vertical"
            fields={fields}
            validateMessages={VALIDATE_MESSAGES_PROJECT_INPUT}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <InputResult resultArea={resultArea}/>
            <Row>
                <AsnButton
                    style={{ background: 'white', width: '100%', height: '44px' }}
                    htmlType="submit"
                    value="Create"
                >
                    +Add Result Area
                </AsnButton>
            </Row>
        </ProjectInputForm>
  )
}
