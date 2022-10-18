import styled from 'styled-components'

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 48vw;
  gap: clamp(15px, 3vw, 25px);

  .title {
    font-size: var(--hedline-font-size);
    color: var(--dark-2);
    text-align: center;
  }

  .ant-steps-item-process > .ant-steps-item-container {

    > .ant-steps-item-content > .ant-steps-item-title {
      color: var(--dark-2);
    }
    
    > .ant-steps-item-icon {
      background: var(--dark-border-ultramarine);
      border: none;
    }
  }
  
  .ant-steps-finish-icon svg {
    fill: var(--dark-border-ultramarine);
  }

  .ant-steps-item-finish {
    
    .ant-steps-item-icon {
      border-color: var(--dark-border-ultramarine);
    }

    > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
      font-size: 14px;
      letter-spacing: 0.1px;
      color: var(--dark-2);

      &:after {
        background-color: var(--dark-border-ultramarine);
      }
    }
  }

  .steps-content {
    width: 100%;
  }
`
