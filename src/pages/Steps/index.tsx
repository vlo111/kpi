import React from 'react'
import { Steps } from 'antd'
import { StepList } from '../../helpers/constants'
import { useProject } from '../../hooks/project/useProject'
import { AsnStepsHeader } from '../../components/Forms/Steps/Header'
import styled from 'styled-components'

const { Step } = Steps

export const ProjectContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: 48px 75px;
  
  .project-header {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: clamp(19rem, 45vw, 50rem);

    .ant-steps {
      align-self: center !important;
      width: 60% !important;
    }
  }

  .step_0, .step_1 {
    width: clamp(19rem, 73vw, 90rem);
  }

  .project-title {
    display: flex;
    justify-content: center;
    font-size: var(--headline-font-size);
    color: var(--dark-2);
  }
`

export const ProjectSteps: React.FC = () => {
  const { current }: { current: number } = useProject()

  return (
    <ProjectContainer>
      <div className="project-header">
        <span className="project-title">
          To create a new project, please fill in the following information
        </span>
        <AsnStepsHeader current={current}>
          {StepList.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </AsnStepsHeader>
      </div>
      <div className={`step_${current}`}>{StepList[current].content}</div>
    </ProjectContainer>
  )
}
