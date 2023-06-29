import { Radio } from 'antd';
import styled from 'styled-components';

export const AsnRadio = styled(Radio)`
 span{
  font-size: var(--base-font-size) !important;
 }
  .ant-radio-inner{
   border: 1px solid var(--dark-border-ultramarine)
  }
  .ant-radio:hover .ant-radio-inner{
    border: 1px solid var(--dark-border-ultramarine) !important
  }
  .ant-radio-inner:after{
    background-color:var(--dark-border-ultramarine)
  }
  .ant-radio-input:focus+.ant-radio-inner{
    box-shadow: none
  }
  .ant-radio-disabled+span {
    color: ${props => props.value > 0 ? 'var(--dark-2)' : 'var(--dark-3)'};
  }
  &.ant-radio-wrapper-disabled{
    width: ${props => props.id === 'preview' ? '100%' : '90%'};
  }
  .ant-radio.ant-radio-disabled .ant-radio-inner{
    border-color:  var(--dark-border-ultramarine);
  }
`;
