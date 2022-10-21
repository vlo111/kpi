import React, { useState } from 'react'
import { ReactComponent as CreateProjectSvg } from '../../assets/icons/create-project.svg'
import Steps from './Steps'
import styled from 'styled-components'

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

export const Project: React.FC = () => {
  const [step, setStep] = useState<boolean>(false)

  return (
    !step
      ? (<Container onClick={() => setStep(!step)}>
        <CreateProjectSvg/>
        <span className="create-project-text">Create your first project</span>
        </Container>)
      : <Steps/>
  )
}
