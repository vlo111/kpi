import styled from 'styled-components'
import { InputProps } from '../../../types/form'

export const InputContainer = styled.div<InputProps>`
  #basic_Password {
    border-radius: 1px;
  }

  .ant-input-password, .ant-input {
    border-radius: 5px;
    border: 1px solid var(--dark-6);

    &:hover {
      border-color: var(--dark-border-ultramarine);
    }
  }

  .ant-input-affix-wrapper-focused, .ant-input:focus {
    border-color: var(--dark-border-ultramarine);
    box-shadow: var(--input-box-shadow);

    &:hover {
      border-color: var(--dark-border-ultramarine);
    }
  }

  .ant-input-affix-wrapper-status-error, .ant-input-status-error {
    border-color: var(--error) !important;

    &:focus {
      box-shadow: var(--error-box-shadow) !important;
    }
  }

  .ant-form-item-explain-error {
    color: var(--error);
  }
  
  .ant-form-item-required:before {
    content: ${(props) => props.requiredItem ? '*' : 'none !important'};
    position: absolute;
    right: -12px;
    color: var(--dark-2) !important;
  }
  
  .ant-form-item-label {
    color: var(--dark2-2)
  }

  .ant-form-item-label > label {
    color: var(--dark2-2)
  }
`
