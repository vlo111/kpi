import React, { createContext, useContext, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { Cookies, GlobalContext, Login, LogOut, Props, SetLogin, UseAuth, UseProvider } from '../../types/provider'

const defaultValue = {
  cookies: { name: '', token: '' },
  login: async ({ email, password }: Login) => { },
  logout: () => { }
}

const UserContext = createContext<GlobalContext>(defaultValue)

export const UserProvider: UseProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const [cookies, setCookies, removeCookie] = useCookies<string, Cookies>()

  const login: SetLogin = async ({ email, password }: Login) => {
    const res = await api.post('/users/sign-in', {
      email,
      password
    })

    setCookies('token', res.data.token)
    setCookies('name', res.data.name)

    navigate('/')
  }

  const logout: LogOut = () => {
    ['token', 'name'].forEach(obj => removeCookie(obj)) // remove data save in cookies
    navigate('/sign/in')
  }

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout
    }),
    [cookies]
  )

  return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
  )
}

export const useAuth: UseAuth = () => {
  return useContext(UserContext)
}
