import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import img from './images/login-background.svg'

const LayoutStyle = styled(Layout)`
  background-color: #F9FCFF;
  height: 100%;
`

const Container = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-position-y: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
`

const AuthLayout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <LayoutStyle>
      <Container>
        {children}
      </Container>
    </LayoutStyle>
  )
}

export default AuthLayout
