import React from 'react'
import { ReactComponent as CreateProjectSvg } from '../../../assets/icons/create-project.svg'
import styled from 'styled-components'
import { StepProps } from '../../../types/project'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: -45px;
  height: 100%;
  cursor: pointer;

  .create-project-text {
    font-weight: var(--font-bold);
    font-size: var(--large-font-size);
    color: var(--dark-border-ultramarine);
  }
`

export const CreateProject: React.FC<StepProps> = ({ setStep }) => {
  return (
        <Container onClick={() => setStep(true)}>
            <CreateProjectSvg/>
            <span className="create-project-text">Create your first project</span>
        </Container>
  )
}