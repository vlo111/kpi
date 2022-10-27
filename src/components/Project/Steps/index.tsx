import React from 'react'
import { Steps } from 'antd'
import { StepList } from '../../../helpers/constants'
import { useProject } from '../../../hooks/useProject'
const { Step } = Steps

export const ProjectSteps: React.FC = () => {
  const { current } = useProject()

  return (
    <>
      <Steps current={current}>
        {StepList.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{StepList[current].content}</div>
    </>
  )
}
