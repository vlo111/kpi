import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Wrapper } from './style'
import { useAuth } from '../../hooks/auth'

export const Login: React.FC = () => {
  const { cookies } = useAuth()

  return cookies.token
    ? <Navigate to='/' replace={true}/>
    : <Wrapper> <Outlet/> </Wrapper>
}
