import React from 'react'
import { Outlet } from 'react-router-dom'
import { Wrapper } from './style'

export const Login: React.FC = () => {
  return (
        <Wrapper>
            <Outlet />
        </Wrapper>
  )
}
