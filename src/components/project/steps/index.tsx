import React, { useState } from 'react'
import { message, Steps } from 'antd'
import { Container } from './style'
import GeneralInfo from './general-info'
import ProjectInfo from './project-input'
import ProjectDetails from './project-details'
import Button from '../../forms/button'

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
