import styled from 'styled-components';
import { Row as AntRow } from 'antd';
import React from 'react';
import { ReactComponent as NotFoundSvg } from '../../Icons/not-found.svg';

const NotFoundWrapper = styled(AntRow)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
`;

export const NotFound: React.FC = () => (
  <NotFoundWrapper>
    <NotFoundSvg />
    <p>No records found</p>
  </NotFoundWrapper>
);
