import styled from 'styled-components'
import { Steps } from 'antd'

export const AsnStepsHeader = styled(Steps)`
  
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
    fill: var(--white);
  }

  .ant-steps-item-finish {
    .ant-steps-item-icon {
      background: var(--secondary-green);
      border: none;
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
