import styled from 'styled-components'
import { Form } from '../Form'

export const ProjectInputForm = styled(Form)`
  width: clamp(19rem,73vw,90rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .ant-collapse-header {
    padding: 20px 40px 20px 1rem;
  }

  .ans-title {
    font-size: var(--headline-font-size);
    color: var(--dark-2);
  }

  .ant-collapse-content-box {
    padding: 1rem 21px 1rem 11px !important;
  }

  .form-footer {
    .ant-btn-default {
      margin: 0 1rem;
    }

    .ant-btn-primary {
      margin-left: 1rem
    }
  }

  .ant-col {
    align-items: end;
  }

  .ant-btn-default {
    width: 100%;
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
`
