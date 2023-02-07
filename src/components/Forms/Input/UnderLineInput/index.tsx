import styled from 'styled-components';
import { Input } from 'antd';

export const UnderLineInput = styled(Input)`
  border: none;
  border-bottom: 1px solid var(--dark-border-ultramarine);
  &.ant-input:hover {
    border: none;
    border-bottom: 1px solid var(--dark-border-ultramarine) !important;
   }
   &.ant-input:focus{
    border: none;
    border-bottom: 1px solid var(--dark-border-ultramarine) !important;
    box-shadow: none;
   }
   &.ant-input-status-error:focus{
    box-shadow: none !important;
   }
   &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus{
    border-bottom: 1px solid var(--error) !important;
   }
   &.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input, 
   .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover{
    border-bottom: 1px solid var(--error) !important;
   }
`;
