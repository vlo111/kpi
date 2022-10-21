import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import { Menu } from '../Menu'

const LayoutStyle = styled(Layout)`
  background-color: #F9FCFF;
  height: 100%;
`

const Sider = styled(LayoutStyle.Sider)`
  background: var(--white);
  box-shadow: var(--manu-box-shadow);
  z-index: 2;
`

const Header = styled(LayoutStyle.Header)`
  background: var(--white);
  box-shadow: var(--header-box-shadow);
  z-index: 1;
`

const Content = styled(LayoutStyle.Content)`
  background: var(--background)
`

const MainLayout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
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
