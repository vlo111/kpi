import React, { useState } from 'react'
import { Steps } from 'antd'
import GeneralInfo from './GeneralInfo'
import ProjectInfo from './ProjectInput'
import ProjectDetails from './ProjectDetails'
import styled from 'styled-components'
import Action from './Action'
import { VALIDATE_MESSAGES } from '../../../helpers/constants'
import { Form } from '../../Forms/Form'

const { Step } = Steps

const steps = [
  {
    title: 'General info',
    content: <GeneralInfo/>
  },
  {
    title: 'Project input',
    content: <ProjectInfo/>
  },
  {
    title: 'Project details',
    content: <ProjectDetails/>
  }
]

const Container = styled.div`
  margin: 2rem auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: clamp(19rem, 42vw, 50rem);
  gap: clamp(15px, 3vw, 30px);

  .title {
    font-size: var(--headline-font-size);
    color: var(--dark-2);
    text-align: center;
  }

  .ant-steps {
    .ant-steps-item-process > .ant-steps-item-container {

      > .ant-steps-item-content > .ant-steps-item-title {
        color: var(--dark-2);
      }

      > .ant-steps-item-icon {
        background: var(--dark-border-ultramarine);
        border: none;
      }
    }

    .ant-steps-finish-icon svg {
      fill: var(--dark-border-ultramarine);
    }

    .ant-steps-item-finish {

      .ant-steps-item-icon {
        border-color: var(--dark-border-ultramarine);
      }

      > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
        font-size: var(--font-size-semismall);
        letter-spacing: 0.1px;
        color: var(--dark-2);

        &:after {
          background-color: var(--dark-border-ultramarine);
        }
      }
    }
  }

  .steps-content {
    width: 100%;
  }
`

const StepForm = styled(Form)`
  background: var(--white);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--base-box-shadow);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

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

  return (
    <Container>
      <span className="title">To create a new project, please fill in the following information</span>
      <Steps current={saveCurrent}>
        {steps.map(item => (
          <Step key={item.title} title={item.title}/>
        ))}
      </Steps>
      <div className="steps-content">
        <StepForm
          form={form}
          layout="vertical"
          validateMessages={VALIDATE_MESSAGES}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {steps[saveCurrent].content}
          <Action current={saveCurrent} stepLength={steps.length} onSubmit={setCurrent}/>
        </StepForm>
      </div>
    </Container>
  )
}

export default StepContainer
