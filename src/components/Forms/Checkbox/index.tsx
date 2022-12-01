import styled from 'styled-components'
import { Checkbox } from 'antd'
import { IAsnCheckbox } from '../../../types/global'

export const AsnCheckbox = styled(Checkbox)<IAsnCheckbox>`
  .ant-checkbox {
    
    &-inner {
      width: ${(props) => props.width ?? '18px'};
      height: ${(props) => props.height ?? '18px'};
      border: ${(props) => props.borderSize ?? '1px'} solid var(--dark-border-ultramarine) !important;

      &:after {
        width: ${(props) => props.checkWidth ?? '5px'};
        height: ${(props) => props.checkHeight ?? '10px'};
        border: ${(props) => props.borderSize ?? '1px'} solid var(--white);
        border-top: 0;
        border-left: 0;
        top: ${(props) => props.top ?? '7px'};
        left: ${(props) => props.top ?? '4px'};
      }
    }

    &-checked {
      .ant-checkbox-inner {
        background-color: var(--dark-border-ultramarine);
        border: 1px solid var(--dark-border-ultramarine) !important;
      }

      &:after {
        border: 1px solid var(--dark-border-ultramarine) !important;
      }
    }

    &:hover {
      .ant-checkbox-inner {
        border: 1px solid var(--dark-border-ultramarine);
      }
    }
  }
`
