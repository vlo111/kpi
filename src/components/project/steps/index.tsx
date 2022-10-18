import React, { useState } from 'react'
import { Button, message, Steps } from 'antd'
import { Container } from './style'

const { Step } = Steps

const steps = [
  {
    title: 'General info',
    content: 'First-content'
  },
  {
    title: 'Project input',
    content: 'Second-content'
  },
  {
    title: 'Project details',
    content: 'Last-content'
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
      <p className='title'>To create a new project, please fill in the following information</p>
      <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => {
            void message.success('Processing complete!')
          }}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </Container>
  )
}

export default StepContainer
