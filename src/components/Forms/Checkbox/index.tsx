import styled, { css } from 'styled-components';
import { Checkbox } from 'antd';
import { IAsnCheckbox } from '../../../types/global';

const defaultStyle = css<IAsnCheckbox>`
    &-inner {
      width: ${(props) => props.width ?? '18px'};
      height: ${(props) => props.height ?? '18px'};
      &:after {
        width: ${(props) => props.checkWidth ?? '5px'};
        height: ${(props) => props.checkHeight ?? '10px'};
        border-top: 0;
        border-left: 0;
        top: ${(props) => props.top ?? '7px'};
        left: ${(props) => props.left ?? '4px'};
      }
    }

    &-checked {
      .ant-checkbox-inner {
        background-color: var(--dark-border-ultramarine);
        border: 1px solid var(--dark-border-ultramarine) !important;
      }
    }

    &:hover {
      .ant-checkbox-inner {
        border-color: 1px solid #d9d9d9 !important;
      }
    }
    .ant-checkbox-input:focus+.ant-checkbox-inner, .ant-checkbox-wrapper:hover .ant-checkbox-inner, .ant-checkbox:hover .ant-checkbox-inner{
      border-color: 1px solid red !important;
    }
    .ant-checkbox-indeterminate .ant-checkbox-inner {
    &:after {
      background-color: inherit !important;
    }
  }
  .ant-checkbox .ant-checkbox-inner {
    background-color: white;
    border-color: #d9d9d9;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--dark-border-ultramarine);
    border-color: 1px solid var(--dark-border-ultramarine) !important;
  }
`;

export const AsnCheckbox = styled(Checkbox)<IAsnCheckbox>`
  .ant-checkbox {
    ${defaultStyle}
  }
`;

export const AsnCheckboxGroup = styled(AsnCheckbox.Group)<IAsnCheckbox>`
.ant-checkbox-wrapper{
  ${defaultStyle}
  }
`;

export const AssessMentFormCheckBox = styled(Checkbox)`
    span{
     font-size: var(--base-font-size) !important;
    }
    .ant-checkbox .ant-checkbox-inner {
      border-color:  var(--dark-border-ultramarine);
    }

    .ant-checkbox-disabled .ant-checkbox-inner {
      border-color:  var(--dark-border-ultramarine);
     }

     .ant-checkbox-checked .ant-checkbox-inner {
       border-color:  var(--dark-border-ultramarine);
       background-color: var(--dark-border-ultramarine);
     }
     .ant-checkbox-disabled+span{
        color: ${props => props.value > 0 ? 'var(--dark-2)' : 'var(--dark-3)'}; 
     }
     .ant-checkbox-disabled .ant-checkbox-inner{
        border-color:  var(--dark-border-ultramarine) !important;
     }
     .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after{
        border-color: var(--white)
     }
     &.ant-checkbox-wrapper.ant-checkbox-wrapper-disabled{
        width:  ${props => props.id === 'preview' ? '100%' : '90%'};
     }
`;
