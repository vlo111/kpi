import React, { useEffect } from 'react'
import { ReactComponent as CreateProjectSvg } from '../../../assets/icons/create-project.svg'
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

export const CreateProject: React.FC<{ setStep: (b: boolean) => void }> = ({ setStep }) => {
  useEffect(() => {
    const layout: Element & { style: React.CSSProperties } | null = document.querySelector('.ant-layout')

    if (layout) {
      layout.style.height = '100%'
    }
    return () => {
      if (layout) {
        layout.style.height = 'auto'
      }
    }
  }, [])

  return (
        <Container onClick={() => setStep(true)}>
            <CreateProjectSvg/>
            <span className="create-project-text">Create your first project</span>
        </Container>
  )
}
