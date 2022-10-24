import React from 'react'
import styled from 'styled-components'

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

const ManagerIcon: React.FC<{ letter: string }> = ({ letter }) => {
  return (
        <IconContainer>
            <span>{letter}</span>
        </IconContainer>
  )
}

export default ManagerIcon
