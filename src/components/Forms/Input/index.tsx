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

const AsnInput = styled(Input)`
  ${defaultStyle}
`;

const AsnInputNumber = styled(InputNumber)`
  ${defaultStyle}
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
