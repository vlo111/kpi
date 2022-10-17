import React from 'react'
import { Layout } from 'antd'
import { Wrapper } from './style'
// import { Menu } from '../components/menu'

const { Header, Sider, Content } = Layout

export const Home: React.FC = () => {
  return (
    <Wrapper>
      <Layout>
        <Sider className="project-menu">
          {/* <Menu /> */}
        </Sider>
        <Layout>
          <Header className="project-header">Header</Header>
          <Content>
            Content
          </Content>
        </Layout>
      </Layout>
    </Wrapper>
  )
}
