import styled from 'styled-components'
import { Steps } from 'antd'

export const AnsStepsHeader = styled(Steps)`
  
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
      font-size: var(--font-size-semismall);
      letter-spacing: 0.1px;
      color: var(--dark-2);

      &:after {
        background-color: var(--dark-border-ultramarine);
      }
    }
  }
`