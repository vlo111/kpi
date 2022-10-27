import styled from 'styled-components'

export const AnsSteps = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: clamp(19rem, 42vw, 50rem);
  gap: clamp(15px, 3vw, 30px);

  .title {
    font-size: var(--headline-font-size);
    color: var(--dark-2);
    text-align: center;
  }

  .ant-steps {
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

      > .ant-steps-item-container
      > .ant-steps-item-content
      > .ant-steps-item-title {
        font-size: var(--font-size-semismall);
        letter-spacing: 0.1px;
        color: var(--dark-2);

        &:after {
          background-color: var(--dark-border-ultramarine);
        }
      }
    }
  }

  .steps-content {
    width: 100%;
  }
`
