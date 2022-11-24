import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Row } from 'antd';
import styled from 'styled-components';

import { PATHS } from '../../helpers/constants';
import img from './images/login-background.svg';

import { ReactComponent as LogoSvg } from '../../assets/icons/logo.svg';

const Container = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-position-y: 100%;
`;

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/${PATHS.ROOT}`);
  };
  return (
    <Container>
      <Row style={{ gap: '15px' }}>
        <LogoSvg style={{ cursor: 'pointer' }} onClick={() => handleClick()} />
      </Row>

      <Outlet />
    </Container>
  );
};

export default AuthLayout;
