import styled from 'styled-components'

export const ButtonContainer = styled.div`
    .ant-btn-primary {
      background: var(--dark-border-ultramarine);
      color: var(--white);
      border: none;
      font-weight: var(--font-bold);
      
      &:hover {
        background: var(--primary-light-1);
        color: var(--dark-border-ultramarine)
      }
    }
  
  .ant-btn-default {
    border: 1px solid var(--dark-border-ultramarine);
    color: var(--dark-border-ultramarine);
    font-weight: var(--font-bold);
    
    &:hover {
      background: var(--primary-light-1);
    }
  }
`
