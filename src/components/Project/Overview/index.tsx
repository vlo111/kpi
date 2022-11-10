import React from 'react'
import styled from 'styled-components'
import ProjectInfo from './ProjectInfo'
import { ReactComponent as CreateResultAreaSvg } from '../../../assets/icons/add-files.svg'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const Wrapper = styled.div`
  height: 100%;
  padding: 2rem 0 0 2rem;
  background: var(--background);

  .create-resultArea {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    height: calc(100% - 8rem);
    
    span {
      font-size: var(--headline-font-size);
      color: var(--dark-border-ultramarine);
    }
  }
`

export const Overview: React.FC = () => {
  const navigate = useNavigate()

  const onRedirectResultHandle: () => void = () => {
    navigate(`/project/steps/${uuidv4()}`)
  }

  return (
    <Wrapper>
      <ProjectInfo />
      <div className="create-resultArea" onClick={onRedirectResultHandle}>
        <CreateResultAreaSvg />
        <span>Input result areas and activities</span>
      </div>
    </Wrapper>
  )
}
