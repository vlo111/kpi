import React from 'react'
import styled from 'styled-components'
import { HandleSubmit } from '../../../../../types/project'

const AddManager = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 4rem;
  cursor: pointer;
  user-select: none;

  > div {
    width: 24px;
    min-width: 24px;
    height: 24px;
    overflow: hidden;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--dark-border-ultramarine);
    font-size: 22px;
    font-weight: bold;
  }
  
  p {
    margin: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #2A5578;
  }
`

const AddManagerIcon: React.FC<{ onClick: HandleSubmit }> = ({ onClick }) => {
  return (
      <AddManager onClick={onClick}>
          <div>
              <span>+</span>
          </div>
          <p>Add</p>
      </AddManager>

  )
}

export default AddManagerIcon
