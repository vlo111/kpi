import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

const stepContent: FlattenSimpleInterpolation = css`
  .steps-content {
    width: 65vw;

    .ant-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .form-footer {
        .ant-btn-default {
          margin: 0 1rem;
        }

        .ant-btn-primary {
          margin-left: 1rem
        }
      }
    }

    .ant-col {
      align-items: end;

      .ant-form-item-control-input {

        &-content {
          justify-content: space-between;
        }
      }
`

const formContent: FlattenSimpleInterpolation = css`
  .ant-form {
    background: var(--white);
    border-radius: 20px;
    padding: 32px;
    box-shadow: var(--base-box-shadow);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const AnsSteps = styled.div<{ current: number }>`
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

  ${(props) => (props.current !== 0 ? stepContent : formContent)}
`
