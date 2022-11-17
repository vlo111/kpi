import styled from 'styled-components'
import { Form } from '../Form'

export const ProjectInputForm = styled(Form)`
  width: clamp(19rem, 73vw, 90rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .ant-collapse-header {
    padding: 20px 40px 20px 1rem;
  }

  .ans-title {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    span {
      font-size: var(--headline-font-size);
      color: var(--dark-2);
    }
  }

  .ant-collapse-content-box {
    padding: 1rem 21px 1rem 11px !important;
  }

  .form-footer {
    .ant-btn-default {
      margin: 0 1rem;
    }

    .ant-btn-primary {
      margin-left: 1rem;
    }
  }

  .ant-col {
    align-items: end;
  }

  .form-item-collapse {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 24px;

    .ant-form-item {
      margin-bottom: 0;
      width: 100%;
    }
  }

  .footer {
    display: flex;
    gap: 6rem;
    justify-content: end;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  div:not(:last-child) {
    button {
      border: 1px solid var(--dark-5) !important;
      color: var(--dark-2) !important;

      span {
        font-size: var(--base-font-size) !important;
        font-weight: var(--font-normal) !important;
      }
    }
  }
`
