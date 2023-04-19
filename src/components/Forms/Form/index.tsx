import styled from 'styled-components';
import { Form } from 'antd';

export const AsnForm = styled(Form)`
.ant-input-affix-wrapper-status-error, .ant-input-status-error {
    border-color: var(--error) !important;

    &:focus {
      box-shadow: var(--error-box-shadow) !important;
    }

    &:hover {
      border-color: var(--error) !important;
    }
  }
  
  .ant-form-item {
    margin: ${props => props.name === 'preassesment' ? '0 0 32px' : ''};
  }

  .ant-form-item-explain-error {
    color: var(--error);
    padding-top:  ${props => props.name === 'preassesment' ? '5px' : ''};
  }

  .ant-form-item-label {
    padding: 0;

    > label {
      overflow: hidden;
      display: block;
      text-overflow: ${props => (props.name === 'preassesment') || (props.name === 'preassesment-assess') ? 'initial' : 'ellipsis'};
      white-space: ${props => (props.name === 'preassesment') || (props.name === 'preassesment-assess') ? 'initial' : 'nowrap'};
      padding: 0;
      color: var(--dark-2);
      font-size: var(--base-font-size);
      width:  ${props => props.name === 'preassesment-assess' ? '85%' : '100%'};
    }
  }
  
  .ant-form-item-label>label.ant-form-item-required:not(.ant-form-item-required-mark-optional) {

    &:before {
      display: none !important;
    }
    
    &:after {
      color: var(--dark-2) !important;
      display: inline-block;
      margin-right: 4px;
      font-size: 14px;
      font-family: SimSun,sans-serif;
      line-height: 1;
      content: "*";
    }
  }
  &.ant-form-vertical .ant-form-item-row{
    width:  ${props => (props.name === 'preassesment') || (props.name === 'preassesment-assess') ? '100%' : ''}
  }
`;
