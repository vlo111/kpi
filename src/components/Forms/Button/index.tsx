import styled from 'styled-components'
import { Button } from 'antd'

export const AsnButton = styled(Button)`
  border-radius: 10px;

  &.ant-btn-primary {
    color: var(--white);
    border: none;
    background: var(--dark-border-ultramarine);
    font-weight: var(--font-bold);
    padding: 7px 32px;
    font-size: var(--base-font-size);
    border-radius: 5px;
    height: 44px;

    &.primary{
     height: 44px;
     width: 100%;
     font-size: var(--headline-font-size);
     margin-top: 8px;
     max-width: 460px;
  }
    
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
    height: 44px;
    border-radius: 5px;

    &:hover {
      background: var(--primary-light-1);
    }
  }
`
