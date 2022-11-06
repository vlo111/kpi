import React from 'react'
import InputResult from './InputResult'
import { VALIDATE_MESSAGES_PROJECT_INPUT } from '../../../../helpers/constants'
import { Row } from 'antd'
import { AsnButton } from '../../../Forms/Button'
import { Form } from '../../../Forms/Form'
import { ProjectInputForm } from '../../../Forms/ProjectInputForm'
import { initFields } from '../../../../utils/ProjectUtils'
import { useProjectInput } from '../../../../hooks/project/useProjectInput'
import { useProject } from '../../../../hooks/project/useProject'

export const Second: React.FC = () => {
  const { nextCurrent, prevCurrent } = useProject()
  const { resultArea, addNewResultArea } = useProjectInput()
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
            <Row style={{ width: resultArea.length > 1 ? 'calc(100% - 2rem)' : '100%' }}>
                <AsnButton
                    style={{ background: 'white', width: '100%', height: '3rem' }}
                    value="Create"
                    onClick={() => addNewResultArea()}
                >
                    +Add Result Area
                </AsnButton>
            </Row>
            <div className="footer">
                <AsnButton onClick={() => {
                  prevCurrent()
                }}>Previous</AsnButton>
                <AsnButton>Save as Draft</AsnButton>
                <AsnButton type="primary" htmlType="submit">
                    Next
                </AsnButton>
            </div>
        </ProjectInputForm>
  )
}
