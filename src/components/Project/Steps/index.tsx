import React, { useState } from 'react'
import { Steps } from 'antd'
import GeneralInfo from './GeneralInfo'
import ProjectInfo from './ProjectInput'
import ProjectDetails from './ProjectDetails'
import styled, { css } from 'styled-components'
import Action from './Action'

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

const stepsStyle = css`
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
`

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 43vw;
  gap: clamp(15px, 3vw, 25px);

  .title {
    font-size: var(--headline-font-size);
    color: var(--dark-2);
    text-align: center;
  }

  .ant-steps {
    ${stepsStyle}
  }

  .steps-content {
    background: var(--white);
    border-radius: 20px;
    padding: 32px;
    box-shadow: var(--base-box-shadow);
    width: 100%;
  }
`

const StepContainer: React.FC = () => {
  const [current, setCurrent] = useState(0)

  return (
    <Container>
      <span className="title">To create a new project, please fill in the following information</span>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title}/>
        ))}
      </Steps>
      <div className="steps-content">
        {steps[current].content}
        <Action current={current} setCurrent={setCurrent} />
      </div>
    </Container>
  )
}

export default StepContainer
