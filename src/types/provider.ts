import React from 'react'

export interface Props {
  children: React.ReactNode
}

export interface Login {
  email: string
  password: string
}

export type SetLogin = ({ email, password }: Login) => Promise<void>

export type LogOut = () => void

export interface Cookies {
  token: string | undefined
}

export interface GlobalContext {
  login: SetLogin
  logout: LogOut
  cookies: Cookies
}

export type UseAuth = () => GlobalContext

export type UseProvider = (props: Props) => JSX.Element
