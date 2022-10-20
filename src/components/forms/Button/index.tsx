import styled from 'styled-components'
import { Button } from 'antd'

const button = {
  fontWeight: 'var(--font-bold)',
  padding: '5px 30px',
  fontSize: 'var(--base-font-size)',
  height: 'auto'
}

const AsnButton = styled(Button)`
  border-radius: 10px;

  &.ant-btn-primary {
    color: var(--white);
    border: none;
    background: var(--dark-border-ultramarine);

    ${button}

    &:hover {
      background: var(--primary-light-1);
      color: var(--dark-border-ultramarine)
    }
  }

  &.ant-btn-default {
    color: var(--dark-border-ultramarine);
    border: 1px solid var(--dark-border-ultramarine);
    background: transparent;
    
    ${button}
    
    &:hover {
      background: var(--primary-light-1);
    }
  }
`

export default AsnButton
