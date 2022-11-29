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
  background-color: var(--background-auth);
  height: 100vh;
  width: 100vw;
`;

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
        <Container>
            <Row style={{ position: 'absolute', padding: '32px 0px 0px 32px' }}>
                <LogoSvg style={{ cursor: 'pointer' }} onClick={() => navigate(PATHS.ROOT)} />
            </Row>
            <Outlet />
        </Container>
  );
};

export default AuthLayout;
