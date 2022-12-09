import styled, { css } from 'styled-components';
import { Input, InputNumber } from 'antd';

const defaultStyle = css`
    height: 44px;
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
`;

const primaryStyle = css`
  height: 44px;
  font-size: 16px;
  background: var(--white);
  border-radius: 5px;

  :hover, :focus {
    border: 1px solid var(--dark-5) !important;
    box-shadow: none;

    &.ant-input-number-status-error {
      border: 1px solid var(--error) !important;
      box-shadow: none !important;
    }
  }

  &.ant-input-number-focused:not(.ant-input-number-status-error) {
    border: 1px solid var(--dark-5);
    box-shadow: none;

    :hover {
      border: 1px solid var(--dark-5) !important;
    }
  }

  &.ant-input-number-status-error {
    border: 1px solid var(--error) !important;
    box-shadow: none !important;
  }
  
  &.hideArrow {
    .ant-input-number-handler-wrap {
      display: none;
    }
  }
`;

const AsnInput = styled(Input)`
  ${defaultStyle}
`;

const AsnInputNumber = styled(InputNumber)`
  &.primary {
    ${primaryStyle}
  }
`;

const AsnTextArea = styled(Input.TextArea)`
  ${defaultStyle}
`;

AsnInput.TextArea = AsnTextArea;

const AsnPassword = styled(Input.Password)`
  ${defaultStyle}
`;

AsnInput.Password = AsnPassword;

export { AsnInput, AsnTextArea, AsnPassword, AsnInputNumber };
