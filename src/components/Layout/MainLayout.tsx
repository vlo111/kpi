import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import { Menu } from '../Menu'
import { IComponentChildren } from '../../types/global'

const LayoutStyle = styled(Layout)`
  background-color: var(--background);
  overflow: hidden;
  height: 100%;
`

const Sider = styled(LayoutStyle.Sider)`
  width: 240px !important;
  min-width: 240px !important;
  max-width: 240px !important;
  flex: 0 0 240px !important;
  z-index: 2;
`

const Header = styled(LayoutStyle.Header)`
  background: var(--white);
  box-shadow: var(--header-box-shadow);
  z-index: 1;
  height: 60px;
`

const Content = styled(LayoutStyle.Content)`
  background: var(--background);
  overflow: auto;
`

const MainLayout: React.FC<IComponentChildren> = ({ children }) => {
  return (
    <LayoutStyle>
      <Sider>
        <Menu/>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>
          {children}
        </Content>
      </Layout>
    </LayoutStyle>
  )
}

export default MainLayout
