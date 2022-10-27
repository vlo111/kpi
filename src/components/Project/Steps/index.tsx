import React, { useEffect, useState } from 'react'
import { Steps } from 'antd'
import Action from './Action'
import { VALIDATE_MESSAGES, StepList } from '../../../helpers/constants'
import { Form } from '../../Forms/Form'
import { LayoutElement } from '../../../types/project'
import { AnsSteps } from '../../Forms/Steps'
import Step from './Step'
import { OrganizationList, RegionList, ResultArea, SectorList } from '../../../helpers/fakeData'

const StepContainer: React.FC = () => {
  const [current, setCurrent] = useState(1)
  const [saveCurrent, setSaveCurrent] = useState(1)

  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'finish')
    setSaveCurrent(current)
  }
  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }

  useEffect(() => {
    const layout: LayoutElement = document.querySelector('.ant-layout')

    if (layout) {
      layout.style.height = '100%'
    }
  }, [])

  const fields = saveCurrent === 2
    ? [
        ...OrganizationList(10).map((o) => ({ name: [o.id], value: o.name })),
        ...RegionList(10).map((o) => ({ name: [o.id], value: o.name })),
        ...SectorList(10).map((o) => ({ name: [o.id], value: o.name }))
      ]
    : saveCurrent === 1
      ? [
          ...ResultArea.map((o) => ({ name: [o.expectedResult[0].id], value: o.expectedResult[0].code }))
        ]
      : []

  return (
        <AnsSteps current={saveCurrent}>
      <span className="title">
        To create a new project, please fill in the following information
      </span>
            <Steps current={saveCurrent}>
                <Step current={saveCurrent}/>
            </Steps>
            <div className="steps-content">
                <Form
                    form={form}
                    layout="vertical"
                    validateMessages={VALIDATE_MESSAGES}
                    fields={fields}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {StepList[saveCurrent].content}
                    <Action
                        current={saveCurrent}
                        stepLength={StepList.length}
                        onSubmit={setCurrent}
                    />
                </Form>
            </div>
        </AnsSteps>
  )
}

export default StepContainer
