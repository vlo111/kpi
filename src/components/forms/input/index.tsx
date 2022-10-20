import styled, { css } from 'styled-components'
import { Input } from 'antd'

const textArea = css`
  resize: vertical !important;
  max-height: 400px !important;
  min-height: 100px !important;
`

const defaultStyle = css`
  height: 52px;
  font-size: 16px;
  background: #ffffff;
  border: 1px solid var(--dark-border-ultramarine);

  :disabled {
    background-color: #ffffff;
  }
  :hover {
    border: 1px solid var(--dark-border-ultramarine);
  }
  :focus {
    border: 1px solid var(--dark-border-ultramarine);
    box-shadow: var(--input-box-shadow);
  }
`

const AsnInput = styled(Input)`
  ${defaultStyle}
`

export const TextArea = styled(Input.TextArea)`
  ${defaultStyle}
  ${textArea}
`

export const Password = styled(Input.Password)`
  ${defaultStyle}
`

export default AsnInput
