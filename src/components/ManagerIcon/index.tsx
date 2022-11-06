import React from 'react'
import styled from 'styled-components'
import { IManagerIcon } from '../../types/project'

const IconContainer = styled.div`
  width: 40px;
  min-width: 40px;
  height: 40px;
  overflow: hidden;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--success);
  font-size: var(--base-font-size);
  user-select: none;
  cursor: pointer;
`

const ManagerIcon: React.FC<IManagerIcon> = ({ letter, color }) => {
  return (
        <IconContainer className="manager-icon" style={{ background: color }}>
            <span>{letter}</span>
        </IconContainer>
  )
}

export default ManagerIcon
