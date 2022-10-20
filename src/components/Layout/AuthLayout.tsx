import React from 'react'
import { Layout } from 'antd'
import styled from 'styled-components'

const LayoutStyle = styled(Layout)`
  background-color: #F9FCFF;
  height: 100%;
`

const AuthLayout: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
        <LayoutStyle>
          {children}
        </LayoutStyle>
  )
}

export default AuthLayout
