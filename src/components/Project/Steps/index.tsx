import React from 'react'
import { Steps } from 'antd'
import { StepList } from '../../../helpers/constants'
import { useProject } from '../../../hooks/useProject'
import { AnsStepsHeader } from '../../Forms/Steps/Header'
import styled from 'styled-components'

const { Step } = Steps

export const ProjectContainer = styled.div`
  width: clamp(19rem, 45vw, 50rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .project-title {
    display: flex;
    justify-content: center;
    font-size: var(--headline-font-size);
    color: var(--dark-2);
  }
`

export const ProjectSteps: React.FC = () => {
  const { current } = useProject()

  return (
    <ProjectContainer>
      <span className="project-title">
        To create a new project, please fill in the following information
      </span>
      <AnsStepsHeader current={current}>
        {StepList.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </AnsStepsHeader>
      <div className="steps-content">{StepList[current].content}</div>
    </ProjectContainer>
  )
}
