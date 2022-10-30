import React from 'react'
import { IResultArea } from '../../../../../types/project'
import ExpectedResult from '../ExpectedResult'
import { AnsCollapse } from '../../../../AnsCollapse'
import { Panel } from '../../../../Forms/AnsCollapse'
import { Row } from 'antd'
import { AsnButton } from '../../../../Forms/Button'
import { VALIDATE_MESSAGES_PROJECT_INPUT } from '../../../../../helpers/constants'
import { useProject } from '../../../../../hooks/useProject'
import { Form } from '../../../../Forms/Form'

const InputResult: React.FC<{ resultArea: IResultArea[] }> = ({
  resultArea
}) => {
  const { nextCurrent } = useProject()
  const [form] = Form.useForm()

  const fields = [
    ...resultArea.map((o) => ({
      name: [o.expectedResult[0].id],
      value: o.expectedResult[0].code
    })),
    ...resultArea.map((o) =>
      o.expectedResult.map((l) => [
        { name: [`c${l.id}`], value: l.code },
        { name: [`r${l.id}`], value: l.result },
        { name: [`m${l.id}`], value: l.measure },
        { name: [`t${l.id}`], value: l.target }
      ])
    )
      .flat()
      .flat()
  ]

  const onFinish: any = (values: any) => {
    console.log(values, 'finish')
    nextCurrent()
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        fields={fields}
        validateMessages={VALIDATE_MESSAGES_PROJECT_INPUT}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {resultArea.map((r, i) => (
          <div key={r.id}>
            <span className="ans-title">Input Result Area {i + 1} *</span>
            <AnsCollapse key={r.id} id={r.id}>
              <Panel key={r.id} header={r.name}>
                <ExpectedResult id={r.id} results={r.expectedResult} />
              </Panel>
            </AnsCollapse>
          </div>
        ))}
        <Row>
          <AsnButton
            style={{ background: 'white', width: '100%', height: '44px' }}
            htmlType="submit"
            value="Create"
          >
            +Add Result Area
          </AsnButton>
        </Row>
      </Form>
    </>
  )
}

export default InputResult
