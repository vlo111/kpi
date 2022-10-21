import React, { useState } from 'react'
import { message, Steps } from 'antd'
import GeneralInfo from './GeneralInfo'
import ProjectInfo from './ProjectInput'
import ProjectDetails from './ProjectDetails'
import Button from '../../Forms/Button'
import styled, { css } from 'styled-components'

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

const action = css`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
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

  .steps-action {
    ${action}
  }

  .steps-content {
    width: 100%;
  }
`

const StepContainer: React.FC = () => {
  const [current, setCurrent] = useState(0)

  const next: () => void = () => {
    setCurrent(current + 1)
  }

  const prev: () => void = () => {
    setCurrent(current - 1)
  }

  return (
    <Container>
      <span className="title">To create a new project, please fill in the following information</span>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title}/>
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current === 0 && (
          <Button onClick={() => prev()} value="Create">Create</Button>
        )}

        {current > 0 && (
          <Button onClick={() => prev()} value="Previous">Previous</Button>
        )}

        {current === 1 && (
          <Button onClick={() => prev()} value="Draft">Save as Draft</Button>
        )}

        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()} value="Next">Next</Button>
        )}

        {current === steps.length - 1 && (
          <Button type="primary"
                  onClick={() => {
                    void message.success('Processing complete!')
                  }}
                  value="Next">Publish</Button>
        )}
      </div>
    </Container>
  )
}

export default StepContainer
