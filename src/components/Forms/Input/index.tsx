import styled, { css } from 'styled-components';
import { Input } from 'antd';

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

const TextArea = styled(Input.TextArea)`
  ${defaultStyle}
`;

AsnInput.TextArea = TextArea;

const Password = styled(Input.Password)`
  ${defaultStyle}
`;

AsnInput.Password = Password;

export default AsnInput;
