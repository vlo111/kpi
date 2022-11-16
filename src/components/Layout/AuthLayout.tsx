import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'
import img from './images/login-background.svg'
import { ReactComponent as LogoSvg } from '../../assets/icons/logo.svg'
import { IComponentChildren } from '../../types/global'
import { useNavigate } from 'react-router-dom'

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

const AuthLayout: React.FC<IComponentChildren> = ({ children, location }) => {
  const navigate = useNavigate()
  const handleClick = (): void => {
    if (location === 'sign-in' || location === 'sign-up') {
      window.location.reload()
    } else {
      navigate('/sign-in')
    }
  }
  return (
    <LayoutStyle>
      <div style={{ position: 'absolute', padding: '32px 0 0 32px' }}>
        <LogoSvg style={ { cursor: 'pointer' } } onClick={handleClick} />
      </div>
      <Container>
        {children}
      </Container>
    </LayoutStyle>
  )
}

export default AuthLayout
