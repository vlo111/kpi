import styled, { css } from 'styled-components'
import { Input } from 'antd'

const textArea = css`
  resize: vertical !important;
  max-height: 400px !important;
  min-height: 100px !important;
`

const defaultStyle = css`
  height: 40px;
  font-size: 16px;
  background: var(--white);
  border: 1px solid var(--dark-border-ultramarine);
  border-radius: 5px;

  :disabled {
    background-color: var(--white);
  }
  :hover {
    border: 1px solid var(--dark-border-ultramarine) !important;
  }
  :focus {
    border: 1px solid var(--dark-border-ultramarine) ;
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
  &.ant-input-affix-wrapper-focused {
    border: 1px solid var(--dark-border-ultramarine) ;
    box-shadow: var(--input-box-shadow) !important;
  }
`

export default AsnInput
