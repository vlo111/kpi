import styled from 'styled-components'

export const InputContainer = styled.div`
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

`
