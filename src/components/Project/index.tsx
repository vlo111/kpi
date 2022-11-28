import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as CreateProjectSvg } from '../../assets/icons/create-project.svg'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: -45px;
  height: 100%;
  cursor: pointer;
  
  svg {
    width: clamp(15rem, 35vw, 22rem);
  }

  .create-project-text {
    font-weight: var(--font-bold);
    font-size: clamp(1rem, 2vw, 3rem);
    color: var(--dark-border-ultramarine);
  }
`

export const Project: React.FC = () => {
  const navigate = useNavigate()

  return (
        <Container onClick={() => navigate('/create-project')}>
            <CreateProjectSvg/>
            <span className="create-project-text">Create your first project</span>
        </Container>
  )
}
