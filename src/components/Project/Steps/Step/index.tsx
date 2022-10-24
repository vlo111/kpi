import React from 'react'
import { Steps } from 'antd'
import { StepList } from '../../../../helpers/constants'
import { IStep } from '../../../../types/project'
const { Step } = Steps

const StepContainer: React.FC<IStep> = ({ current }) => {
  return (
        <Steps current={current}>
            {StepList.map((item) => (
                <Step key={item.title} title={item.title} />
            ))}
        </Steps>
  )
}

export default StepContainer
