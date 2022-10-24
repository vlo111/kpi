import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import img from './images/login-background.svg'
import { ReactComponent as LogoSvg } from '../../assets/icons/logo.svg'

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
`

const AuthLayout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <LayoutStyle>
      <div style={{ position: 'absolute', padding: '32px 0 0 32px' }}>
        <LogoSvg />
      </div>
      <Container>
        {children}
      </Container>
    </LayoutStyle>
  )
}

export default AuthLayout
