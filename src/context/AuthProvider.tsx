import React, { createContext, useState } from 'react'
import { IProvider } from '../types/provider'

const AuthContext = createContext({})

export const AuthProvider: React.FC<IProvider> = ({ children }) => {
  const [auth, setAuth] = useState({})

  return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
  )
}

export default AuthContext
