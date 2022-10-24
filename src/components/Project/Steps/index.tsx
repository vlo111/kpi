import React, { useEffect, useState } from 'react'
import { Steps } from 'antd'
import Action from './Action'
import { VALIDATE_MESSAGES, StepList } from '../../../helpers/constants'
import { Form } from '../../Forms/Form'
import { LayoutElement } from '../../../types/project'
import { AnsSteps } from '../../Forms/Steps'
import Step from './Step'

const StepContainer: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [saveCurrent, setSaveCurrent] = useState(0)

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

  return (
    <AnsSteps current={saveCurrent}>
      <span className="title">
        To create a new project, please fill in the following information
      </span>
      <Steps current={saveCurrent}>
        <Step current={saveCurrent} />
      </Steps>
      <div className="steps-content">
        <Form
          form={form}
          layout="vertical"
          validateMessages={VALIDATE_MESSAGES}
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
