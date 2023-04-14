// import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { AsnCheckbox } from '../Forms/Checkbox';

const { Title } = Typography;

export const PopupContainer = styled.div<any>`
  padding: 1rem 1rem 2rem;
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CustomCheckbox = styled(AsnCheckbox)`
  margin-left: 0px !important;
`;

export const PopupTitle = styled(Title)`
  font-size: var(--headline-font-size) !important;
  font-weight: var(--font-semibold) !important;
`;

export const PopupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 3rem;
`;
