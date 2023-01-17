// import React from 'react'
import { Radio, Typography } from 'antd';
import styled from 'styled-components';
import { AsnInput } from '../Forms/Input';

export const FormText = styled.span`
  font-size: var(--base-font-size);
`;
export const SectionTitle = styled(Typography.Title)`
  font-size: var(--headline-font-size) !important;
  color: var(--dark-border-ultramarine) !important;
  margin: 2rem 0rem 1rem;
  display: flex;
  justify-content: space-between;
`;

export const CustomRadio = styled(Radio)`
  .ant-radio-checked .ant-radio-inner {
    border-color: var(--dark-border-ultramarine);
  }

  .ant-radio-inner {
    ::after {
      background-color: var(--dark-border-ultramarine);
    }
  }
  .ant-radio-group {
    display: flex !important;
    flex-direction: column !important;
  }
`;

export const DividerLine = styled.span`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
`;
export const BorderBottomInput = styled(AsnInput)`
  width: auto;
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid var(--dark-border-ultramarine) !important;
  height: 30px;
  :hover {
    border: none !important;
    border-bottom: 1px solid var(--dark-border-ultramarine) !important;
  }
  :focus {
    border: none !important;
    border-bottom: 1px solid var(--dark-border-ultramarine) !important;
    box-shadow: none;
  }
`;