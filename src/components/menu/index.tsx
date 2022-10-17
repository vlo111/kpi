import React from 'react'
import { Layout } from 'antd'
import { Wrapper } from './style'

const { Header, Footer, Content } = Layout

export const Menu: React.FC = () => {
  return (
    <Wrapper>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Wrapper>
  )
}
