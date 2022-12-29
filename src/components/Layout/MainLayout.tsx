import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { Menu } from '../Menu';
import { IComponentChildren } from '../../types/global';
import { Header } from '../Header';

const LayoutStyle = styled(Layout)`
  background-color: var(--background);
  overflow: hidden;
  height: 100%;
`;

const Sider = styled(LayoutStyle.Sider)`
  z-index: 2;
`;

const Content = styled(LayoutStyle.Content)`
  background: var(--background); 
  overflow: auto;
`;

export const MainLayout: React.FC<IComponentChildren> = ({ children }) => {
  return (
    <LayoutStyle>
      <Sider
        breakpoint="lg"
        collapsedWidth="100px"
        width={'240px'}
      >
        <Menu />
      </Sider>
      <Layout>
        <Header />
        <Content>{children}</Content>
      </Layout>
    </LayoutStyle>
  );
};
