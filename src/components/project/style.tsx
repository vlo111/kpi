import styled from 'styled-components'

export const Container = styled.div`
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
