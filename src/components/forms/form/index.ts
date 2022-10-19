import styled, { css } from 'styled-components'
import { Form as AntForm } from 'antd'

const label = {
  color: 'var(--dark-2)',
  fontSize: 'var(--base-font-size)'
}

const defaultStyle = css`
  .ant-input-affix-wrapper-status-error, .ant-input-status-error {
    border-color: var(--error) !important;

    &:focus {
      box-shadow: var(--error-box-shadow) !important;
    }
  }

  .ant-form-item-explain-error {
    color: var(--error);
  }

  .ant-form-item-label {
    ${label}
  }

  .ant-form-item-label > label {
    ${label}
  }
`

export const Form = styled(AntForm)`
  ${defaultStyle}
`
