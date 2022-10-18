import React, { useState } from 'react'
import { message, Steps } from 'antd'
import { Container } from './style'
import GeneralInfo from './general-info'
import ProjectInfo from './project-input'
import ProjectDetails from './project-details'
import Button from '../../forms/button'
import { ButtonType } from '../../../types/form'

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
        {current < steps.length - 1 && (
          <Button type={ButtonType.Primary} onClick={() => next()} value="Next"/>
        )}
        {current === steps.length - 1 && (
          <Button
            type={ButtonType.Primary}
            onClick={() => {
              void message.success('Processing complete!')
            }}
            value="Next"/>
        )}
        {current > 0 && (
          <Button type={ButtonType.Secondary} onClick={() => prev()} value="Previous"/>
        )}
      </div>
    </Container>
  )
}

export default StepContainer
