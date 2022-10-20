import styled from 'styled-components'
import { Button } from 'antd'

const AsnButton = styled(Button)`
  border-radius: 10px;

  &.ant-btn-primary {
    color: var(--white);
    border: none;
    background: var(--dark-border-ultramarine);
    font-weight: var(--font-bold);
    padding: 5px 30px;
    font-size: var(--base-font-size);
    height: auto;

    &:hover {
      background: var(--primary-light-1);
      color: var(--dark-border-ultramarine)
    }
  }

  &.ant-btn-default {
    color: var(--dark-border-ultramarine);
    border: 1px solid var(--dark-border-ultramarine);
    background: transparent;
    font-weight: var(--font-bold);
    padding: 5px 30px;
    font-size: var(--base-font-size);
    height: auto;
    
    &:hover {
      background: var(--primary-light-1);
    }
  }
`

export default AsnButton
