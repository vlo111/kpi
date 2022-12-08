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

  .ant-form-item-explain-error {
    color: var(--error);
  }

  .ant-form-item-label {
    padding: 0;

    > label {
      overflow: hidden;
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0;
      color: var(--dark-2);
      font-size: var(--base-font-size);
    }
  }

  .ant-form-item-required:before {
    position: absolute;
    right: -12px;
    color: var(--dark-2) !important;
    margin-top: -6px;
  }
`;
