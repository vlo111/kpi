import { createContext, useContext, useMemo } from 'react'

import { useLocalStorage } from './useLocalStorage'

// @ts-expect-error
const AuthContext: any = createContext()

export const AuthProvider: any = ({ children }: any) => {
  const [user, setUser] = useLocalStorage('user', null)

  const login: any = async (data: any) => {
    setUser(data)
  }

  const logout: any = () => {
    setUser(null)
    // localStorage.removeItem('token')

    // <Navigate to="/" replace />
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  )

  // eslint-disable-next-line react/react-in-jsx-scope
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth: any = () => {
  return useContext(AuthContext)
}
