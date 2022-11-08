import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import { Menu } from '../Menu'
import { IComponentChildren } from '../../types/global'
import { Header } from '../Header'

const LayoutStyle = styled(Layout)`
  background-color: var(--background);
  overflow: hidden;
  height: 100%;
`

const Sider = styled(LayoutStyle.Sider)`
  background: var(--white);
  box-shadow: var(--manu-box-shadow);
  z-index: 2;
`

const Content = styled(LayoutStyle.Content)`
  background: var(--background);
  padding: 30px;
  overflow: auto;
`

const MainLayout: React.FC<IComponentChildren> = ({ children }) => {
  return (
    <LayoutStyle>
      <Sider>
        <Menu/>
      </Sider>
      <Layout>
        <Header/>
        <Content>
          {children}
        </Content>
      </Layout>
    </LayoutStyle>
  )
}

export default MainLayout
