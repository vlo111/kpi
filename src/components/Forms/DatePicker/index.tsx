import styled from 'styled-components';
import { DatePicker } from 'antd';

export const AsnDatePicker = styled(DatePicker)`
  font-size: 16px;
  background: var(--white);
  border: 1px solid var(--dark-border-ultramarine);
  border-radius: 5px;

  :disabled {
    background-color: var(--white);
  }
  :hover {
    border: 1px solid var(--dark-border-ultramarine);
  }
  
  .ant-picker-input {
    flex-direction: row-reverse;
    
    svg {
      fill: var(--dark-2);
      margin-right: 12px;
    }
  }

  &.ant-picker-focused {
    border: 1px solid var(--dark-border-ultramarine);
    box-shadow: var(--input-box-shadow);
  }
`;
